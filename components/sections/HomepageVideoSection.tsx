'use client';

import * as React from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Play, Pause, Volume2, Maximize2, Activity, ShieldCheck, Cpu } from 'lucide-react';

export function HomepageVideoSection() {
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
      <SectionHeading
        badge="Platform Demonstration"
        title="See Governed AI Systems in Live Production Execution"
        description="Watch how our real-time voice receptionists, autonomous support agents, and workflow pipelines execute within strict enterprise guardrails."
      />

      {/* Cinematic Video Showcase Frame */}
      <div className="relative rounded-3xl border border-border bg-surface-raised overflow-hidden shadow-2xl shadow-accent/10">
        {/* Glowing ambient backlight */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-accent/20 blur-3xl opacity-75" />

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center group">
          {/* Main Visual Frame */}
          <Image
            src="/images/hero-preview.jpg"
            alt="TechCentera Enterprise AI Architecture Demonstration"
            fill
            className="object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
            priority
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

          {/* Top Status Bar on Video Frame */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>LIVE ORCHESTRATION PIPELINE · v4.2</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                Latency: 31.4ms
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                Accuracy: 99.4%
              </span>
            </div>
          </div>

          {/* Central Play/Pause Action Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause demonstration video' : 'Play demonstration video'}
            className="relative z-20 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-accent/90 text-white hover:bg-accent hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-accent/50 cursor-pointer backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 sm:h-10 sm:w-10 fill-current" />
            ) : (
              <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current ml-1" />
            )}
          </button>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-3">
            {/* Scrubber Bar */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div className="h-full bg-accent w-2/3 rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/80 font-mono">
              <div className="flex items-center gap-3">
                <span>02:14 / 03:45</span>
                <span className="text-white/40">|</span>
                <span className="text-accent font-semibold">Deterministic Guardrails: Active</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 hover:text-accent cursor-pointer transition-colors" />
                <Maximize2 className="h-4 w-4 hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Beneath Video */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border bg-surface-card p-6 sm:p-8">
          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase">
              <Activity className="h-4 w-4" />
              <span>Voice & Intake Telemetry</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Sub-500ms conversational voice loop with direct CRM data synchronization.
            </p>
          </div>

          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Deterministic Enforcement</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Strict schema boundary rules guarantee zero hallucinations on enterprise data.
            </p>
          </div>

          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase">
              <Cpu className="h-4 w-4" />
              <span>Idempotent ERP Queues</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Event-driven workers bridge modern agents to legacy on-premise databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
