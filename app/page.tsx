"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Rocket, Star, Book, Users, ArrowRight, Menu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
import atomizePreview from "@/assets/images/tela.png"
import { MainNav } from '@/app/components/nav/main-nav'
import { StarsBackground } from '@/app/components/stars-background'
import { ArrowDown, Bot } from 'lucide-react'
import image from "@/assets/images/david2.png"
import image2 from "@/assets/images/sobre.png"
import image3 from "@/assets/images/dg.png"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import p1 from "@/assets/images/p1.png"
import p2 from "@/assets/images/p2.png"
import p3 from "@/assets/images/p3.png"
import p4 from "@/assets/images/p4.png"
import p5 from "@/assets/images/p5.png"
import p6 from "@/assets/images/p6.png"
import { StaticImageData } from 'next/image'
import { SponsorCarousel } from '@/components/sponsorCarousel'
import { Facebook, Github, Linkedin, Youtube, PhoneIcon as WhatsApp } from 'lucide-react'
import PartiesSection from '@/components/partiesSection'
import ClubsSection from '@/components/clubsSection'


const plans = [
  {
    name: "Básico",
    price: "R$ 99,00",
    description: "",
    features: [
      "CRM Básico",
      "IA Geradora de Demanda",
      "Marketing em nossas Mídias Sociais"
    ],
    paymentLink: "https://buy.stripe.com/test_28ocN25YF2J04rSeUU",
  },
  {
    name: "Premium",
    price: "R$ 159,00",
    description: "",
    features: [
      "Todas as Features do Básico",
      "CRM Promoters e Listas",
      "Cardápio Digital"
    ],
    recommended: true,
    paymentLink: "https://buy.stripe.com/test_aEUeVa2Mt83k7E4dQR",
  },
  {
    name: "Platinum",
    price: "R$ 159,00",
    description: "",
    features: [
      "Todas as Features do Premium",
      "NPS",
      "IA Atendente"
    ],
    paymentLink: "https://buy.stripe.com/test_28ocN25YF2J04rSeUU",
  },
]

interface BlogPost {
  tag: string
  title: string
  description: string
  author: string
  date: string
  image: StaticImageData
}

