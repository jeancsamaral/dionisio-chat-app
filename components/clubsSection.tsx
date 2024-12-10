"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import placeholderClub from "@/assets/images/p2.png"; // A placeholder image for clubs
import { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ArrowDown, Car, CalendarIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CarTaxiFront } from "lucide-react";

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

function useScreenSize() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024); // 1024px é o breakpoint do Tailwind para 'lg'
    }

    // Definir o valor inicial
    handleResize();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
}

const dayTranslations: Record<string, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo"
};

export default function ClubsSection() {
  const [date, setDate] = useState<Date | undefined>();
  const [clubs, setClubs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useScreenSize();
  const [selectedClub, setSelectedClub] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para o termo de pesquisa

  // Ajuste o ITEMS_PER_PAGE baseado no tamanho da tela
  const ITEMS_PER_PAGE = isDesktop ? 3 : 1;

  // Recalcular a página atual quando mudar o tamanho da tela
  useEffect(() => {
    setCurrentPage(0); // Reset para primeira página quando mudar o layout
  }, [isDesktop]);

  useEffect(() => {
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
        setError("Não foi possível carregar baladas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleClubs = filteredClubs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleClubClick = (club: BlogPost) => {
    setSelectedClub(club);
  };

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
            🎉 Confira as Baladas disponíveis 🎉
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Baladas com Lista VIP
          </h2>
          <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore as melhores baladas e aproveite suas noites ao máximo 🌟
          </p>
          <input
            type="text"
            placeholder="Pesquisar baladas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 p-2 rounded opacity-70 bg-purple-900/40 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Nenhum clube encontrado.</p>
          </div>
        ) : (
          <div className="relative mt-12">
            {filteredClubs.length > ITEMS_PER_PAGE && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-0 lg:left-[-50px] top-[25%] lg:top-[40%] z-10 p-3 lg:p-2 rounded-full bg-purple-600/80 hover:bg-purple-500 transition-all lg:bg-purple-950/30 lg:hover:bg-purple-900/50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-8 w-8 lg:h-6 lg:w-6 text-white lg:text-purple-300" />
                </button>

                <button
                  onClick={nextPage}
                  className="absolute right-0 lg:right-[-50px] top-[25%] lg:top-[40%] z-10 p-3 lg:p-2 rounded-full bg-purple-600/80 hover:bg-purple-500 transition-all lg:bg-purple-950/30 lg:hover:bg-purple-900/50"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-8 w-8 lg:h-6 lg:w-6 text-white lg:text-purple-300" />
                </button>
              </>
            )}

            <div className="mx-auto grid max-w-7xl items-start gap-8 py-12 place-items-center grid-cols-1 lg:grid-cols-3 relative">
              {visibleClubs.map((club, index) => (
                <div
                  key={`${index}-${club.title}`}
                  onClick={() => handleClubClick(club)}
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
                      
                      {/* Informações básicas */}
                      <div className="mt-4 space-y-2 text-sm text-zinc-300">
                        <p>🎵 Estilo: {club.details.musicalStyle}</p>
                        <p>💰 Preço médio: {club.details.averagePrice}</p>
                        <p>📍 Endereço: {club.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredClubs.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === index 
                        ? "bg-purple-500 w-4" 
                        : "bg-purple-300/30 hover:bg-purple-400/50"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal com todas as informações */}
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
    </section>
  );
}

// Add this CSS to your global styles or component
const pulseSubtle = {
  '@keyframes pulse-subtle': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.8,
    },
  },
  '.animate-pulse-subtle': {
    animation: 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};
