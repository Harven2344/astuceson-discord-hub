import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, ShoppingBag } from "lucide-react";

interface BoutiqueItem {
  id: string;
  name: string;
  description: string;
  price: string;
  emoji: string;
  image_url: string;
  category: string;
  status: string;
  link_url: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
}

const defaultForm = {
  name: "", description: "", price: "0€", emoji: "🛍️", image_url: "",
  category: "merch", status: "coming_soon", link_url: "", featured: false, active: true, sort_order: 0,
};

export default function AdminBoutique() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<BoutiqueItem>("boutique_items");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.name) return;
    await create(form);
    setForm(defaultForm);
  };

  const startEdit = (item: BoutiqueItem) => {
    setEditing(item.id);
    setForm({
      name: item.name, description: item.description, price: item.price, emoji: item.emoji,
      image_url: item.image_url, category: item.category, status: item.status,
      link_url: item.link_url, featured: item.featured, active: item.active, sort_order: item.sort_order,
    });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, form);
    setEditing(null);
    setForm(defaultForm);
  };

  const statusLabels: Record<string, string> = {
    available: "En vente", coming_soon: "Bientôt", sold_out: "Épuisé",
  };

  const statusColors: Record<string, string> = {
    available: "bg-neon-green/10 text-neon-green border-neon-green/30",
    coming_soon: "bg-neon-orange/10 text-neon-orange border-neon-orange/30",
    sold_out: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <div className="space-y-6">
      <Card className="border-neon-orange/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-neon-orange" />
            {editing ? "Modifier le produit" : "Nouveau produit"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[60px_1fr] gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Emoji</Label>
              <Input value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} className="text-center text-xl" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Nom du produit</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="T-Shirt Astuceson" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Description du produit..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Prix</Label>
              <Input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="29,99€" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Catégorie</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="merch">Merch</SelectItem>
                  <SelectItem value="accessoire">Accessoire</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="collector">Collector</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Statut</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">En vente</SelectItem>
                  <SelectItem value="coming_soon">Bientôt disponible</SelectItem>
                  <SelectItem value="sold_out">Épuisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Ordre d'affichage</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">URL image</Label>
            <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Lien d'achat</Label>
            <Input value={form.link_url} onChange={e => setForm(f => ({ ...f, link_url: e.target.value }))} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={form.featured} onCheckedChange={v => setForm(f => ({ ...f, featured: v }))} />
              <Label className="text-xs">Mis en avant</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
              <Label className="text-xs">Actif</Label>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-orange hover:bg-neon-orange/80 gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm(defaultForm); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-orange hover:bg-neon-orange/80 gap-2"><Plus className="h-4 w-4" /> Ajouter</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun produit pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.price} · {item.category}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[item.status] || "bg-muted text-muted-foreground border-border"}`}>
                {statusLabels[item.status] || item.status}
              </span>
              {item.featured && <span className="text-[10px] px-2 py-0.5 rounded-full border bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30">⭐</span>}
              <Button variant="ghost" size="icon" onClick={() => startEdit(item)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
