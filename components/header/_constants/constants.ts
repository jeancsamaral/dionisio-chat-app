import {
    Activity,
    Trophy,
    List,
    Cpu,
    Play,
    Home,
  } from "lucide-react"

export const navLinks = [
    { href: "/inicio", label: "Início", className: "text-muted-foreground", icon: Home },
    { href: "/desempenho", label: "Desempenho", className: "text-muted-foreground", icon: Activity },
    { href: "/aulas", label: "Aulas", className: "text-muted-foreground", icon: Play },
    { href: "/questoes", label: "Questões", className: "text-muted-foreground", icon: List },
    { href: "/leaderboard", label: "Leaderboard", className: "text-muted-foreground", icon: Trophy },
    { href: "/ajuda", label: "Ajuda", className: "text-muted-foreground", icon: Cpu }, 
  ];