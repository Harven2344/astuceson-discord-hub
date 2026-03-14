import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/contexts/SiteSettings";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { settings } = useSiteSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });

      if (error) throw error;

      toast.success("Message envoyé ! Nous te répondrons rapidement.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            <span className="text-gradient">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-12"
          >
            Une question, une idée, un partenariat ? Écris-moi !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" placeholder="Ton nom" required className="bg-background" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ton@email.com" required className="bg-background" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Dis-moi tout..." rows={6} required className="bg-background" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-display font-bold">
                {sending ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-accent/50 transition-colors">
              <MessageCircle className="h-6 w-6 text-discord" />
              <div>
                <div className="font-display font-semibold text-sm">Discord</div>
                <div className="text-xs text-muted-foreground">Rejoins le serveur</div>
              </div>
            </a>
            <a href="mailto:contact.astuceson@gmail.com" className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-accent/50 transition-colors">
              <Mail className="h-6 w-6 text-neon-pink" />
              <div>
                <div className="font-display font-semibold text-sm">Email</div>
                <div className="text-xs text-muted-foreground">contact.astuceson@gmail.com</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message envoyé ! Nous te répondrons rapidement.");
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            <span className="text-gradient">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-12"
          >
            Une question, une idée, un partenariat ? Écris-moi !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" placeholder="Ton nom" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ton@email.com" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Dis-moi tout..." rows={6} required className="bg-background" />
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-display font-bold">
                {sending ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-accent/50 transition-colors">
              <MessageCircle className="h-6 w-6 text-discord" />
              <div>
                <div className="font-display font-semibold text-sm">Discord</div>
                <div className="text-xs text-muted-foreground">Rejoins le serveur</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-accent/50 transition-colors">
              <Mail className="h-6 w-6 text-neon-pink" />
              <div>
                <div className="font-display font-semibold text-sm">Email</div>
                <div className="text-xs text-muted-foreground">contact.astuceson@gmail.com</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
