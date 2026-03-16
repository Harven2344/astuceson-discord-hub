import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Sparkles, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/contexts/SiteSettings";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  event_type: string;
  active: boolean;
  created_at: string;
}

const defaultEvents: EventItem[] = [
  { id: "1", title: "🎁 Mega Giveaway Mars", description: "Gagne un iPhone, des AirPods et plein de cadeaux ! Participe sur Discord.", event_date: "2026-03-25T20:00:00Z", location: "Discord", event_type: "giveaway", active: true, created_at: "" },
  { id: "2", title: "🎮 Soirée Gaming Communautaire", description: "Rejoins-nous pour une soirée gaming entre membres de la communauté !", event_date: "2026-04-05T19:00:00Z", location: "Discord", event_type: "online", active: true, created_at: "" },
  { id: "3", title: "📸 Meet & Greet Paris", description: "On se retrouve en vrai ! Viens me rencontrer et rencontrer la communauté.", event_date: "2026-04-15T14:00:00Z", location: "Paris, France", event_type: "meetup", active: true, created_at: "" },
  { id: "4", title: "🏆 Quiz Challenge — 500€ à gagner", description: "Le grand quiz mensuel avec 500€ de lots à remporter !", event_date: "2026-04-20T21:00:00Z", location: "Discord", event_type: "contest", active: true, created_at: "" },
];

const typeConfig: Record<string, { color: string; icon: typeof Sparkles }> = {
  giveaway: { color: "border-neon-orange/30 bg-neon-orange/10 text-neon-orange", icon: Sparkles },
  online: { color: "border-discord/30 bg-discord/10 text-discord", icon: Zap },
  meetup: { color: "border-neon-green/30 bg-neon-green/10 text-neon-green", icon: MapPin },
  contest: { color: "border-neon-yellow/30 bg-neon-yellow/10 text-neon-yellow", icon: Clock },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const { settings } = useSiteSettings();

  useEffect(() => {
    supabase.from("events").select("*").eq("active", true).order("event_date", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const isUpcoming = (date: string) => new Date(date) > new Date();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-green/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-yellow/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2 text-sm text-neon-green mb-6"
          >
            <Calendar className="h-4 w-4" /> Événements
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-black mb-6"
          >
            Mes <span className="text-gradient-nature">Événements</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Giveaways, lives, rencontres et bien plus encore. Ne manque rien !
          </motion.p>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col gap-6">
            {events.map((event, i) => {
              const upcoming = isUpcoming(event.event_date);
              const config = typeConfig[event.event_type] || typeConfig.online;
              const Icon = config.icon;

              return (
                <motion.div
                  key={event.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                  className={`rounded-2xl border bg-card p-6 md:p-8 transition-all relative overflow-hidden ${upcoming ? "border-neon-green/30 hover:border-neon-green/60" : "border-border/50 opacity-70"}`}
                >
                  {upcoming && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green" />
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${config.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${config.color}`}>
                          {event.event_type}
                        </span>
                        {upcoming && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20 animate-pulse-glow">
                            À venir
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(event.event_date)}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                      </div>
                    </div>
                    {upcoming && (
                      <div className="flex-shrink-0">
                        <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-discord hover:bg-discord/80 glow-discord font-display text-sm">
                            Participer
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
