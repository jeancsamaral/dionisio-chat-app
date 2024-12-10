import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import aiImage from "@/assets/images/x1.png"
import crmImage from "@/assets/images/x2.png"
import menuImage from "@/assets/images/x3.png"
import eventImage from "@/assets/images/x4.png"

export default function FeaturesSection() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null)

    const cards = [
        {
            title: "Revolucione seu Atendimento com IA",
            description: "Automatize interações e responda seus clientes com precisão, 24/7. Nossa IA transforma seu WhatsApp em um assistente digital eficiente, minimizando erros e maximizando a satisfação.",
            cta: "Descubra a IA Agora",
            image: aiImage,
            alt: "Inteligência Artificial Personalizada",
            details: {
                title: "Atendimento Inteligente com IA",
                description: "Esta solução transforma o WhatsApp Business do cliente em um assistente digital inteligente, proporcionando atendimento personalizado e eficiente. A IA opera 24/7, garantindo respostas precisas às dúvidas dos clientes, eliminando atrasos ou falhas comuns em chatbots convencionais.",
                benefits: [
                    "Atendimento 24/7: Sempre disponível para responder mensagens, a qualquer hora.",
                    "Interpretação inteligente: A IA entende o contexto das mensagens e mantém conversas fluídas, evitando bugs.",
                    "Redução de custos: Automatiza interações, reduzindo a necessidade de operadores humanos."
                ]
            }
        },
        {
            title: "Gestão Simples, Resultados Extraordinários",
            description: "Acompanhe vendas, gerencie listas e tome decisões estratégicas com relatórios detalhados e interface fácil de usar.",
            cta: "Conheça o CRM Dionísio",
            image: crmImage,
            alt: "CRM Dinâmico e Intuitivo",
            details: {
                title: "CRM Dionísio - Gestão Completa",
                description: "O CRM Dionísio é um sistema integrado que oferece funcionalidades avançadas para gestão de eventos e clientes, simplificando a organização de listas e relatórios.",
                benefits: [
                    "Gestão de listas e aniversários: Organização simplificada de listas de convidados e camarotes.",
                    "Relatórios detalhados: Estatísticas por gênero, idade e promotores, auxiliando na tomada de decisões estratégicas.",
                    "Interface intuitiva: Fácil de usar, com suporte à criação de eventos e listas para promoters.",
                    "Gestão de promoters e hostess: Controle total sobre as atividades de entrada e relacionamento com os clientes."
                ]
            }
        },
        {
            title: "O Menu do Futuro",
            description: "Personalize e atualize cardápios em tempo real. Um design moderno para conectar seus clientes à sua marca de forma interativa.",
            cta: "Veja Como Funciona",
            image: menuImage,
            alt: "Cardápio Digital Inovador",
            details: {
                title: "Cardápio Digital Interativo",
                description: "O cardápio digital oferece uma experiência moderna e interativa para restaurantes e bares, diretamente no smartphone dos clientes.",
                benefits: [
                    "Atualizações em tempo real: Alterações rápidas e sem custos de reimpressão.",
                    "Interatividade: Imagens atraentes e descrições detalhadas, aumentando o apelo visual.",
                    "Personalização: Alinhamento com a identidade visual do estabelecimento.",
                    "Facilidade de uso: Alterações podem ser feitas via dispositivos móveis ou computador."
                ]
            }
        },
        {
            title: "Descubra os Melhores Eventos",
            description: "Encontre os rolês, festas e eventos perfeitos para você com base no seu perfil. Nossa IA personaliza recomendações para sua diversão garantida.",
            cta: "Explore Eventos",
            image: eventImage,
            alt: "Descoberta de Eventos Personalizada",
            details: {
                title: "Descoberta Personalizada de Eventos",
                description: "A IA personalizada ajuda usuários a encontrar eventos, festas e experiências com base no perfil e preferências individuais.",
                benefits: [
                    "Recomendações personalizadas: Sugestões baseadas em preferências de entretenimento.",
                    "Integração com ticketerias: Repasse instantâneo de ingressos e validação automática de pagamentos.",
                    "Experiência fluida: O usuário recebe recomendações certeiras, ingressos digitais e informações de forma ágil, promovendo uma experiência positiva e contínua."
                ]
            }
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
                                <div 
                                    key={index} 
                                    className="relative p-6 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm cursor-pointer"
                                    onClick={() => setSelectedCard(index)}
                                >
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
                                        <div className="w-fit mt-6 inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
                                            
                                                {card.cta}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Dialog para detalhes do card */}
            <Dialog open={selectedCard !== null} onOpenChange={() => setSelectedCard(null)}>
                <DialogContent className="border-none bg-purple-950/90 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedCard !== null && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">
                                    {cards[selectedCard].details.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-300">
                                    {cards[selectedCard].details.description}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-6 space-y-4">
                                <h3 className="text-lg font-semibold text-purple-300">Principais Benefícios:</h3>
                                <ul className="space-y-2">
                                    {cards[selectedCard].details.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-purple-400">•</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}