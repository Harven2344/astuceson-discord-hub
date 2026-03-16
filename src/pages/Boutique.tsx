import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shirt, Crown, Sparkles, ArrowRight } from "lucide-react";

const merchItems = [
  { name: "T-Shirt Astuceson", emoji: "👕", price: "29,99€", color: "from-neon-cyan/20 to-neon-purple/20", border: "hover:border-neon-cyan/50", status: "Bientôt disponible" },
  { name: "Hoodie Premium", emoji: "🧥", price: "49,99€", color: "from-neon-pink/20 to-neon-orange/20", border: "hover:border-neon-pink/50", status: "Bientôt disponible" },
  { name: "Casquette Snapback", emoji: "🧢", price: "24,99€", color: "from-neon-purple/20 to-discord/20", border: "hover:border-neon-purple/50", status: "Bientôt disponible" },
  { name: "Stickers Pack", emoji: "✨", price: "9,99€", color: "from-neon-orange/20 to-neon-yellow/20", border: "hover:border-neon-orange/50", status: "Bientôt disponible" },
  { name: "Mug Collector", emoji: "☕", price: "14,99€", color: "from-neon-green/20 to-neon-cyan/20", border: "hover:border-neon-green/50", status: "Bientôt disponible" },
  { name: "Phone Case", emoji: "📱", price: "19,99€", color: "from-discord/20 to-neon-pink/20", border: "hover:border-discord/50", status: "Bientôt disponible" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Boutique() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-orange/30 bg-neon-orange/10 px-4 py-2 text-sm text-neon-orange mb-6"
          >
            <ShoppingBag className="h-4 w-4" /> Boutique officielle
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-black mb-6"
          >
            Le <span className="text-gradient-fire">Merch</span> Astuceson
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Représente la communauté avec style ! Des produits exclusifs pensés pour les vrais fans.
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`group rounded-2xl border border-border/50 bg-card p-6 transition-all ${item.border}`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform`}>
                  {item.emoji}
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-2xl font-display font-black text-gradient mb-3">{item.price}</p>
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-neon-orange/10 text-neon-orange border border-neon-orange/20">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-neon-orange/10 via-neon-pink/10 to-neon-purple/10 border border-neon-orange/20 p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple" />
            <Crown className="h-12 w-12 text-neon-orange mx-auto mb-4 animate-float" />
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
              Bientôt en <span className="text-gradient-fire">vente</span> !
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Rejoins le Discord pour être notifié dès l'ouverture de la boutique et profiter de réductions exclusives !
            </p>
            <Button size="lg" className="bg-discord hover:bg-discord/80 glow-discord font-display font-bold gap-2 hover:scale-105 transition-transform">
              🎮 Rejoindre le Discord <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
