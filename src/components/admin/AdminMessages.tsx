import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Star, StarOff, Trash2, Eye, EyeOff, RefreshCw, Inbox } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  starred: boolean;
  created_at: string;
}

const ADMIN_PASS = "astuceson2024";

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-crud", {
        body: { password: ADMIN_PASS, table: "contact_messages", action: "list" },
      });
      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const updateMessage = async (id: string, data: Partial<ContactMessage>) => {
    try {
      await supabase.functions.invoke("admin-crud", {
        body: { password: ADMIN_PASS, table: "contact_messages", action: "update", data, id },
      });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await supabase.functions.invoke("admin-crud", {
        body: { password: ADMIN_PASS, table: "contact_messages", action: "delete", id },
      });
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected === id) setSelected(null);
      toast({ title: "✅ Supprimé" });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const filtered = messages.filter(m => {
    if (filter === "unread") return !m.read;
    if (filter === "starred") return m.starred;
    return true;
  });

  const selectedMsg = messages.find(m => m.id === selected);
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
          <Inbox className="h-3 w-3" /> {messages.length} messages
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-neon-pink/10 text-neon-pink border border-neon-pink/30">
            <Mail className="h-3 w-3" /> {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
          </div>
        )}
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={fetchMessages} className="gap-1.5 text-xs rounded-lg border-border/30">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Rafraîchir
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5">
        {[
          { id: "all" as const, label: "Tous" },
          { id: "unread" as const, label: "Non lus" },
          { id: "starred" as const, label: "Favoris" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.id
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Chargement...</p>
      ) : filtered.length === 0 ? (
        <Card className="border-border/30 bg-card/80">
          <CardContent className="py-12 text-center">
            <Inbox className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground">Aucun message{filter !== "all" ? ` (${filter === "unread" ? "non lu" : "favori"})` : ""}.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
          {/* List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelected(msg.id);
                  if (!msg.read) updateMessage(msg.id, { read: true });
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:bg-muted/30 ${
                  selected === msg.id
                    ? "border-accent/30 bg-accent/5"
                    : msg.read
                    ? "border-border/30 bg-card/50"
                    : "border-neon-cyan/20 bg-neon-cyan/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.read ? "bg-muted-foreground/20" : "bg-neon-cyan animate-pulse"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm truncate">{msg.name}</span>
                      {msg.starred && <Star className="h-3 w-3 text-neon-yellow fill-neon-yellow shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{msg.email}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{msg.message}</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1.5">
                      {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail */}
          {selectedMsg ? (
            <Card className="border-border/30 bg-card/80 sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="font-display text-lg">{selectedMsg.name}</CardTitle>
                    <CardDescription>
                      <a href={`mailto:${selectedMsg.email}`} className="text-accent hover:underline">{selectedMsg.email}</a>
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateMessage(selectedMsg.id, { starred: !selectedMsg.starred })}
                    >
                      {selectedMsg.starred
                        ? <Star className="h-4 w-4 text-neon-yellow fill-neon-yellow" />
                        : <StarOff className="h-4 w-4 text-muted-foreground" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateMessage(selectedMsg.id, { read: !selectedMsg.read })}
                    >
                      {selectedMsg.read
                        ? <EyeOff className="h-4 w-4 text-muted-foreground" />
                        : <Eye className="h-4 w-4 text-neon-green" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteMessage(selectedMsg.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Reçu le {new Date(selectedMsg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl bg-muted/20 border border-border/30 p-5">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedMsg.message}</p>
                </div>
                <div className="mt-4">
                  <a href={`mailto:${selectedMsg.email}?subject=Re: Message depuis Astuceson`}>
                    <Button className="gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 rounded-xl">
                      <Mail className="h-4 w-4" /> Répondre par email
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/30 bg-card/50 hidden lg:flex items-center justify-center">
              <CardContent className="py-16 text-center">
                <Mail className="h-10 w-10 mx-auto mb-3 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">Sélectionne un message pour le lire</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
