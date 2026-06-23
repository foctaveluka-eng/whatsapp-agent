"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("WhatsApp");
  const [waStatus, setWaStatus] = useState<any>(null);

  useEffect(() => {
    if (activeTab === "WhatsApp") {
      const interval = setInterval(async () => {
        const res = await fetch("/api/whatsapp");
        if (res.ok) {
          const data = await res.json();
          setWaStatus(data);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const handleConnect = async () => {
    await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "connect" })
    });
  };

  const handleDisconnect = async () => {
    await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "disconnect" })
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Paramètres</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez votre profil, équipe et connexion WhatsApp.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-2">
          {["WhatsApp", "Profil", "Organisation", "Clés API"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-wa-green/10 text-wa-green" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <Card className="col-span-1 md:col-span-3">
          {activeTab === "WhatsApp" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Connexion WhatsApp</h2>
              
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Statut de la connexion</h3>
                    <p className="text-sm text-gray-500">
                      {waStatus?.status === 'connected' ? "Connecté à WhatsApp." : 
                       waStatus?.status === 'connecting' ? "Génération du QR Code..." : 
                       "Non connecté. Scannez le QR code pour associer votre numéro."}
                    </p>
                  </div>
                  {waStatus?.status === 'connected' ? (
                    <Button variant="outline" className="text-red-500" onClick={handleDisconnect}>
                      Déconnecter
                    </Button>
                  ) : (
                    <Button variant="wa" onClick={handleConnect} disabled={waStatus?.status === 'connecting'}>
                      Connecter WhatsApp
                    </Button>
                  )}
                </div>

                {waStatus?.qr && waStatus?.status !== 'connected' && (
                  <div className="mt-8 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="mb-4 text-sm font-medium text-center max-w-md">
                      Ouvrez WhatsApp sur votre téléphone, allez dans "Appareils connectés" et scannez ce code QR.
                    </p>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <Image src={waStatus.qr} alt="WhatsApp QR Code" width={250} height={250} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Profil" && (
            <div className="space-y-4 max-w-md">
              <h2 className="text-xl font-bold mb-6">Profil</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom</label>
                <Input placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="votre@email.com" />
              </div>
              <Button variant="wa" className="mt-4">Sauvegarder</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
