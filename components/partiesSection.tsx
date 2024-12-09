"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import placeholderEvent from "@/assets/images/p2.png";
import { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

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
}

function useScreenSize() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
}

export default function PartiesSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useScreenSize();

  const ITEMS_PER_PAGE = isDesktop ? 3 : 1;

  useEffect(() => {
    setCurrentPage(0);
  }, [isDesktop]);

  useEffect(() => {
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
    fetchParties();
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleBlogs = blogs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Não há festas disponíveis no momento.</p>
          </div>
        ) : (
          <div className="relative mt-12">
            {/* Setas laterais */}
            {blogs.length > ITEMS_PER_PAGE && (
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

            {/* Grid de cards */}
            <div className="mx-auto grid max-w-7xl items-start gap-8 py-12 place-items-center grid-cols-1 lg:grid-cols-3 relative">
              {visibleBlogs.map((blog, index) => (
                <Link
                  key={`${index}-${blog.title}`}
                  href={blog.link}
                  target="_blank"
                  className="w-[350px] group relative rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 bg-purple-950/30 rounded-3xl shadow-2xl backdrop-blur-sm"
                >
                  <div className="aspect-video overflow-hidden rounded-lg h-[200px]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={350}
                      height={200}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
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
                </Link>
              ))}
            </div>

            {/* Dots abaixo dos cards */}
            {blogs.length > ITEMS_PER_PAGE && (
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
    </section>
  );
}
