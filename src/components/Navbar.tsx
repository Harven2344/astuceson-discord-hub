import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/contexts/SiteSettings";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/reseaux", label: "Réseaux" },
  { to: "/boutique", label: "Boutique" },
  { to: "/galerie", label: "Galerie" },
  { to: "/evenements", label: "Événements" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { settings } = useSiteSettings();

  return (
    <>
      {settings.announcementEnabled && settings.announcementText && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-background text-center text-sm font-medium py-2 px-4">
          {settings.announcementText}
        </div>
      )}
      <nav className={cn(
        "fixed left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl",
        settings.announcementEnabled && settings.announcementText ? "top-10" : "top-0"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-display text-2xl font-bold text-rainbow">
            {settings.siteName}
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                  pathname === l.to ? "text-accent" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
            <a href={settings.discordLink} target="_blank" rel="noopener noreferrer">
              <Button className="ml-3 bg-discord hover:bg-discord/80 glow-discord text-sm">
                🎮 Discord
              </Button>
            </a>
          </div>

          <button className="xl:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl xl:hidden">
            <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent",
                    pathname === l.to ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <a href={settings.discordLink} target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button className="w-full bg-discord hover:bg-discord/80 glow-discord">
                  🎮 Rejoindre le Discord
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
