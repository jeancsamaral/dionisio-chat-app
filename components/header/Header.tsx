"use client"

import Link from "next/link"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/components/header/_constants/constants"
import Image from "next/image"
import logobranca from "@/assets/images/logoazul.png"
import maracanau from "@/assets/images/maracanau.jpeg"
import avatar from "@/assets/avatar.png"
import XPStar from "../animated_icons/XPStar"
import AtomIcon from "../animated_icons/AtomIcon"
import { useUserInformation } from "@/context/userContext";
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user } = useUserInformation();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#121c5c] bg-[linear-gradient(to_top,#040A2F,#081041)] shadow-2xl ">
      <div className="mx-4 px-4  ">
        <div className="flex h-16 items-center justify-between ">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu de navegação</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  {navLinks.map((link) => {
                    const isActive = pathname?.startsWith(link.href);
                    return (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        className={`hover:text-foreground ${isActive ? 'text-foreground' : link.className} flex items-center gap-2`}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logobranca}
                alt="Atomize Logo"
                className="h-8 w-8 brightness-200"
              />
              <span className="text-lg font-semibold text-white hidden md:inline">Atomize</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 ">
            {/* <Image
              src={maracanau}
              alt="Maracanau"
              className="h-8 w-8 rounded-full border-2 border-[#2538b6]"
            /> */}
            <XPStar xp={user?.balance?.xp || 0} />
            <AtomIcon count={user?.balance?.atom || 0} />

            {/* Ícone de notificação */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6 text-blue-300" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    alt="User avatar"
                    src={avatar}
                    className="h-8 w-8 rounded-full border-2 border-[#2538b6]"
                  />
                  <span className="sr-only">Menu do usuário</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Suporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
