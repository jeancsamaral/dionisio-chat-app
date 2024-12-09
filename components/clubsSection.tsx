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
import { ArrowDown, Car } from "lucide-react";

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
  const [clubs, setClubs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useScreenSize();
  const [selectedClub, setSelectedClub] = useState<BlogPost | null>(null);

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
    fetchClubs();
  }, []);

  const totalPages = Math.ceil(clubs.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleClubs = clubs.slice(
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
            🎉 Confira os clubes disponíveis 🎉
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Clubes com Lista VIP
          </h2>
          <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore os melhores clubes e aproveite suas noites ao máximo 🌟
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Não há clubes disponíveis no momento.</p>
          </div>
        ) : (
          <div className="relative mt-12">
            {clubs.length > ITEMS_PER_PAGE && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-[-50px] top-[40%] z-10 p-2 rounded-full bg-purple-950/30 hover:bg-purple-900/50 transition-all opacity-50 hover:opacity-100"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-6 w-6 text-purple-300" />
                </button>

                <button
                  onClick={nextPage}
                  className="absolute right-[-50px] top-[40%] z-10 p-2 rounded-full bg-purple-950/30 hover:bg-purple-900/50 transition-all opacity-50 hover:opacity-100"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-6 w-6 text-purple-300" />
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

            {clubs.length > ITEMS_PER_PAGE && (
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

                <div>
                  <motion.div
                    className="flex justify-start mt-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  >
                    {selectedClub.details.uberLink && (
                      <Link href={selectedClub.details.uberLink} passHref>
                        <motion.button
                          className="py-2 px-6 rounded-full text-base bg-purple-800 hover:bg-purple-600 text-white flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Uber
                          <Car className="ml-2 w-4 h-4" />
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                </div>

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
