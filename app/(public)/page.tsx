"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bot, Zap, Shield, Coffee } from "lucide-react";

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
        <div className="max-w-4xl mx-auto space-y-8">
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
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-gray-500 dark:text-gray-400">Une plateforme complète pour automatiser votre WhatsApp Business.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🤖", title: "Agents IA", desc: "Créez des assistants virtuels qui répondent automatiquement à vos clients 24h/24." },
            { icon: "📊", title: "CRM Intégré", desc: "Gérez vos leads et suivez vos conversations directement depuis le tableau de bord." },
            { icon: "⚡", title: "Réponses instantanées", desc: "Vos clients reçoivent une réponse en moins de 2 secondes, à toute heure." },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02] text-left">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tarifs simples et transparents</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12">Commencez gratuitement, évoluez selon vos besoins.</p>
          <div className="p-8 rounded-2xl border-2 border-wa-green bg-wa-green/5">
            <div className="text-5xl font-extrabold mb-2">Gratuit</div>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Pour commencer dès aujourd'hui</p>
            <Link href="/login?signup=true">
              <Button variant="wa" size="lg" className="w-full shadow-neon">
                Créer un compte gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-400">
        © 2026 WhatsAppAgent. Tous droits réservés.
      </footer>
    </div>
  );
}
