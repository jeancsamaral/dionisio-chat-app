"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Instagram } from "lucide-react";
import placeholderEvent from "@/assets/images/p2.png";
import { StaticImageData } from "next/image";
import { PartySearch } from "./party-search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Party {
  id: string;
  party: string;
  description?: string;
  date: any;
  address: string;
  platform: string;
  link: string;
  emission: string;
  photo?: string;
  imageUrl?: string;
  organizer?: string;
  active: boolean;
  instagramLink?: string;
}

interface BlogPost {
  tag: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string | StaticImageData;
  link: string;
  instagramLink?: string;
  emission?: string;
}

export default function PartiesSectionTeste() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ANIMATION_SPEED = 0.5; // Velocidade do slide
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedParty, setSelectedParty] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickStartTime, setClickStartTime] = useState(0);
  const [pixFormData, setPixFormData] = useState({
    email: '',
    quantity: 1,
  });
  const [hasFetched, setHasFetched] = useState(false);

  if (!hasFetched) {
    setHasFetched(true);
    fetchParties().catch(console.error);
  }

  async function fetchParties() {
    try {
      const response = await fetch(
        "https://getpartieshttp-nridlp6m4a-uc.a.run.app"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Party[] = await response.json();

      const activeParties = data.filter(party => party.active === true);

      const formattedData: BlogPost[] = activeParties.map((party) => {
        let dateStr = "Data a confirmar";
        if (party.date && party.date._seconds) {
          const date = new Date(party.date._seconds * 1000);
          dateStr = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        }

        const description = party.description || 
          `${party.party} em ${party.address}. ${party.emission === "ingresse" ? "Ingressos disponíveis!" : ""}`;

        return {
          tag: "Festa",
          title: party.party,
          description: description,
          author: party.address || "Local a confirmar",
          date: dateStr,
          image: party.photo || party.imageUrl || placeholderEvent,
          link: party.link || "#",
          instagramLink: party.instagramLink,
        };
      });
      
      setBlogs(formattedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching parties:", error);
      setError("Não foi possível carregar os eventos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  // Função para calcular os limites do drag
  const calculateBoundaries = () => {
    if (!containerRef.current) return { min: 0, max: 0, cardWidth: 350, contentWidth: 0 };
    const containerWidth = containerRef.current.parentElement?.clientWidth || 0;
    const cardWidth = 350; // Largura do card + gap
    const contentWidth = blogs.length * cardWidth; // Largura de um conjunto
    
    return {
      min: -contentWidth,
      max: 0,
      cardWidth,
      contentWidth
    };
  };

  // Função para limitar o valor do translateX dentro dos limites
  const clampTranslate = (value: number) => {
    const { min, max } = calculateBoundaries();
    return Math.min(Math.max(value, min), max);
  };

  // Função para verificar e ajustar a posição
  const checkAndAdjustPosition = () => {
    const boundaries = calculateBoundaries();
    
    if (translateX <= boundaries.min) {
      // Se chegou ao final, volta para o início
      setTranslateX(0);
    } else if (translateX > 0) {
      // Se passou do início, vai para o final
      setTranslateX(boundaries.min);
    }
  };

  // Função para iniciar o drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickStartTime(Date.now());
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(translateX);
    setDragStartX(e.pageX);
    setIsHovered(true);
  };

  // Função para terminar o drag
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    
    const clickDuration = Date.now() - clickStartTime;
    const isClick = Math.abs(e.pageX - dragStartX) < 5 && clickDuration < 200;

    if (isClick) {
      const cardWidth = 350;
      const scrollOffset = Math.abs(translateX);
      const clickX = e.pageX - containerRef.current!.offsetLeft + scrollOffset;
      const cardIndex = Math.floor(clickX / cardWidth) % blogs.length;
      const currentBlogs = isSearching ? filteredBlogs : blogs;
      
      if (currentBlogs[cardIndex]) {
        handleSearch(currentBlogs[cardIndex].title);
        setSelectedParty(currentBlogs[cardIndex]);
      }
    }

    checkAndAdjustPosition();
    setTimeout(() => setIsHovered(false), 1000);
  };

  // Função para o movimento do drag
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    setTranslateX(scrollLeft + walk);
    checkAndAdjustPosition();
  };

  // Funções para touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setClickStartTime(Date.now());
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current!.offsetLeft);
    setScrollLeft(translateX);
    setDragStartX(e.touches[0].pageX);
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    setTranslateX(scrollLeft + walk);
    checkAndAdjustPosition();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);
    
    const clickDuration = Date.now() - clickStartTime;
    const isClick = Math.abs(e.changedTouches[0].pageX - dragStartX) < 5 && clickDuration < 200;

    if (isClick) {
      const cardWidth = 350;
      const scrollOffset = Math.abs(translateX);
      const clickX = e.changedTouches[0].pageX - containerRef.current!.offsetLeft + scrollOffset;
      const cardIndex = Math.floor(clickX / cardWidth) % blogs.length;
      const currentBlogs = isSearching ? filteredBlogs : blogs;
      
      if (currentBlogs[cardIndex]) {
        handleSearch(currentBlogs[cardIndex].title);
        setSelectedParty(currentBlogs[cardIndex]);
      }
    }

    checkAndAdjustPosition();
    setTimeout(() => setIsHovered(false), 1000);
  };

  // Função para reposicionar o carrossel
  const resetPosition = () => {
    // Reposiciona instantaneamente sem animação
    setTranslateX(0);
  };

  // Atualizar useEffect do movimento automático
  useEffect(() => {
    const container = containerRef.current;
    if (!container || blogs.length === 0 || isSearching) return; // Não animar durante pesquisa

    let animationFrameId: number;

    const animate = () => {
      if (!isHovered && !isDragging) {
        setTranslateX(prev => {
          const newTranslate = prev - ANIMATION_SPEED;
          return newTranslate;
        });
        checkAndAdjustPosition();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, isDragging, blogs.length, translateX, isSearching]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    
    if (!searchTerm.trim()) {
      setFilteredBlogs([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filtered = blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setTranslateX(0);
  };

  // Modifique o Link para um div clicável
  const PartyCard = ({ blog, index }: { blog: BlogPost, index: number }) => (
    <div
      key={`${blog.title}-${index}`}
      onClick={() => {
        handleSearch(blog.title);
        setSelectedParty(blog);
      }}
      className="w-[350px] flex-shrink-0 group relative rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm cursor-pointer"
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          unoptimized={typeof blog.image === 'string'}
        />
      </div>
      <div className="mt-4 px-3 pb-6 h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a47] text-white">
              {blog.tag}
            </span>
            {blog.instagramLink && (
              <Link
                href={blog.instagramLink}
                target="_blank"
                className="text-purple-400 hover:text-purple-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="w-5 h-5" />
              </Link>
            )}
          </div>
          <h3 className="mt-2 text-xl font-bold line-clamp-2">{blog.title}</h3>
          <p className="mt-2 text-zinc-400 line-clamp-2">
            {blog.description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {blog.date}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="w-full pt-32 pb-10 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#1a1a47] px-3 py-1 text-sm">
            🎉 Veja o que está rolando 🎉
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Festas Imperdíveis
          </h2>
          <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Garanta seu ingresso e faça parte dos eventos mais épicos da cidade 🎉
          </p>
        </div>

        <PartySearch 
          onSearch={handleSearch} 
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Não há festas disponíveis no momento.</p>
          </div>
        ) : (
          <div className="relative mt-12 overflow-hidden">
            {/* Gradientes condicionais */}
            {!isSearching && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10">
                  <div className="w-full h-full bg-gradient-to-r from-[#1e0b34] via-purple-950/30 to-transparent" />
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-32 z-10">
                  <div className="w-full h-full bg-gradient-to-l from-[#1e0b34] via-purple-950/30 to-transparent" />
                </div>
              </>
            )}

            <div
              className={`w-full overflow-hidden ${!isSearching ? 'cursor-grab active:cursor-grabbing' : ''}`}
              onMouseEnter={() => !isSearching && setIsHovered(true)}
              onMouseLeave={() => !isSearching && !isDragging && setIsHovered(false)}
              onMouseDown={(e) => !isSearching && handleMouseDown(e)}
              onMouseUp={(e) => !isSearching && handleMouseUp(e)}
              onMouseMove={(e) => !isSearching && handleMouseMove(e)}
              onTouchStart={(e) => !isSearching && handleTouchStart(e)}
              onTouchMove={(e) => !isSearching && handleTouchMove(e)}
              onTouchEnd={(e) => !isSearching && handleTouchEnd(e)}
            >
              <div
                ref={containerRef}
                className={`flex ${
                  isDragging ? 'transition-none' : 'transition-transform duration-500'
                } ease-linear gap-6 ${isSearching ? 'flex-wrap justify-center' : ''}`}
                style={{
                  transform: isSearching ? 'none' : `translateX(${translateX}px)`,
                  width: isSearching ? '100%' : `${(filteredBlogs.length > 0 ? filteredBlogs : blogs).length * 350}px`,
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
              >
                {(isSearching ? filteredBlogs : blogs).map((blog, index) => (
                  <PartyCard key={`${blog.title}-${index}`} blog={blog} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dialog para exibir detalhes da festa */}
        <Dialog open={!!selectedParty} onOpenChange={() => setSelectedParty(null)}>
          <DialogContent className="bg-purple-950/90 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedParty?.title}
              </DialogTitle>
            </DialogHeader>

            {selectedParty && (
              <div className="space-y-4 pb-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <Image
                    src={selectedParty.image}
                    alt={selectedParty.title}
                    fill
                    className="object-cover"
                    unoptimized={typeof selectedParty.image === 'string'}
                  />
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold text-purple-300">Sobre</h3>
                    <p className="text-gray-300">{selectedParty.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-purple-300">Detalhes</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>📍 Local: {selectedParty.author}</li>
                        <li>📅 Data: {selectedParty.date}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4 pt-4">
                    {selectedParty.link && (
                      <a
                        href={selectedParty.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                      >
                        Comprar Ingresso
                      </a>
                    )}
                    
                    {selectedParty.instagramLink && (
                      <a
                        href={selectedParty.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Seguir no Instagram
                      </a>
                    )}

                    <div className="w-full space-y-4 mt-4">
                      <div className="bg-purple-900/40 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg text-center">Comprar com Pix</h3>
                        <h6 className="text-sm text-center text-gray-200">Comprar sem taxa com Dionísio</h6>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email {selectedParty?.emission || ""}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={pixFormData.email}
                            onChange={(e) => setPixFormData(prev => ({
                              ...prev,
                              email: e.target.value
                            }))}
                            className="bg-purple-900/40 border-purple-500/30 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantidade de ingressos</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={pixFormData.quantity}
                            onChange={(e) => setPixFormData(prev => ({
                              ...prev,
                              quantity: parseInt(e.target.value) || 1
                            }))}
                            className="bg-purple-900/40 border-purple-500/30 text-white"
                          />
                        </div>

                        <div className="text-sm text-purple-200 space-y-1">
                          <p>Valor unitário: R$ 100,00</p>
                          <p>Total: R$ {(pixFormData.quantity * 100).toFixed(2)}</p>
                        </div>

                        <button
                          onClick={async () => {
                            if (!pixFormData.email) {
                              alert("Por favor, preencha seu email.");
                              return;
                            }

                            try {
                              const response = await fetch("https://setefipixkeyhttp-nridlp6m4a-uc.a.run.app", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  party: selectedParty.title,
                                  quantity: pixFormData.quantity,
                                  email: pixFormData.email,
                                  ticketType: "Standard",
                                  userId: "user_123",
                                  value: (pixFormData.quantity * 100).toFixed(2),
                                  partyId: "party_456",
                                }),
                              });

                              if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                              }

                              const data = await response.json();
                              alert("Chave Pix gerada com sucesso! Verifique seu email para mais detalhes.");
                              setPixFormData({ email: '', quantity: 1 }); // Reset form
                            } catch (error) {
                              console.error("Error generating Pix key:", error);
                              alert("Falha ao gerar chave Pix. Tente novamente mais tarde.");
                            }
                          }}
                          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                        >
                          Gerar Chave Pix
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
