"use client"

import { useCallback, useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutProps {
  productId: string
}

export function Checkout({ productId }: CheckoutProps) {
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    try {
      const result = await createCheckoutSession(productId, window.location.origin)
      
      if (result.url && !result.clientSecret) {
        window.location.href = result.url
        return ""
      }
      
      return result.clientSecret || ""
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load checkout")
      return ""
    }
  }, [productId])

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
        {error}
      </div>
    )
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout className="w-full" />
    </EmbeddedCheckoutProvider>
  )
}
