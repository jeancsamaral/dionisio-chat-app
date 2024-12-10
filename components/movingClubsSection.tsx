"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Instagram } from "lucide-react";
import { StaticImageData } from "next/image";
import { ClubSearch } from "./club-search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarTaxiFront } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import placeholderClub from "@/assets/images/p2.png";
interface Club {
  id: string;
  name: string;
  address: string;
  vipList: boolean;
  photo?: string;
  image?: string;
  uberLink?: string;
  description: string;
  musicalStyle: string;
  averagePrice: string;
  persona: string;
  rating: string;
  workingTime: Record<string, string>;
  vipListInfo: Record<string, string>;
  instagram: string;
  freeEntry?: boolean;
  userRatingTotal?: string;
  vipListBenefits?: {
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  vipListLink?: {
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  singers?: {
    friday?: string;
    // outros dias conforme necessário
  };
}

interface BlogPost {
  tag: string;
  title: string;
  description: string;
  author: string;
  image: string | StaticImageData;
  details: {
    id?: string;
    musicalStyle: string;
    averagePrice: string;
    persona: string;
    rating: string;
    workingTime: Record<string, string>;
    vipListInfo: Record<string, string>;
    instagram: string;
    freeEntry?: boolean;
    userRatingTotal?: string;
    vipListBenefits?: {
      friday?: string;
      saturday?: string;
      sunday?: string;
    };
    vipListLink?: {
      friday?: string;
      saturday?: string;
      sunday?: string;
    };
    singers?: {
      friday?: string;
      // outros dias conforme necessário
    };
    uberLink?: string;
  };
}

// Adicionar o objeto dayTranslations
const dayTranslations: Record<string, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo"
};

export default function MovingClubsSection() {
  const [clubs, setClubs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ANIMATION_SPEED = 0.5;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [filteredClubs, setFilteredClubs] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClub, setSelectedClub] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickStartTime, setClickStartTime] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);

  if (!hasFetched) {
    setHasFetched(true);
    fetchClubs().catch(console.error);
  }

  async function fetchClubs() {
    try {
      const response = await fetch(
        "https://getclubshttp-nridlp6m4a-uc.a.run.app"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Club[] = await response.json();

      const formattedData: BlogPost[] = data.map((club) => ({
        tag: "Clube",
        title: club.name,
        description: club.description || "Sem descrição disponível",
        author: club.address || "Local a confirmar",
        image: club.photo || club.image || placeholderClub,
        details: {
          id: club.id,
          musicalStyle: club.musicalStyle || "",
          averagePrice: club.averagePrice || "",
          persona: club.persona || "",
          rating: club.rating || "",
          workingTime: club.workingTime || {},
          vipListInfo: club.vipListInfo || {},
          instagram: club.instagram || "",
          freeEntry: club.freeEntry,
          userRatingTotal: club.userRatingTotal,
          vipListBenefits: club.vipListBenefits,
          vipListLink: club.vipListLink,
          singers: club.singers,
          uberLink: club.uberLink,
        }
      }));

      setClubs(formattedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setError("Não foi possível carregar os clubes. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  // Funções de movimento do carrossel (igual ao MovingPartiesSection)
  const calculateBoundaries = () => {
    if (!containerRef.current) return { min: 0, max: 0, cardWidth: 350, contentWidth: 0 };
    const containerWidth = containerRef.current.parentElement?.clientWidth || 0;
    const cardWidth = 350;
    const contentWidth = clubs.length * cardWidth;
    
    return {
      min: -contentWidth,
      max: 0,
      cardWidth,
      contentWidth
    };
  };

  const checkAndAdjustPosition = () => {
    const boundaries = calculateBoundaries();
    
    if (translateX <= boundaries.min) {
      setTranslateX(0);
    } else if (translateX > 0) {
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
      const rect = containerRef.current!.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const visibleIndex = Math.floor(relativeX / cardWidth);
      const currentClubs = isSearching ? filteredClubs : clubs;
      
      if (visibleIndex >= 0 && visibleIndex < currentClubs.length) {
        handleSearch(currentClubs[visibleIndex].title);
        setSelectedClub(currentClubs[visibleIndex]);
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
      const rect = containerRef.current!.getBoundingClientRect();
      const relativeX = e.changedTouches[0].clientX - rect.left;
      const visibleIndex = Math.floor(relativeX / cardWidth);
      const currentClubs = isSearching ? filteredClubs : clubs;
      
      if (visibleIndex >= 0 && visibleIndex < currentClubs.length) {
        handleSearch(currentClubs[visibleIndex].title);
        setSelectedClub(currentClubs[visibleIndex]);
      }
    }

    checkAndAdjustPosition();
    setTimeout(() => setIsHovered(false), 1000);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    
    if (!searchTerm.trim()) {
      setFilteredClubs([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filtered = clubs.filter(club => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        club.title.toLowerCase().includes(searchTermLower) ||
        club.description.toLowerCase().includes(searchTermLower) ||
        club.author.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredClubs(filtered);
    setTranslateX(0);
  };

  // Componente do Card
  const ClubCard = ({ club, index }: { club: BlogPost, index: number }) => (
    <div
      key={`${club.title}-${index}`}
      onClick={() => {
        handleSearch(club.title);
        setSelectedClub(club);
      }}
      className="w-[350px] h-[450px] group relative rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm cursor-pointer"
    >
      <div className="aspect-video overflow-hidden rounded-lg h-[200px]">
        <Image
          src={club.image}
          alt={club.title}
          width={350}
          height={200}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          unoptimized={typeof club.image === 'string'}
        />
      </div>
      <div className="mt-4 px-3 pb-6 flex flex-col h-[230px] overflow-hidden">
        <div>
          <h3 className="text-xl font-bold line-clamp-2">{club.title}</h3>
          <p className="mt-2 text-zinc-400 line-clamp-2">{club.description}</p>
          
          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <p>🎵 Estilo: {club.details.musicalStyle}</p>
            <p>💰 Preço médio: {club.details.averagePrice}</p>
            <p>📍 Endereço: {club.author}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Adicionar useEffect para movimento automático
  useEffect(() => {
    const container = containerRef.current;
    if (!container || clubs.length === 0 || isSearching) return;

    let animationFrameId: number;

    const animate = () => {
      if (!isHovered && !isDragging) {
        setTranslateX(prev => {
          const newTranslate = prev - ANIMATION_SPEED;
          
          // Se chegou ao final, volta ao início
          const { min } = calculateBoundaries();
          if (newTranslate <= min) {
            return 0;
          }
          return newTranslate;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, isDragging, clubs.length, isSearching]);

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
            🎉 Confira os clubes disponíveis 🎉
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Clubes com Lista VIP
          </h2>
          <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore os melhores clubes e aproveite suas noites ao máximo 🌟
          </p>
        </div>

        <ClubSearch 
          onSearch={handleSearch} 
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Não há clubes disponíveis no momento.</p>
          </div>
        ) : (
          <div className="relative mt-12 overflow-hidden">
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
                  width: isSearching ? '100%' : `${(filteredClubs.length > 0 ? filteredClubs : clubs).length * 350}px`,
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
              >
                {(isSearching ? filteredClubs : clubs).map((club, index) => (
                  <ClubCard key={`${club.title}-${index}`} club={club} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dialog do club */}
        <Dialog open={!!selectedClub} onOpenChange={() => setSelectedClub(null)}>
          <DialogContent className="bg-purple-950/90 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedClub?.title}</DialogTitle>
            </DialogHeader>
            
            {selectedClub && (
              <div className="space-y-4 pb-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <Image
                    src={selectedClub.image}
                    alt={selectedClub.title}
                    fill
                    className="object-cover"
                    unoptimized={typeof selectedClub.image === 'string'}
                  />
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold text-purple-300">Sobre</h3>
                    <p className="text-gray-300">{selectedClub.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-purple-300">Detalhes</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>🎵 Estilo: {selectedClub.details.musicalStyle}</li>
                        <li>💰 Preço médio: {selectedClub.details.averagePrice}</li>
                        <li>👥 Público: {selectedClub.details.persona}</li>
                        <li>⭐ Avaliação: {selectedClub.details.rating}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-purple-300">Horários</h3>
                      <ul className="space-y-2 text-gray-300">
                        {selectedClub.details.workingTime && 
                          Object.entries(selectedClub.details.workingTime).map(([day, time]) => (
                            <li key={day}>
                              {dayTranslations[day.toLowerCase()] || day}: {time}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>

                  {/* Formulário para adicionar à lista VIP */}
                  <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm relative overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50" />
                    
                    {/* Glow effects */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                    
                    <CardHeader className="relative">
                      <CardTitle className="text-2xl font-bold text-center text-white">
                        <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 text-transparent bg-clip-text">
                          Adicionar à Lista VIP
                        </span>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative">
                      <form
                        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                          e.preventDefault();
                          
                          try {
                            const form = e.currentTarget as HTMLFormElement;
                            const formData = new FormData(form);
                            
                            const name = formData.get("name");
                            const listDate = formData.get("listDate");

                            if (!name || !listDate) {
                              throw new Error("Por favor, preencha todos os campos.");
                            }

                            if (!selectedClub?.details?.id) {
                              throw new Error("ID do clube não encontrado.");
                            }

                            const requestBody = {
                              clubId: selectedClub.details.id,
                              name: name.toString(),
                              listDate: listDate.toString(),
                              userId: "user_001"
                            };

                            const response = await fetch(
                              "https://addnametoviplist-nridlp6m4a-uc.a.run.app",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(requestBody)
                              }
                            );

                            if (response.status === 404) {
                              throw new Error("Clube não encontrado.");
                            }

                            if (!response.ok) {
                              const errorText = await response.text();
                              throw new Error(`Erro ao processar a solicitação: ${errorText}`);
                            }

                            const responseText = await response.text();
                            try {
                              const responseData = JSON.parse(responseText);
                              alert(responseData.message);
                            } catch (parseError) {
                              alert(responseText);
                            }
                            
                            form.reset();
                          } catch (error) {
                            console.error("Detailed error:", {
                              error,
                              type: error instanceof Error ? 'Error' : typeof error,
                              message: error instanceof Error ? error.message : 'Unknown error'
                            });

                            if (error instanceof Error) {
                              alert(error.message);
                            } else {
                              alert("Falha ao adicionar à lista VIP. Tente novamente.");
                            }
                          }
                        }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-purple-200 font-medium">
                            Nome Completo
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Digite seu nome completo"
                            className="bg-purple-900/40 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="listDate" className="text-purple-200 font-medium">
                            Data do Evento
                          </Label>
                          <div className="relative">
                            <Input
                              type="date"
                              id="listDate"
                              name="listDate"
                              required
                              min={new Date().toISOString().split('T')[0]}
                              className="bg-purple-900/40 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                            />
                          </div>
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 animate-pulse-subtle"
                        >
                          Adicionar à Lista VIP
                        </Button>

                        {selectedClub.details.uberLink && (
                          <Button 
                            type="button"
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-2 bg-purple-900/40 hover:bg-purple-800/50 border-purple-500/30 hover:border-purple-400/50 text-purple-200 transition-all duration-300"
                            onClick={() => window.open(selectedClub.details.uberLink, '_blank')}
                          >
                            <CarTaxiFront className="h-4 w-4" />
                            Uber
                          </Button>
                        )}
                      </form>

                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
                      <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
                    </CardContent>
                  </Card>

                  <div className="flex justify-center pt-4">
                    {selectedClub.details.instagram && (
                      <a
                        href={selectedClub.details.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                      >
                        Seguir no Instagram
                      </a>
                    )}
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
