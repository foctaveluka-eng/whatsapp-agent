"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Download, Filter, Search, Users, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/leads")
      .then(r => r.json())
      .then(data => { setLeads(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = leads.filter(l =>
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search)
  );

  const exportCSV = () => {
    const rows = [["Nom", "Téléphone", "Agent", "Statut", "Date"]];
    leads.forEach(l => rows.push([l.name, l.phone, l.agents?.name || "-", l.status, new Date(l.created_at).toLocaleDateString()]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "leads.csv";
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Leads (CRM)</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez les contacts générés par vos agents.</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={exportCSV}>
          <Download className="w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher un lead..."
              className="pl-9 h-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-wa-green" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Aucun lead pour le moment</h3>
            <p>Vos agents n'ont pas encore généré de contacts.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Nom / Contact</th>
                  <th className="px-6 py-3 font-medium">Téléphone</th>
                  <th className="px-6 py-3 font-medium">Agent assigné</th>
                  <th className="px-6 py-3 font-medium">Statut</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead: any) => (
                  <tr key={lead.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="px-6 py-4 font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-500">{lead.phone}</td>
                    <td className="px-6 py-4 text-gray-500">{lead.agents?.name || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        lead.status === "Nouveau" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                        lead.status === "Qualifié" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400" :
                        "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
