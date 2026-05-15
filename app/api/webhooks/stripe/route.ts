import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      const productId = session.metadata?.productId
      const customerEmail = session.customer_details?.email

      if (customerEmail && productId) {
        // Find user by email
        const { data: users } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", customerEmail)
          .single()

        if (users) {
          // Create order
          await supabaseAdmin.from("orders").insert({
            user_id: users.id,
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent as string,
            product_id: productId,
            amount_cents: session.amount_total || 0,
            status: "completed",
          })

          // Create or update subscription
          await supabaseAdmin.from("subscriptions").upsert({
            user_id: users.id,
            plan: productId.replace("holy-", ""),
            status: "active",
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
        }
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object
      const customerEmail = subscription.customer as string

      // Update subscription status
      const { data: customer } = await stripe.customers.retrieve(customerEmail) as any
      
      if (customer?.email) {
        const { data: users } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", customer.email)
          .single()

        if (users) {
          await supabaseAdmin
            .from("subscriptions")
            .update({
              status: subscription.status,
              current_period_start: new Date(
                subscription.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              cancel_at: subscription.cancel_at
                ? new Date(subscription.cancel_at * 1000).toISOString()
                : null,
            })
            .eq("user_id", users.id)
        }
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object
      const customerEmail = subscription.customer as string

      const { data: customer } = await stripe.customers.retrieve(customerEmail) as any
      
      if (customer?.email) {
        const { data: users } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("email", customer.email)
          .single()

        if (users) {
          await supabaseAdmin
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("user_id", users.id)
        }
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
