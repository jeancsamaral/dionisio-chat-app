import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import aiImage from "@/assets/images/x1.png";
import crmImage from "@/assets/images/x2.png";
import menuImage from "@/assets/images/x3.png";
import eventImage from "@/assets/images/x4.png";

export default function FeaturesSection() {
    const cards = [
        {
            title: "Revolucione seu Atendimento com IA",
            description: "Automatize interações e responda seus clientes com precisão, 24/7. Nossa IA transforma seu WhatsApp em um assistente digital eficiente, minimizando erros e maximizando a satisfação.",
            cta: "Descubra a IA Agora",
            image: aiImage,
            alt: "Inteligência Artificial Personalizada"
        },
        {
            title: "Gestão Simples, Resultados Extraordinários",
            description: "Acompanhe vendas, gerencie listas e tome decisões estratégicas com relatórios detalhados e interface fácil de usar.",
            cta: "Conheça o CRM Dionísio",
            image: crmImage,
            alt: "CRM Dinâmico e Intuitivo"
        },
        {
            title: "O Menu do Futuro",
            description: "Personalize e atualize cardápios em tempo real. Um design moderno para conectar seus clientes à sua marca de forma interativa.",
            cta: "Veja Como Funciona",
            image: menuImage,
            alt: "Cardápio Digital Inovador"
        },
        {
            title: "Descubra os Melhores Eventos",
            description: "Encontre os rolês, festas e eventos perfeitos para você com base no seu perfil. Nossa IA personaliza recomendações para sua diversão garantida.",
            cta: "Explore Eventos",
            image: eventImage,
            alt: "Descoberta de Eventos Personalizada"
        }
    ]
    return (
        <div className="min-h-screen bg-transparent text-white py-24">
            {/* Gradient Arc */}
            <div className="relative w-full max-w-6xl mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-800 via-blue-300 to-purple-500 rounded-full blur-[100px] opacity-20" />

                {/* Content */}
                <div className="relative z-10 text-center space-y-6 mb-16">
                    <Badge className="bg-[#32328a] text-gray-200 hover:bg-[#1a1a47]">
                        Recursos Exclusivos
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
                        Transforme seu Negócio
                        <br /> com Tecnologia
                    </h2>
                    <p className="text-gray-200 max-w-2xl mx-auto">
                        Gerencie seu estabelecimento de forma inteligente com nosso CRM integrado.
                        Cardápio digital, controle de clientes e atendimento automatizado em uma única plataforma.
                    </p>
                </div>

                {/* Calendar Demo */}
                <section className="relative w-full overflow-hidden mt-[70px] py-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2">
                            {cards.map((card, index) => (
                                <div key={index} className="relative p-6 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm">
                                    <div className="absolute inset-0 rounded-3xl border border-purple-500/20" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex-grow space-y-4">
                                            <div className="relative w-full pt-[100%] rounded-full bg-purple-600/20 overflow-hidden">
                                                <Image
                                                    src={card.image}
                                                    alt={card.alt}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight text-white">{card.title}</h2>
                                            <p className="text-sm text-gray-300">{card.description}</p>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                href="#"
                                                className="inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                                            >
                                                {card.cta}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}