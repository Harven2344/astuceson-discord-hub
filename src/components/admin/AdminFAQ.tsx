import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export default function AdminFAQ() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<FAQItem>("faq_items");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0, active: true });

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.question || !form.answer) return;
    await create(form);
    setForm({ question: "", answer: "", sort_order: 0, active: true });
  };

  const startEdit = (item: FAQItem) => {
    setEditing(item.id);
    setForm({ question: item.question, answer: item.answer, sort_order: item.sort_order, active: item.active });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, form);
    setEditing(null);
    setForm({ question: "", answer: "", sort_order: 0, active: true });
  };

  return (
    <div className="space-y-6">
      <Card className="border-neon-cyan/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-neon-cyan" /> {editing ? "Modifier la question" : "Nouvelle question"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs">Question</Label>
            <Input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="La question..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Réponse</Label>
            <Textarea value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} rows={3} placeholder="La réponse..." />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-xs">Ordre</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))} className="w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
              <Label className="text-xs">Active</Label>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-cyan hover:bg-neon-cyan/80 text-background gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm({ question: "", answer: "", sort_order: 0, active: true }); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-cyan hover:bg-neon-cyan/80 text-background gap-2"><Plus className="h-4 w-4" /> Créer</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucune question FAQ.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-sm truncate">{item.question}</h4>
                <p className="text-xs text-muted-foreground truncate">{item.answer}</p>
              </div>
              <span className="text-[10px] text-muted-foreground">#{item.sort_order}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.active ? "bg-neon-green/10 text-neon-green border-neon-green/30" : "bg-muted text-muted-foreground border-border"}`}>
                {item.active ? "Active" : "Inactive"}
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
