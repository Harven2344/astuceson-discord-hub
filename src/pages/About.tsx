import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Heart, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            À propos d'<span className="text-gradient">Astuceson</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card p-8 mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-pink/30 mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
            <p className="text-muted-foreground text-center text-lg leading-relaxed">
              Salut ! Moi c'est <strong className="text-foreground">Astuceson</strong>, créateur de contenu sur TikTok.
              Je partage quotidiennement des astuces, des bons plans et des découvertes 
              qui facilitent la vie de milliers de personnes.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Heart, title: "Passion", text: "Passionné par le partage de connaissances, chaque vidéo est créée avec amour et recherche approfondie." },
              { icon: Target, title: "Mission", text: "Rendre les meilleures astuces accessibles à tous, gratuitement, via TikTok et Discord." },
              { icon: Sparkles, title: "Communauté", text: "Construire une communauté bienveillante où chacun peut apprendre et partager." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-border/50 bg-card p-6 text-center"
              >
                <item.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
