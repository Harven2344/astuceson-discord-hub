import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, CalendarDays } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
  active: boolean;
  created_at: string;
}

export default function AdminEvents() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<EventItem>("events");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", event_date: "", location: "", event_type: "online", active: true });

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.title) return;
    await create({ ...form, event_date: form.event_date || new Date().toISOString() });
    setForm({ title: "", description: "", event_date: "", location: "", event_type: "online", active: true });
  };

  const startEdit = (item: EventItem) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description, event_date: item.event_date?.slice(0, 16) || "", location: item.location, event_type: item.event_type, active: item.active });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, { ...form, event_date: form.event_date || new Date().toISOString() });
    setEditing(null);
    setForm({ title: "", description: "", event_date: "", location: "", event_type: "online", active: true });
  };

  return (
    <div className="space-y-6">
      <Card className="border-neon-green/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-neon-green" /> {editing ? "Modifier l'événement" : "Nouvel événement"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs">Titre</Label>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre de l'événement" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Date</Label>
              <Input type="datetime-local" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Lieu</Label>
              <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Discord, Paris..." />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <select value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="online">En ligne</option>
                <option value="giveaway">Giveaway</option>
                <option value="meetup">Meetup</option>
                <option value="contest">Concours</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
            <Label>Actif</Label>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-green hover:bg-neon-green/80 text-background gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", description: "", event_date: "", location: "", event_type: "online", active: true }); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-green hover:bg-neon-green/80 text-background gap-2"><Plus className="h-4 w-4" /> Créer</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun événement.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm truncate">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.event_type} • {item.location}</p>
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
