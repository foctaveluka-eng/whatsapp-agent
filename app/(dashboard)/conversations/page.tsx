"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MessageSquare, Send, Bot, User, Phone } from "lucide-react";

export default function ConversationsPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 max-w-7xl mx-auto">
      {/* Sidebar Contacts */}
      <Card className="w-80 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-white/5">
          <Input placeholder="Rechercher une discussion..." className="h-9" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 font-medium shrink-0">
                U{i}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-semibold truncate">Utilisateur {i}</h4>
                  <span className="text-xs text-gray-500">14:32</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Bonjour, je voudrais des informations...</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col p-0 overflow-hidden relative">
        {/* Header */}
        <div className="h-16 px-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-[#1A1A2E]/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 font-medium">
              U1
            </div>
            <div>
              <h3 className="font-semibold">Utilisateur 1</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Phone className="w-3 h-3" /> +33 6 12 34 56 78
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-black/50 p-1 rounded-lg">
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-white/10 shadow-sm">
              🤖 Auto (IA)
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-black dark:hover:text-white">
              👨‍💻 Manuel
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#E5DDD5] dark:bg-[#0b141a] bg-opacity-20 dark:bg-opacity-20">
          <div className="flex justify-end">
            <div className="bg-wa-green-light dark:bg-wa-teal text-black dark:text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
              <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-300/70 float-right mt-1 ml-2">14:30</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#202c33] text-black dark:text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
              <p className="text-sm">Je voudrais des informations sur vos tarifs.</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 float-right mt-1 ml-2">14:32</span>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A1A2E]">
          <div className="flex items-center gap-2">
            <Input placeholder="Tapez un message..." className="flex-1 bg-gray-50 dark:bg-black/20 border-transparent" />
            <Button variant="wa" size="icon" className="shrink-0 rounded-full">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
