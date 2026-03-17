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
  { id: "1", title: "🎁 Mega Giveaway Mars", description: "Gagne un iPhone, des AirPods et plein de cadeaux !", event_date: "2026-03-25T20:00:00Z", location: "Discord", event_type: "giveaway", active: true, created_at: "" },
  { id: "2", title: "🎮 Soirée Gaming Communautaire", description: "Rejoins-nous pour une soirée gaming entre membres !", event_date: "2026-04-05T19:00:00Z", location: "Discord", event_type: "online", active: true, created_at: "" },
  { id: "3", title: "📸 Meet & Greet Paris", description: "On se retrouve en vrai !", event_date: "2026-04-15T14:00:00Z", location: "Paris, France", event_type: "meetup", active: true, created_at: "" },
  { id: "4", title: "🏆 Quiz Challenge — 500€ à gagner", description: "Le grand quiz mensuel avec 500€ de lots !", event_date: "2026-04-20T21:00:00Z", location: "Discord", event_type: "contest", active: true, created_at: "" },
];

const typeConfig: Record<string, { color: string; border: string; icon: typeof Sparkles }> = {
  giveaway: { color: "bg-neon-orange/10 text-neon-orange border-neon-orange/30", border: "border-neon-orange/30 hover:border-neon-orange/60", icon: Sparkles },
  online: { color: "bg-discord/10 text-discord border-discord/30", border: "border-discord/30 hover:border-discord/60", icon: Zap },
  meetup: { color: "bg-neon-green/10 text-neon-green border-neon-green/30", border: "border-neon-green/30 hover:border-neon-green/60", icon: MapPin },
  contest: { color: "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30", border: "border-neon-yellow/30 hover:border-neon-yellow/60", icon: Clock },
};

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const { settings } = useSiteSettings();

  useEffect(() => {
    supabase.from("events").select("*").eq("active", true).order("event_date", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const isUpcoming = (date: string) => new Date(date) > new Date();

  return (
    <Layout>
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-green/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-yellow/8 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="container mx-auto px-4 relative">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl font-black mb-4 leading-[0.9]"
          >
            Les <span className="text-gradient-nature">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Giveaways, lives, rencontres. Ne manque rien !
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-neon-cyan to-neon-pink hidden md:block" />

            <div className="flex flex-col gap-5">
              {events.map((event, i) => {
                const upcoming = isUpcoming(event.event_date);
                const config = typeConfig[event.event_type] || typeConfig.online;
                const Icon = config.icon;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`rounded-2xl border bg-card p-6 md:p-8 transition-all relative overflow-hidden md:ml-14 ${upcoming ? config.border : "border-border/50 opacity-60"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-2.35rem] top-8 w-4 h-4 rounded-full bg-card border-2 border-neon-green hidden md:flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                    </div>

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
                            <Button className="bg-discord hover:bg-discord/80 glow-discord font-display text-sm rounded-xl hover:scale-105 transition-transform">
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
        </div>
      </section>
    </Layout>
  );
}
