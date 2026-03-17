import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Send } from "lucide-react";
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
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });
      if (error) throw error;
      toast.success("Message envoyé !");
      setName(""); setEmail(""); setMessage("");
    } catch {
      toast.error("Erreur lors de l'envoi. Réessaie plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute top-10 right-20 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[120px] animate-blob" />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            <span className="text-gradient">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Une question, une idée, un partenariat ? Écris-moi !
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" placeholder="Ton nom" required className="bg-background rounded-xl" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ton@email.com" required className="bg-background rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Dis-moi tout..." rows={6} required className="bg-background rounded-xl" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-display font-bold rounded-xl py-6 text-lg gap-2 hover:scale-105 transition-transform">
                {sending ? "Envoi..." : <><Send className="h-5 w-5" /> Envoyer</>}
              </Button>
            </form>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={settings.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-3 rounded-2xl border border-discord/30 bg-discord/10 p-5 transition-all"
            >
              <MessageCircle className="h-6 w-6 text-discord" />
              <div>
                <div className="font-display font-semibold text-sm">Discord</div>
                <div className="text-xs text-muted-foreground">Rejoins le serveur</div>
              </div>
            </motion.a>
            <motion.a
              href="mailto:contact.astuceson@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-center gap-3 rounded-2xl border border-neon-pink/30 bg-neon-pink/10 p-5 transition-all"
            >
              <Mail className="h-6 w-6 text-neon-pink" />
              <div>
                <div className="font-display font-semibold text-sm">Email</div>
                <div className="text-xs text-muted-foreground">contact.astuceson@gmail.com</div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
