import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const { settings, isAdmin } = useSiteSettings();

  if (settings.maintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-[150px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-neon-cyan/8 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "3s" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="text-center px-6 relative z-10 max-w-lg"
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 flex items-center justify-center border border-border/30"
          >
            <Wrench className="h-12 w-12 text-neon-cyan" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            <span className="text-gradient">Maintenance</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {settings.maintenanceMessage || "Le site est en maintenance. Revenez bientôt !"}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${settings.announcementEnabled && settings.announcementText ? "pt-26" : "pt-16"}`}>{children}</main>
      <Footer />
    </div>
  );
}
