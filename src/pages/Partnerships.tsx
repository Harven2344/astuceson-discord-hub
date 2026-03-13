import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp, Eye, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Eye, title: "Visibilité Maximale", desc: "Exposition auprès de milliers de followers sur TikTok et Discord." },
  { icon: TrendingUp, title: "Croissance Garantie", desc: "Booste ta notoriété grâce à une audience engagée et active." },
  { icon: Gift, title: "Collaborations Créatives", desc: "Création de contenu original et percutant ensemble." },
  { icon: Handshake, title: "Partenariat Sur-Mesure", desc: "Des formules adaptées à tes besoins et ton budget." },
];

export default function Partnerships() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            <span className="text-gradient">Partenariats</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-14 max-w-lg mx-auto"
          >
            Tu es une marque ou un créateur ? Collaborons ensemble pour créer du contenu impactant !
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl border border-border/50 bg-card p-6"
              >
                <b.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80 font-display font-bold hover:scale-105 transition-transform">
                📩 Me contacter pour un partenariat
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
