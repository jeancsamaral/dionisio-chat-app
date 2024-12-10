'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PricingTabsProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

export function PricingTabs({ selectedDuration, onDurationChange }: PricingTabsProps) {
  return (
    <Tabs defaultValue={selectedDuration.toString()} className="w-[400px] mx-auto mb-8 z-50">
      <TabsList className="grid w-full grid-cols-4 bg-white border">
        <TabsTrigger 
          value="1" 
          onClick={() => onDurationChange(1)}
          className="data-[state=active]:bg-[#331560] data-[state=active]:text-white"
        >
          1 mês
        </TabsTrigger>
        <TabsTrigger 
          value="3" 
          onClick={() => onDurationChange(3)}
          className="data-[state=active]:bg-[#331560] data-[state=active]:text-white"
        >
          3 meses
        </TabsTrigger>
        <TabsTrigger 
          value="6" 
          onClick={() => onDurationChange(6)}
          className="data-[state=active]:bg-[#331560] data-[state=active]:text-white"
        >
          6 meses
        </TabsTrigger>
        <TabsTrigger 
          value="12" 
          onClick={() => onDurationChange(12)}
          className="data-[state=active]:bg-[#331560] data-[state=active]:text-white"
        >
          12 meses
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

const allFeatures = [
  "Cardápio Digital",
  "CRM Controle de Clientes",
  "IA atendente"
]

const basePlans = [
  {
    name: "Básico",
    prices: {
      1: 89,    // 1 mês: R$ 99,00
      3: 240,   // 3 meses: R$ 249,00
      6: 443,   // 6 meses: R$ 449,00
      12: 801,  // 12 meses: R$ 799,00
    },
    description: "",
    features: [
      "Cardápio Digital",
    ],
    paymentLinks: {
      1: "https://buy.stripe.com/cN23eg6eQ6wydywdQZ",
      3: "https://buy.stripe.com/3cs4ikeLm4oq9igdR2",
      6: "https://buy.stripe.com/dR6bKM5aM4oq9igeV5",
      12: "https://buy.stripe.com/4gw4ikeLm08a1PO6oy",
    }
  },
  {
    name: "Premium",
    prices: {
      1: 482,    // 1 mês: R$ 159,00
      3: 1302,    // 3 meses: R$ 399,00
      6: 2400,    // 6 meses: R$ 699,00
      12: 4332,  // 12 meses: R$ 1.299,00
    },
    description: "",
    features: [
      "Cardápio Digital",
      "CRM Controle de Clientes",
      "IA atendente"
    ],
    recommended: true,
    paymentLinks: {
      1: "https://buy.stripe.com/28o4ik32E7AC8ec5kk",
      3: "https://buy.stripe.com/dR6dSUdHi2gi7a87su",
      6: "https://buy.stripe.com/14keWYgTu1ceamk3cf",
      12: "https://buy.stripe.com/3csbKMgTug78cuscMN",
    }
  },
  {
    name: "Platinum",
    prices: {
      1: 151,    // 1 mês: R$ 199,00
      3: 408,    // 3 meses: R$ 499,00
      6: 756,    // 6 meses: R$ 899,00
      12: 1356,  // 12 meses: R$ 1.699,00
    },
    description: "",
    features: [
      "Cardápio Digital",
      "CRM Controle de Clientes"
    ],
    paymentLinks: {
      1: "https://buy.stripe.com/7sI9CE8mYaMOamk28c",
      3: "https://buy.stripe.com/28o5mo9r2g78gKI6ow",
      6: "https://buy.stripe.com/5kAeWYeLm08a2TS3ch",
      12: "https://buy.stripe.com/14kg12dHig786644gm",
    }
  }
]

export default function PricingSection() {
  const [selectedDuration, setSelectedDuration] = useState(1)

  const plans = basePlans.map(plan => ({
    ...plan,
    price: plan.prices[selectedDuration as keyof typeof plan.prices]
  }))

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Precificação Simples e Transparente</h2>
              <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Escolha um dos Planos Exclusivos do CRM Dionísio
              </p>
            </div>
          </div>
          <PricingTabs selectedDuration={selectedDuration} onDurationChange={setSelectedDuration} />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex min-h-[450px] flex-col justify-around scale-105 ${
                  plan.recommended ? "border-yellow-500 shadow-lg scale-105" : "opacity-50 scale-100 hover:opacity-80"
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    {selectedDuration > 1 && (
                      <div className="text-lg line-through opacity-70 text-purple-900">
                        R$ {(plan.prices[1] * selectedDuration).toFixed(0)}
                      </div>
                    )}
                    R$ {plan.price.toFixed(0)}
                    <span className="text-lg font-normal">
                      /{selectedDuration === 1 ? 'mês' : `${selectedDuration} meses`}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {allFeatures.map((feature) => (
                      <li key={feature} className="flex items-center">
                        {plan.features.includes(feature) ? (
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                        ) : (
                          <X className="mr-2 h-4 w-4 text-gray-400" />
                        )}
                        <span className={!plan.features.includes(feature) ? "text-gray-400" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(plan.paymentLinks[selectedDuration as keyof typeof plan.paymentLinks], '_blank')} 
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    {plan.name === "Premium" ? "Assinar Agora" : "Assinar Agora"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

