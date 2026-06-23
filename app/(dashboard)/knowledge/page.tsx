"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UploadCloud, FileText, Trash2 } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Base de connaissances</h1>
          <p className="text-gray-500 dark:text-gray-400">Entraînez vos agents avec vos propres documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 p-8 border-dashed border-2 border-gray-300 dark:border-white/20 bg-gray-50/50 dark:bg-[#1A1A2E]/30 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-wa-green/10 flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8 text-wa-green" />
          </div>
          <h3 className="text-xl font-bold mb-2">Glissez vos fichiers ici</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            Formats acceptés : PDF, DOCX, TXT, CSV. Max 10 MB par fichier.
          </p>
          <Button variant="wa" className="shadow-neon">Parcourir les fichiers</Button>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Documents récents</h3>
          {[1, 2].map((i) => (
            <Card key={i} className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">Catalogue_Produits_2026.pdf</h4>
                <p className="text-xs text-gray-500">2.4 MB • Il y a 2 jours</p>
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 h-8 w-8 shrink-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
