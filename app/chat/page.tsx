'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Bot, Lock, Menu, Moon, Search, Settings, Sparkles, Sun, Users, Home } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatarBot from "../../assets/images/bot-image.png"
import Image from "next/image"
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatInterface() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputMessage, setInputMessage] = React.useState('')
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }

    setMessages(prevMessages => [...prevMessages, newMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now(),
        text: `Essa é uma resposta simulada para: "${inputMessage}"`,
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse])
    }, 1000)
  }

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className={cn("h-screen flex", darkMode && "dark")}>
      {/* Sidebar */}
      <div
        className={cn(
          "w-64 bg-background border-r flex flex-col",
          isSidebarOpen ? "fixed inset-y-0 left-0 z-50 md:relative" : "hidden md:flex"
        )}
      >
        <div className="p-4 border-b flex flex-col items-center">
          <h1 className="text-xl font-bold">Dionísio</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bot className="w-4 h-4" />
            Chat Dionísio
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home className="w-4 h-4" />
            Eventos
            <span className="ml-auto text-xs bg-[#f0bf5d]/10 text-[#f0bf5d] px-2 py-0.5 rounded">
              VIP
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="w-4 h-4" />
            Minhas Listas
            <span className="ml-auto text-xs bg-[#f0bf5d]/10 text-[#f0bf5d] px-2 py-0.5 rounded">
              VIP
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="w-4 h-4" />
            Configurações
            <span className="ml-auto text-xs bg-[#f0bf5d]/10 text-[#f0bf5d] px-2 py-0.5 rounded">
              VIP
            </span>
          </Button>
        </nav>
        <div className="p-4 border-t space-y-4">
          <div className="bg-[#f0bf5d] text-white rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">Seja VIP</h3>
            </div>
            <p className="text-sm">
              Acesse recursos exclusivos e tenha prioridade nas melhores festas e eventos com o Dionísio VIP!
            </p>
            <Button variant="secondary" className="w-full">
              Começar agora
            </Button>
          </div>
          <Button variant="outline" className="w-full gap-2 bg-[#1c0a40] text-white hover:bg-[#1c0a40]/90">
            <Lock className="w-4 h-4" />
            Configurar API
          </Button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-full"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-between p-4">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-center space-x-2 max-w-[80%]",
                  message.sender === 'user' ? "self-end flex-row-reverse space-x-reverse" : "self-start"
                )}
              >
                {message.sender === 'bot' && (
                  <Image src={avatarBot}
                  alt="David"
                  className="w-[50px] h-[50px] rounded-full relative z-10" />
                )}
                <div
                  className={cn(
                    "flex flex-col",
                    "rounded-lg p-4",
                    "min-w-[200px]",
                    message.sender === 'user' 
                      ? "bg-[#f0bf5d] text-white" 
                      : "bg-purple-100 text-gray-900"
                  )}
                >
                  <h1 className="text-sm font-bold">{message.sender === 'user' ? 'Você' : 'Dionísio AI'}</h1>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="relative">
              <Input
                className="w-full pr-24 h-12 rounded-full border-gray-200"
                placeholder="Pergunte sobre festas, eventos ou como posso te ajudar..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                className="absolute right-1 top-1 rounded-full bg-[#f0bf5d] hover:bg-[#de8c12] h-10"
                onClick={handleSendMessage}
              >
                Enviar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Dionísio AI - Seu assistente pessoal para encontrar os melhores eventos e festas.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

