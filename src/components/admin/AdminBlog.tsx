import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Trash2, Edit3, Save, X, FileText } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  emoji: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminBlog() {
  const { items, loading, fetchAll, create, update, remove } = useAdminCrud<BlogPost>("blog_posts");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", emoji: "📝", published: false });

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = async () => {
    if (!form.title) return;
    await create(form);
    setForm({ title: "", excerpt: "", content: "", emoji: "📝", published: false });
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, emoji: post.emoji, published: post.published });
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await update(editing, form);
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "", emoji: "📝", published: false });
  };

  return (
    <div className="space-y-6">
      {/* Create / Edit form */}
      <Card className="border-neon-pink/20 bg-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-neon-pink" />
            {editing ? "Modifier l'article" : "Nouvel article"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-[60px_1fr] gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Emoji</Label>
              <Input value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} className="text-center text-xl" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Titre</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre de l'article" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Extrait</Label>
            <Input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Court résumé..." />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Contenu</Label>
            <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} placeholder="Contenu complet de l'article..." />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
            <Label>Publié</Label>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-neon-pink hover:bg-neon-pink/80 gap-2"><Save className="h-4 w-4" /> Enregistrer</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: "", excerpt: "", content: "", emoji: "📝", published: false }); }}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-neon-pink hover:bg-neon-pink/80 gap-2"><Plus className="h-4 w-4" /> Créer</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun article pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {items.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4"
            >
              <span className="text-2xl">{post.emoji}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold truncate">{post.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{post.excerpt}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${post.published ? "bg-neon-green/10 text-neon-green border-neon-green/30" : "bg-muted text-muted-foreground border-border"}`}>
                {post.published ? "Publié" : "Brouillon"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => startEdit(post)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(post.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
