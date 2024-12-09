"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Play, Trophy, ScrollText, Brain, Medal, Swords, Map, TrendingUp, ChevronDown, BookOpen, Target, BarChart } from 'lucide-react'
import Image from "next/image"
import astronautImage from "@/assets/images/astronaut.png" // Certifique-se de que o caminho está correto
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import footerImage from "@/assets/images/escotilha.png" // Certifique-se de que o caminho está correto
import { useChallenge } from '@/context/ChallengeContext';

interface AnimatedButtonProps {
    icon: React.ReactNode
    text: string
    isActive: boolean
    href: string
}

const buttonVariants = {
    initial: { scale: 1, boxShadow: "0 0 0 rgba(16, 31, 130, 0)" },
    hover: {
        scale: 1.05,
        boxShadow: "0 0 15px rgba(16, 31, 130, 0.5)",
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ icon, text, isActive, href }) => {
    return (
        <Link href={href} passHref legacyBehavior>
            <motion.div
                className={`relative flex items-center w-full p-3 mb-2.5 rounded-xl text-left transition-colors cursor-pointer ${isActive ? "bg-[#101f82]" : "bg-[#081041]"}`}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={isActive ? "hover" : "initial"}
            >
                <span className="mr-3 text-cyan-300">{icon}</span>
                <span className="text-cyan-100 font-medium">{text}</span>
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-full h-full bg-cyan-600 opacity-20 rounded-xl" />
                    </motion.div>
                )}
            </motion.div>
        </Link>
    )
}

interface ButtonGroupProps {
    title: string;
    icon: React.ReactNode;
    buttons: {
        icon: React.ReactNode;
        text: string;
        href: string;
    }[];
    isOpen: boolean;
    onToggle: () => void;
    activeHref: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ title, icon, buttons, isOpen, onToggle, activeHref }) => {
    const hasActiveChild = buttons.some(button => activeHref?.startsWith(button.href));

    return (
        <div className="mb-2">
            <motion.button
                className={`flex items-center w-full p-3 rounded-xl text-cyan-100 font-medium relative
                    ${hasActiveChild ? 'bg-[#101f82]/50' : 'bg-[#081041]'} 
                    hover:bg-[#101f82]/30`}
                onClick={onToggle}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {hasActiveChild && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full" />
                )}
                
                <span className={`mr-3 ${hasActiveChild ? 'text-cyan-400' : 'text-cyan-300'}`}>{icon}</span>
                <span className={`flex-1 text-left ${hasActiveChild ? 'font-semibold text-cyan-200' : 'text-cyan-100'}`}>
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={20} className={`${hasActiveChild ? 'text-cyan-400' : 'text-cyan-300'}`} />
                </motion.div>

                {hasActiveChild && (
                    <div className="absolute inset-0 bg-cyan-400/5 rounded-xl pointer-events-none" />
                )}
            </motion.button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1"
                    >
                        <div className={`border-l-2 ${hasActiveChild ? 'border-cyan-400/50' : 'border-cyan-300/20'} ml-[1.65rem] pl-4 mt-2`}>
                            {buttons.map((button, index) => (
                                <div key={button.href} className={`${index !== 0 ? 'mt-2' : ''}`}>
                                    <AnimatedButton
                                        icon={button.icon}
                                        text={button.text}
                                        isActive={activeHref?.startsWith(button.href) ?? false}
                                        href={button.href}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function SidebarNav() {
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()
    const { isInChallenge } = useChallenge();
    
    // Mudando para uma única string que representa a pasta aberta
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (pathname) {
            const groupToOpen = Object.entries(buttonGroups).find(([_, group]) =>
                group.buttons.some(button => pathname.startsWith(button.href))
            );

            if (groupToOpen) {
                setOpenGroup(groupToOpen[0]);
            }
        }
    }, [pathname]);

    const buttonGroups = React.useMemo(() => ({
        estudos: {
            title: "Estudos",
            icon: <BookOpen size={20} />,
            buttons: [
                { icon: <Play size={20} />, text: "Aulas", href: '/aulas' },
                { icon: <ScrollText size={20} />, text: "Questões", href: '/questoes' },
            ]
        },
        competicao: {
            title: "Competição",
            icon: <Target size={20} />,
            buttons: [
                { icon: <TrendingUp size={20} />, text: "Trilhas", href: '/trilhas' },
                { icon: <Swords size={20} />, text: "Duelo", href: '/duelo' },
            ]
        },
        progresso: {
            title: "Progresso",
            icon: <BarChart size={20} />,
            buttons: [
                { icon: <Medal size={20} />, text: "Desempenho", href: '/desempenho' },
                { icon: <Trophy size={20} />, text: "Ranking", href: '/leaderboard' },
            ]
        }
    }), []);

    const handleGroupToggle = (groupKey: string) => {
        setOpenGroup(currentOpen => currentOpen === groupKey ? null : groupKey);
    };

    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: "-100%", opacity: 0 },
    }

    const astronautVariants = {
        animate: {
            x: [0, -6, 6, -6, 0],
            y: [0, 6, -6, 6, 0],
            rotate: [0, -2, 2, -2, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as const,
            },
        },
    }

    return (
        <AnimatePresence>
            {!isMobile && !isInChallenge && (
                <div className="relative">
                    <motion.nav
                        className="fixed left-0 top-16 bottom-0 w-64 bg-[linear-gradient(to_bottom,#040A2F,#081041)] border-r border-solid border-[#121c5c] flex-shrink-0"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div
                            className="absolute inset-0 spotlight-animation"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%),
                                    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%),
                                    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%),
                                    radial-gradient(circle at 60% 10%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%),
                                    radial-gradient(circle at 10% 60%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%),
                                    radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 25%)
                                `,
                                backgroundSize: '400% 400%',
                            }}
                        />
                        <div className="flex flex-col h-full relative z-10">
                            <div className="flex-grow space-y-2 overflow-y-auto custom-scrollbar p-4">
                                <AnimatedButton
                                    icon={<Home size={20} />}
                                    text="Inicio"
                                    isActive={pathname?.startsWith('/inicio') ?? false}
                                    href="/inicio"
                                />
                                
                                {Object.entries(buttonGroups).map(([key, group]) => (
                                    <ButtonGroup
                                        key={key}
                                        title={group.title}
                                        icon={group.icon}
                                        buttons={group.buttons}
                                        isOpen={openGroup === key}
                                        onToggle={() => handleGroupToggle(key)}
                                        activeHref={pathname || ''}
                                    />
                                ))}

                                <AnimatedButton
                                    icon={<Brain size={20} />}
                                    text="Estação Espacial"
                                    isActive={pathname?.startsWith('/ajuda') ?? false}
                                    href="/ajuda"
                                />
                            </div>
                            <div className="p-4">
                                <div className="w-full h-24 rounded-[20px] bg-[#081041] border-solid border-[1px] border-[#4b68e7] relative overflow-hidden">
                                    <Image
                                        src={footerImage}
                                        alt="Footer image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                    <div className="fixed bottom-0 left-64 -translate-x-2/3 translate-y-1/4 z-50">
                        <motion.div 
                            variants={astronautVariants}
                            animate="animate"
                        >
                            <Image
                                src={astronautImage}
                                alt="Astronauta"
                                width={300}
                                height={300}
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
