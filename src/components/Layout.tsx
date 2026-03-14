import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSiteSettings } from "@/contexts/SiteSettings";

export default function Layout({ children }: { children: ReactNode }) {
  const { settings, isAdmin } = useSiteSettings();

  if (settings.maintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="font-display text-4xl font-bold mb-4 text-gradient">🔧 Maintenance</h1>
          <p className="text-muted-foreground">Le site est en maintenance. Revenez bientôt !</p>
        </div>
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
