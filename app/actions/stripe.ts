"use server"

import { stripe } from "@/lib/stripe"
import { getProduct } from "@/lib/products"

export async function createCheckoutSession(productId: string, origin: string) {
  const product = getProduct(productId)

  if (!product) {
    throw new Error("Product not found")
  }

  if (product.priceInCents === 0) {
    // Free plan - no checkout needed
    return { url: "/dashboard?plan=starter" }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Holy ${product.name}`,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/store`,
    metadata: {
      productId: product.id,
    },
  })

  return { clientSecret: session.client_secret, url: session.url }
}
