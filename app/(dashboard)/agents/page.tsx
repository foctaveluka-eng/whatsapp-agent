"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Bot, Power, MoreVertical, Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", model: "gpt-4o-mini", system_prompt: "", status: "Actif" });
  const [saving, setSaving] = useState(false);

  const fetchAgents = async () => {
    const res = await fetch("/api/agents");
    if (res.ok) {
      const data = await res.json();
      setAgents(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      toast.success("Agent créé !");
      setShowForm(false);
      setForm({ name: "", model: "gpt-4o-mini", system_prompt: "", status: "Actif" });
      fetchAgents();
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (agent: any) => {
    const newStatus = agent.status === "Actif" ? "Inactif" : "Actif";
    await fetch(`/api/agents/${agent.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchAgents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet agent ?")) return;
    await fetch(`/api/agents/${id}`, { method: "DELETE" });
    toast.success("Agent supprimé");
    fetchAgents();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Agents IA</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez vos assistants virtuels WhatsApp.</p>
        </div>
        <Button variant="wa" className="gap-2" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />
          Créer un agent
        </Button>
      </div>

      {showForm && (
        <Card>
          <h2 className="text-lg font-bold mb-4">Nouvel agent</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-lg">
            <div>
              <label className="text-sm font-medium block mb-1">Nom de l'agent</label>
              <input
                required
                className="w-full border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-wa-green"
                placeholder="Mon Assistant Commercial"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Modèle IA</label>
              <select
                className="w-full border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-wa-green"
                value={form.model}
                onChange={e => setForm({ ...form, model: e.target.value })}
              >
                <option value="gpt-4o-mini">GPT-4o Mini (rapide)</option>
                <option value="gpt-4o">GPT-4o (puissant)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Instructions système</label>
              <textarea
                className="w-full border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-wa-green min-h-[100px] resize-y"
                placeholder="Vous êtes un assistant commercial. Répondez toujours en français..."
                value={form.system_prompt}
                onChange={e => setForm({ ...form, system_prompt: e.target.value })}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="wa" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer l'agent"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-wa-green" />
        </div>
      ) : !agents.length ? (
        <Card className="p-12 text-center text-gray-500">
          <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Aucun agent configuré</h3>
          <p className="mb-6">Commencez par créer votre premier assistant virtuel.</p>
          <Button variant="wa" className="mx-auto" onClick={() => setShowForm(true)}>Créer mon premier agent</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: any) => (
            <Card key={agent.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-wa-green/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-wa-green" />
                </div>
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Modèle: {agent.model}</p>
              {agent.system_prompt && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 line-clamp-2">{agent.system_prompt}</p>
              )}

              <div className="flex items-center gap-2 mb-6 mt-auto">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  agent.status === "Actif" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                }`}>
                  {agent.status === "Actif" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                  {agent.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <Button variant="outline" className="w-full gap-2 text-xs h-9">
                  <Edit className="w-3.5 h-3.5" /> Modifier
                </Button>
                <Button variant="outline" className="w-full gap-2 text-xs h-9" onClick={() => handleToggle(agent)}>
                  <Power className="w-3.5 h-3.5" /> {agent.status === "Actif" ? "Désactiver" : "Activer"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
