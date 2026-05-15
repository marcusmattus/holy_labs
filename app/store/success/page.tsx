import Link from "next/link"
import { stripe } from "@/lib/stripe"
import { NavBar } from "@/components/shared/NavBar"
import { Check } from "lucide-react"

export default async function StoreSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  
  let session = null
  if (session_id) {
    try {
      session = await stripe.checkout.sessions.retrieve(session_id)
    } catch (error) {
      console.error("Error retrieving session:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 border border-accent flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-accent" />
          </div>
          
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Payment Successful</h1>
          <p className="text-muted font-mono text-sm uppercase tracking-widest mb-8">
            {session?.customer_email
              ? `Confirmation sent to ${session.customer_email}`
              : "Your subscription is now active"}
          </p>

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full py-3 bg-accent text-background font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/studio/new"
              className="block w-full py-3 border border-border font-bold text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-colors"
            >
              Start Building
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