const LandingPage = () => {
  const blogs: BlogPost[] = [
    {
      tag: "Festa",
      title: "Baile do Hawaii - A Maior Festa do Ano!",
      description: "Uma noite inesquecível com decoração tropical, drinks exóticos e muita música boa. Vista sua melhor roupa havaiana e venha dançar até o sol raiar!",
      author: "Club XYZ",
      date: "15 Dez 2023",
      image: p1
    },
    {
      tag: "Festa",
      title: "Réveillon na Praia - Virada Mágica",
      description: "Celebre a chegada do ano novo com os pés na areia, show de fogos espetacular, open bar premium e as melhores atrações musicais da cidade.",
      author: "Beach Club",
      date: "31 Dez 2023",
      image: p2
    },
    {
      tag: "Festa",
      title: "Carnaval Antecipado - Bloco da Alegria",
      description: "O esquenta pro carnaval já começou! Trio elétrico, marchinhas tradicionais e muito axé. Traga sua fantasia e caia na folia com a gente!",
      author: "Bloco da Alegria",
      date: "20 Jan 2024",
      image: p3
    }
  ]

  const baladas: BlogPost[] = [
    {
      tag: "Balada",
      title: "Noite Eletrônica - DJ Internacional",
      description: "A melhor festa eletrônica da cidade com DJ internacional, pista principal climatizada, área VIP exclusiva e open bar premium até 2h da manhã.",
      author: "Club Level",
      date: "22 Dez 2023",
      image: p4
    },
    {
      tag: "Balada",
      title: "Hip Hop Night - Batalha de MCs",
      description: "A maior noite do hip hop com batalha de MCs, shows ao vivo, pista de dança especial e drinks exclusivos. Dress code: street style.",
      author: "Underground Club",
      date: "29 Dez 2023",
      image: p5
    },
    {
      tag: "Balada",
      title: "Sunset Party - Rooftop Experience",
      description: "Festa sunset no rooftop mais exclusivo da cidade. Vista panorâmica, música lounge, gastronomia premium e os melhores drinks artesanais.",
      author: "Sky Lounge",
      date: "05 Jan 2024",
      image: p6
    }
  ]

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Adicione os estilos dos botões no início do componente
  const buttonStyles = {
    base: `
      transition-all duration-200 
      font-medium 
      hover:scale-105 
      active:scale-95
    `,
    primary: `
      bg-[#160a2e]-600/50
      hover:bg-blue-600/60
      text-white
      border border-purple-400/70
      shadow-[0_0_20px_rgba(22, 10, 46,0.3)]
      hover:shadow-[0_0_25px_rgba(22, 10, 46,0.4)]
      ring-2 ring-blue-400/50
      animate-pulse-subtle
    `
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#2F1661] text-red-100 overflow-hidden relative">
      <StarsBackground />
      <MainNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <header className="mb-12 md:mb-24 pt-20 md:pt-32">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
              <div className="text-center lg:text-left">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-1 md:text-xl lg:text-[20px] text-yellow-500 max-w-2xl mt-4 md:mt-6"
                >
                  Pronto para a melhor vibe?
                </motion.p>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 md:mb-8 leading-tight">
                  Dionísio
                </h1>

                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-800/20 blur-[120px] rounded-full" />

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-300 max-w-2xl mt-4 md:mt-6 px-4 lg:px-0"
                >
                  Explore festas e eventos que combinam com seu estilo e viva cada momento ao máximo!
                </motion.p>

                <motion.div
                  className="mt-8 md:mt-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <Link href="/chat" passHref>
                    <motion.button
                      className={`
                      ${buttonStyles.base}
                      ${buttonStyles.primary}
                      py-2 px-6 rounded-full text-base mt-2
                      flex items-center justify-center mx-auto lg:mx-0
                    `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Confira nossos eventos!
                      <ArrowDown className="ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Image container with BorderBeam */}
              <div className="relative mt-8 lg:mt-0">
                <div className="relative">
                  <Image
                    src={image}
                    alt="David"
                    className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full relative z-10"
                  />
                  <div className="absolute rounded-full -inset-1 z-0">
                    <BorderBeam
                      size={300}
                      duration={12}
                      delay={9}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg mt-8 md:mt-16">
              {/* Glow effect posicionado na parte superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-blue-500/40 blur-[100px] animate-pulse" />

              <div className="relative w-full">
                <Image
                  src={atomizePreview}
                  alt="Atomize Preview"
                  className="object-cover w-full h-full [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] opacity-70"
                />
                <BorderBeam
                  size={600}
                  duration={6}
                  delay={9}
                />
              </div>
            </div>

            {<PartiesSection />}
            {<ClubsSection />}

            <section className="relative w-full overflow-hidden mt-[70px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
              <div className="container relative mx-auto p-6 sm:p-8 lg:p-12 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 rounded-3xl border border-purple-500/20" />
                <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-center">
                  {/* Conteúdo textual */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="inline-flex items-center self-start rounded-full bg-purple-950/60 px-4 py-2 text-sm text-purple-200 backdrop-blur-sm">
                      <span className="mr-2">😎</span>
                      Afinal, o que é o CRM Dionísio?
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                      Conexão única e impactante.
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300">
                      Somos a Dionísio, uma startup de inteligência artificial que te ajuda a descobrir os melhores rolês, festas e eventos de acordo com o seu perfil e um simples questionário. Em Paralelo, nosso sistema de Gestão do Relacionamento com o Cliente (CRM) visa colocar o cliente como o principal foco dos processos de uma empresa, oferecendo uma plataforma simples que visa dinamizar a gestão e aumentar o engajamento com o público. Desse modo, acompanhar vendas, captar dados relevantes e identificar insights estratégicos fica fácil e intuitivo.
                    </p>
                    <div>
                      <Link
                        href="/chat"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                      >
                        Acessar Agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Imagem e círculos */}
                  <div className="relative lg:block">
                    <div className="relative mx-auto lg:mx-0 max-w-[400px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-purple-500/20"
                          style={{
                            width: `${i * 120}px`,
                            height: `${i * 120}px`,
                            top: `${-i * 60}px`,
                            left: `${-i * 60}px`,
                            opacity: 1 - i * 0.2,
                          }}
                        />
                      ))}
                      <div className="relative z-10 rounded-full bg-purple-600/20 p-4 backdrop-blur-sm">
                        <Image
                          src={image2}
                          alt="Sobre o CRM"
                          className="w-full h-auto rounded-full relative z-10"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <SponsorCarousel />

            <section className="relative w-full overflow-hidden mt-[70px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
              
              <div className="container relative mx-auto p-6 sm:p-8 lg:p-12 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 rounded-3xl border border-purple-500/20" />
                <div className="grid gap-8 lg:gap-16 lg:grid-cols-2 items-center">
                <div className="relative lg:block">
                    <div className="relative mx-auto lg:mx-0 max-w-[400px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-purple-500/20"
                          style={{
                            width: `${i * 120}px`,
                            height: `${i * 120}px`,
                            top: `${-i * 60}px`,
                            left: `${-i * 60}px`,
                            opacity: 1 - i * 0.2,
                          }}
                        />
                      ))}
                      <div className="relative z-10 rounded-full bg-purple-600/20 p-4 backdrop-blur-sm">
                        <Image
                          src={image3}
                          alt="Sobre o CRM"
                          className="w-full h-auto rounded-full relative z-10"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  {/* Conteúdo textual */}
                  <div className="flex flex-col justify-center space-y-6 text-right">
                    <div className="inline-flex items-center self-end rounded-full bg-purple-950/60 px-4 py-2 text-sm text-purple-200 backdrop-blur-sm">
                      <span className="mr-2">😎</span>
                      Afinal, o que é o CRM Dionísio?
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                      Conexão única e impactante.
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300">
                      Somos a Dionísio, uma startup de inteligência artificial que te ajuda a descobrir os melhores rolês, festas e eventos de acordo com o seu perfil e um simples questionário. Em Paralelo, nosso sistema de Gestão do Relacionamento com o Cliente (CRM) visa colocar o cliente como o principal foco dos processos de uma empresa, oferecendo uma plataforma simples que visa dinamizar a gestão e aumentar o engajamento com o público. Desse modo, acompanhar vendas, captar dados relevantes e identificar insights estratégicos fica fácil e intuitivo.
                    </p>
                    <div className="flex justify-end">
                      <Link
                        href="/chat"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                      >
                        Acessar Agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Imagem e círculos */}
                  
                </div>
              </div>
            </section>
            
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 items-center">
                  <div className="flex flex-col justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Precificação Simples e Trasparente</h2>
                      <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                        Escolha um dos Planos Exclusivos do CRM Dionísio
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan) => (
                      <Card
                        key={plan.name}
                        className={`flex min-h-[450px] flex-col justify-around scale-105 ${plan.recommended ? "border-yellow-500 shadow-lg scale-105" : "opacity-50 scale-100 hover:opacity-80"
                          }`}
                      >
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-4xl font-bold mb-4">
                            {plan.price}
                            {plan.name !== "Enterprise" && <span className="text-lg font-normal">/month</span>}
                          </div>
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-yellow-600" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => window.open(plan.paymentLink, '_blank')} variant={plan.recommended ? "default" : "outline"}>
                            {plan.name === "Premium" ? "Assinar Agora" : "Assinar Agora"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            

          </motion.div>
        </header>
      </div>
      <footer className="w-full flex flex-col items-center justify-center bg-[#1c0a40] px-4 py-20 text-white z-50 relative">
        <div className="container mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#f0bf5d] via-[#de8c12] to-[#ab5d4b] text-transparent bg-clip-text">
            Fale Conosco
          </h2>
          <p className="text-gray-400 max-w-2xl mb-12 leading-relaxed">
            Quer saber mais sobre como o Dionísio pode transformar sua experiência com eventos e festas? Entre em contato conosco! Estamos prontos para ajudar você a encontrar os melhores rolês e criar momentos inesquecíveis.
          </p>
          <Link
            href="#contact"
            className="px-8 py-3 text-[#f0bf5d] border border-[#f0bf5d] rounded-md transition-colors hover:bg-[#f0bf5d] hover:text-white mb-16"
          >
            Diga Olá
          </Link>
          <div className="flex items-center justify-center gap-6 mb-16">
            <Link href="#" className="text-gray-400 hover:text-[#f0bf5d] transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#f0bf5d] transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#f0bf5d] transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#f0bf5d] transition-colors">
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#f0bf5d] transition-colors">
              <WhatsApp className="w-6 h-6" />
              <span className="sr-only">WhatsApp</span>
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            Desenvolvido por{" "}
            <Link href="#" className="text-[#f0bf5d] hover:underline">
              Dionísio Tech
            </Link>
            . Construído com React, Next.js e Inteligência Artificial.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage