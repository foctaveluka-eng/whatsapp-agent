"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  Users, 
  ShoppingBag, 
  BookOpen, 
  LayoutTemplate, 
  Settings,
  LogOut,
  Bell,
  Search
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

const sidebarLinks = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents IA", href: "/agents", icon: Bot },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Commandes", href: "/orders", icon: ShoppingBag },
  { name: "Base de connaissances", href: "/knowledge", icon: BookOpen },
  { name: "Widgets", href: "/widgets", icon: LayoutTemplate },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] dark:bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Bot className="text-wa-green w-6 h-6" />
            <span>WhatsApp<span className="text-wa-green">Agent</span></span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-wa-green/10 text-wa-green dark:bg-wa-green/20 dark:text-wa-green" 
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-wa-green" : ""}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="w-96 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-10 h-9 bg-gray-50 dark:bg-white/5 border-transparent" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-wa-green"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-wa-green to-teal-500 cursor-pointer flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
