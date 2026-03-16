import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, Film } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  platform: string;
  featured: boolean;
  created_at: string;
}

export default function AdminPortfolio() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<PortfolioItem>("portfolio_items");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", video_url: "", thumbnail_url: "", platform: "tiktok", featured: false });

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.title) return;
    await create(form);
    setForm({ title: "", description: "", video_url: "", thumbnail_url: "", platform: "tiktok", featured: false });
  };

  const startEdit = (item: PortfolioItem) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description, video_url: item.video_url, thumbnail_url: item.thumbnail_url, platform: item.platform, featured: item.featured });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, form);
    setEditing(null);
    setForm({ title: "", description: "", video_url: "", thumbnail_url: "", platform: "tiktok", featured: false });
  };

  return (
    <div className="space-y-6">
      <Card className="border-neon-purple/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <Film className="h-5 w-5 text-neon-purple" /> {editing ? "Modifier le contenu" : "Nouveau contenu"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Titre</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre du contenu" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Plateforme</Label>
              <select value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Description..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">URL vidéo</Label>
              <Input value={form.video_url} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">URL miniature</Label>
              <Input value={form.thumbnail_url} onChange={e => setForm(f => ({ ...f, thumbnail_url: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.featured} onCheckedChange={v => setForm(f => ({ ...f, featured: v }))} />
            <Label>À la une</Label>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-purple hover:bg-neon-purple/80 gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", description: "", video_url: "", thumbnail_url: "", platform: "tiktok", featured: false }); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-purple hover:bg-neon-purple/80 gap-2"><Plus className="h-4 w-4" /> Créer</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun contenu portfolio.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm truncate">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.platform} {item.featured && "⭐"}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => startEdit(item)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
