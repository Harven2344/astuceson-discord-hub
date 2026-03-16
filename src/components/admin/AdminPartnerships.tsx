import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, Handshake } from "lucide-react";

interface Partnership {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  active: boolean;
  created_at: string;
}

export default function AdminPartnerships() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<Partnership>("partnerships");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", logo_url: "", website_url: "", active: true });

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.name) return;
    await create(form);
    setForm({ name: "", description: "", logo_url: "", website_url: "", active: true });
  };

  const startEdit = (item: Partnership) => {
    setEditing(item.id);
    setForm({ name: item.name, description: item.description, logo_url: item.logo_url, website_url: item.website_url, active: item.active });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, form);
    setEditing(null);
    setForm({ name: "", description: "", logo_url: "", website_url: "", active: true });
  };

  return (
    <div className="space-y-6">
      <Card className="border-neon-orange/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <Handshake className="h-5 w-5 text-neon-orange" /> {editing ? "Modifier le partenaire" : "Nouveau partenaire"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Nom</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nom du partenaire" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Site web</Label>
              <Input value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">URL logo</Label>
            <Input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
            <Label>Actif</Label>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-orange hover:bg-neon-orange/80 text-background gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm({ name: "", description: "", logo_url: "", website_url: "", active: true }); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-orange hover:bg-neon-orange/80 text-background gap-2"><Plus className="h-4 w-4" /> Créer</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun partenaire.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
              {item.logo_url && <img src={item.logo_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />}
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.active ? "bg-neon-green/10 text-neon-green border-neon-green/30" : "bg-muted text-muted-foreground border-border"}`}>
                {item.active ? "Actif" : "Inactif"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => startEdit(item)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
