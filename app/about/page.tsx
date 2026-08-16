import { Container } from "@/components/ui/container";
import { InstagramVideos } from "./_components/instagram-videos";
import { GsapReveal } from "@/components/animation";
import { SplitTextLink } from "@/components/ui/split-text-link";
import { ArrowUpRight } from "lucide-react";
import { CollaborationMarquee } from "../contact/_components/collaboration-marquee";
import {
  aboutMeta,
  heroKicker,
  heroTitle,
  heroDescription,
  channel,
  reviewProcess,
  coverage,
  socialLinks,
  transparency,
  instagramVideos,
} from "@/content/site/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

const aboutMarqueeItems = [
  "GAMING GEAR REVIEW",
  "KEYBOARD",
  "MOUSE",
  "AUDIO",
  "HONEST OPINION",
  "BUYING GUIDE",
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <Container className="max-w-[1440px] pt-28 pb-16 sm:pt-36 sm:pb-24">
        <GsapReveal delay={0.15} y={40}>
          <section className="grid gap-12 border-b border-border pb-16 sm:pb-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
              {heroKicker}
            </p>
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.94] sm:text-7xl lg:text-8xl">
              {heroTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {heroDescription}
            </p>
          </div>
          </section>
        </GsapReveal>

        <CollaborationMarquee items={aboutMarqueeItems} label="Topik TahuTech" />

        <GsapReveal delay={0.15} y={36}>
          <section className="grid gap-8 border-b border-border py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">{channel.kicker}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {channel.title}
            </h2>
            <div className="mt-8 grid gap-6 text-muted-foreground sm:grid-cols-2">
              {channel.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          </section>
        </GsapReveal>

        <GsapReveal delay={0.15} y={36}>
          <section className="border-b border-border py-16 sm:py-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">{reviewProcess.kicker}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{reviewProcess.title}</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {reviewProcess.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3">
            {reviewProcess.steps.map((step, i) => {
              const isLastInRow = (i + 1) % 3 === 0;
              const isLastRow = Math.floor(i / 3) === Math.floor((reviewProcess.steps.length - 1) / 3);
              return (
                <article
                  key={step.index}
                  className={`p-6 sm:p-8 border-border ${!isLastInRow ? 'md:border-r' : ''} ${!isLastRow ? 'border-b md:border-b' : 'border-b md:border-b-0'}`}
                >
                  <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">{step.index}</p>
                  <h3 className="mt-12 text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </article>
              );
            })}
          </div>
          </section>
        </GsapReveal>

        <GsapReveal delay={0.15} y={36}>
          <section className="grid gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">YANG DIBAHAS</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {coverage.map((item) => (
                <span key={item} className="text-2xl font-semibold tracking-tight sm:text-4xl">{item}</span>
              ))}
            </div>
          </div>
          </section>
        </GsapReveal>

        <GsapReveal delay={0.15} y={36}>
          <InstagramVideos videos={instagramVideos} />
        </GsapReveal>

        <GsapReveal delay={0.15} y={36}>
          <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">IKUTI TAHUTECH ID</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid sm:grid-cols-2">
              {socialLinks.map((link, i) => {
                const isLastInRow = (i + 1) % 2 === 0;
                const isLastRow = Math.floor(i / 2) === Math.floor((socialLinks.length - 1) / 2);
                return (
                  <div
                    key={link.label}
                    className={`flex min-h-44 flex-col justify-between bg-background p-6 sm:p-8 border-border ${!isLastInRow ? 'sm:border-r' : ''} ${!isLastRow ? 'border-b sm:border-b' : 'border-b sm:border-b-0'}`}
                  >
                    <span className="text-sm text-muted-foreground">{link.handle}</span>
                    <SplitTextLink
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full items-center justify-between text-2xl font-semibold tracking-tight text-foreground"
                      textClassName="justify-between"
                      activeTextClassName="text-muted-foreground"
                      icon={<ArrowUpRight className="h-5 w-5" />}
                    >
                      {link.label}
                    </SplitTextLink>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 border-l-2 border-foreground pl-5">
              <h2 className="text-lg font-semibold">{transparency.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {transparency.description}
              </p>
            </div>
          </div>
        </section>
        </GsapReveal>
      </Container>
    </div>
  );
}
