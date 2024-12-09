'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import sponsor1 from "@/assets/sponsors/sp1.png"
import sponsor2 from "@/assets/sponsors/sp2.png"
import sponsor3 from "@/assets/sponsors/sp3.png"
import sponsor4 from "@/assets/sponsors/sp4.png"
import sponsor5 from "@/assets/sponsors/sp5.png"
import sponsor6 from "@/assets/sponsors/sp6.png"
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Sponsor {
    id: number
    name: string
    logo: StaticImageData
}

const sponsors: Sponsor[] = [
    { id: 1, name: "MEOW", logo: sponsor1 },
    { id: 2, name: "Galleria Bar", logo: sponsor2 },
    { id: 3, name: "No Sigilo", logo: sponsor3 },
    { id: 4, name: "Crema Club", logo: sponsor4 },
    { id: 5, name: "Lili Club", logo: sponsor5 },
    { id: 6, name: "Avenue Club", logo: sponsor6 },
]

export function SponsorCarousel() {
    const [isHovered, setIsHovered] = useState(false)
    const [translateX, setTranslateX] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const ANIMATION_SPEED = 0.2

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const slideWidth = container.firstElementChild?.clientWidth ?? 0
        const totalWidth = slideWidth * sponsors.length

        let animationFrameId: number

        const animate = () => {
            if (!isHovered) {
                setTranslateX(prev => {
                    const newTranslate = prev - ANIMATION_SPEED

                    // Quando chegar ao final de um conjunto, volta para o início
                    if (Math.abs(newTranslate) >= totalWidth) {
                        return 0
                    }
                    return newTranslate
                })
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrameId)
    }, [isHovered])

    // Triplicamos os itens para garantir uma transição suave
    const items = [...sponsors, ...sponsors, ...sponsors]

    return (
        <section className="relative w-full overflow-hidden mt-[70px]">
            {/* Background gradient */}
            <div className="w-full h-full bg-gradient-to-r from-[#371161] via-purple-950/30 to-transparent" />
            
            {/* Main container */}
            <div className="container relative mx-auto p-8 sm:p-12 lg:p-16 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm">
                {/* Border overlay */}
                <div className="absolute inset-0 rounded-3xl border border-purple-500/20" />
                
                {/* Header section */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center rounded-full bg-purple-950/60 px-4 py-2 text-sm text-purple-200 backdrop-blur-sm">
                        <span className="mr-2">🤝</span>
                        Nossos Clientes
                    </div>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Quem confia na Dionísio
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Empresas que já transformaram sua gestão de relacionamento com o CRM Dionísio
                    </p>
                </div>
                
                {/* Carousel content */}
                <div className="relative w-full">
                    {/* Gradiente da esquerda */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10">
                        <div className="w-full h-full bg-gradient-to-r from-[#371161] via-purple-950/30 to-transparent" />
                    </div>

                    <div
                        className="w-full overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div
                            ref={containerRef}
                            className="flex transition-transform duration-100 ease-linear gap-6"
                            style={{
                                transform: `translateX(${translateX}px)`,
                                width: `${sponsors.length * 200}%`
                            }}
                        >
                            {items.map((sponsor, index) => (
                                <Card
                                    key={`${sponsor.id}-${index}`}
                                    className="flex-shrink-0 w-64 transition-all max-w-[200px] bg-transparent border-none duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                                >
                                    <CardContent className="flex aspect-[3/2] items-center justify-center p-4">
                                        <div className="text-center justify-center flex flex-col">
                                            <Image
                                                src={sponsor.logo}
                                                alt={`${sponsor.name} logo`}
                                                className="w-full h-auto mb-2 transition-transform duration-300 ease-in-out"
                                            />
                                            <h3 className="text-sm font-semibold text-[white]">{sponsor.name}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Gradiente da direita */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10">
                        <div className="w-full h-full bg-gradient-to-l from-[#371161] via-purple-950/30 to-transparent" />
                    </div>
                </div>

                {/* Call to action button */}
                <div className="relative z-20 flex justify-center mt-12">
                    <Link
                        href="https://wa.me/5511977692831?text=Quero%20conhecer%20o%20CRM%20do%20Dionisio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                    >
                        Seja um Parceiro
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

