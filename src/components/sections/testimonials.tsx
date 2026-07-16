"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRight } from "@/components/icons";
import { SectionGrid, SectionHeader } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "Support tickets dropped by a third once the answer engine went live. It quotes our docs. It doesn't improvise.",
    author: "Amara Okafor",
    role: "Head of Engineering, Northwind",
    image: "/images/testimonials/amara-okafor.jpg",
    className: "object-top",
  },
  {
    quote:
      "A feature merged on Friday and the docs PR was waiting for review Monday morning. Track closed a gap we'd had for years.",
    author: "Daniel Reyes",
    role: "Platform Lead, Fathom",
    image: "/images/testimonials/daniel-reyes.jpg",
  },
  {
    quote: "The readiness score sold our whole team. Docs quality finally shows up in CI like test coverage.",
    author: "Priya Nair",
    role: "VP Developer Experience, Latimer",
    image: "/images/testimonials/priya-nair.jpg",
    className: "object-top",
  },
  {
    quote:
      "Engineering's contribution to docs is one @thally comment. I review a queue of drafted PRs instead of chasing teams.",
    author: "Sam Whitfield",
    role: "Staff Engineer, Kepler Labs",
    image: "/images/testimonials/sam-whitfield.jpg",
    className: "object-top",
  },
  {
    quote:
      "The migration from Mintlify was one command. Claude and ChatGPT started quoting our docs correctly the same week.",
    author: "Tomas Berg",
    role: "DevRel Lead, Brightwire",
    image: "/images/testimonials/tomas-berg.jpg",
    className: "object-top",
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-background section-padding relative overflow-x-clip">
      <SectionGrid className="opacity-25" mask="linear-gradient(to bottom,black,transparent_65%)" />

      <div className="relative container">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Customer voices"
            title="Teams that switched don't go back"
            description="Engineering and DevRel leaders describe what changed once one source fed their readers, search, chat, and every AI agent, and the docs stopped drifting."
            layout="stack"
          />
          <Button asChild variant="outline" className="group mt-6">
            <Link href="/about">
              See how teams use Thally
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 min-w-0 md:mt-12 lg:mt-20">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="min-w-0">
            <div className="relative min-w-0 overflow-x-clip lg:-mr-[max(2rem,calc((100vw-80rem)/2+5rem))]">
              <CarouselContent>
                {TESTIMONIALS.map((testimonial, index) => (
                  <CarouselItem key={testimonial.author} className="basis-4/5 md:basis-1/2 lg:basis-[34%]">
                    <Card className="h-full overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="bg-muted relative aspect-[4/3.3] w-full">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className={cn(
                              "object-cover transition-all",
                              testimonial.className,
                              current !== index && "mix-blend-luminosity",
                            )}
                            sizes="(max-width: 768px) 80vw, 34vw"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-5 pb-6">
                        <blockquote className="text-lg leading-7 font-semibold tracking-tight text-balance md:text-xl">
                          {testimonial.quote}
                        </blockquote>
                      </CardContent>
                      <CardFooter className="flex-col items-start pb-6">
                        <div className="font-semibold max-md:text-sm">{testimonial.author}</div>
                        <div className="text-muted-foreground text-xs md:text-sm">{testimonial.role}</div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            <div className="container">
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={cn(
                        "size-3 rounded-full transition-colors",
                        current === index ? "bg-foreground" : "bg-foreground/30 hover:bg-foreground/50",
                      )}
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="bg-background/60 hover:bg-background static size-11 translate-y-0 [&>svg]:size-6" />
                  <CarouselNext className="bg-background/60 hover:bg-background static size-11 translate-y-0 [&>svg]:size-6" />
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
