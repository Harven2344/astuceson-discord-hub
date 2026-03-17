import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp, Eye, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Partnership {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
}

const benefits = [
  { icon: Eye, title: "Visibilité Maximale", desc: "Exposition auprès de milliers de followers.", color: "text-neon-cyan", bg: "from-neon-cyan/15 to-neon-cyan/5", border: "border-neon-cyan/30" },
  { icon: TrendingUp, title: "Croissance Garantie", desc: "Booste ta notoriété avec une audience engagée.", color: "text-neon-pink", bg: "from-neon-pink/15 to-neon-pink/5", border: "border-neon-pink/30" },
  { icon: Gift, title: "Collabs Créatives", desc: "Création de contenu original ensemble.", color: "text-neon-yellow", bg: "from-neon-yellow/15 to-neon-yellow/5", border: "border-neon-yellow/30" },
  { icon: Handshake, title: "Sur-Mesure", desc: "Des formules adaptées à tes besoins.", color: "text-neon-green", bg: "from-neon-green/15 to-neon-green/5", border: "border-neon-green/30" },
];

export default function Partnerships() {
  const [partners, setPartners] = useState<Partnership[]>([]);

  useEffect(() => {
    supabase.from("partnerships").select("*").eq("active", true).then(({ data }) => {
      if (data) setPartners(data);
    });
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-blob" />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            <span className="text-gradient">Partenariats</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Collaborons ensemble pour créer du contenu impactant !
          </motion.p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.04, y: -6 }}
                className={`rounded-3xl border ${b.border} bg-gradient-to-b ${b.bg} p-8 group cursor-default`}
              >
                <b.icon className={`h-10 w-10 ${b.color} mb-4 group-hover:scale-125 transition-transform duration-300`} />
                <h3 className="font-display font-bold text-xl mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing partners */}
      {partners.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display text-3xl font-bold mb-8">Ils nous font confiance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.website_url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-accent/40"
                >
                  {p.logo_url && <img src={p.logo_url} alt={p.name} className="h-12 mx-auto mb-3 object-contain" />}
                  <h4 className="font-display font-bold">{p.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 text-center">
          <Link to="/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80 font-display font-bold hover:scale-110 transition-all duration-300 rounded-2xl px-10 py-7 text-lg gap-2">
              📩 Me contacter <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
