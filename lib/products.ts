export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
  popular?: boolean
  icon?: string
}

export const PRODUCTS: Product[] = [
  {
    id: "holy-starter",
    name: "Starter",
    description: "Perfect for trying out Holy AI",
    priceInCents: 0,
    features: [
      "5 app generations per month",
      "Basic AI assistance",
      "Community support",
      "Standard templates",
    ],
    icon: "Sparkles",
  },
  {
    id: "holy-pro",
    name: "Pro",
    description: "For professional developers",
    priceInCents: 2900,
    features: [
      "Unlimited app generations",
      "Advanced AI models",
      "Priority support",
      "Custom templates",
      "API access",
      "Team collaboration",
    ],
    popular: true,
    icon: "Zap",
  },
  {
    id: "holy-enterprise",
    name: "Enterprise",
    description: "For large teams and organizations",
    priceInCents: 9900,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced analytics",
      "White-label options",
    ],
    icon: "Building",
  },
]

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId)
}
