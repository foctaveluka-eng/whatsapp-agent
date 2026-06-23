"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bot, MessageSquare, Zap, Shield, Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white dark:bg-[#0A0A0A]">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wa-green/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Bot className="text-wa-green w-6 h-6" />
            <span>WhatsApp<span className="text-wa-green">Agent</span></span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-wa-green transition">Fonctionnalités</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-wa-green transition">Tarifs</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/login?signup=true">
              <Button variant="wa" className="shadow-neon">Démarrer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 text-wa-green border border-wa-green/20 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green"></span>
            </span>
            L'outil IA n°1 pour WhatsApp
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Automatisez <span className="wa-gradient-text">votre WhatsApp</span><br />
            avec l'Intelligence Artificielle
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Créez des assistants virtuels puissants. Qualifiez vos leads, répondez au support client et prenez des rendez-vous automatiquement 24h/24.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login?signup=true">
              <Button size="lg" variant="wa" className="w-full sm:w-auto gap-2 group shadow-neon-strong">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="https://www.buymeacoffee.com/" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <Coffee className="w-5 h-5 text-yellow-500" />
                Soutenir le projet
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 pt-8">
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-wa-green" /> Sans carte bancaire</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-wa-green" /> Setup en 5 minutes</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
