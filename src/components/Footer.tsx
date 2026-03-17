import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="border-t border-border/30 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-3" />
      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-black text-rainbow mb-3">{settings.siteName}</h3>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{settings.siteDescription}</p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-foreground text-sm uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/a-propos", label: "À propos" },
                { to: "/reseaux", label: "Réseaux" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 group">
                  {l.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-foreground text-sm uppercase tracking-wider">Découvrir</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/boutique", label: "Boutique" },
                { to: "/galerie", label: "Galerie" },
                { to: "/evenements", label: "Événements" },
                { to: "/partenariats", label: "Partenariats" },
                { to: "/faq", label: "FAQ" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 group">
                  {l.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-foreground text-sm uppercase tracking-wider">Légal</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/conditions" className="text-sm text-muted-foreground hover:text-accent transition-colors">Conditions</Link>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-accent transition-colors">Confidentialité</Link>
              <Link to="/admin" className="text-sm text-muted-foreground/30 hover:text-accent transition-colors">Admin</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.</span>
          <span className="text-muted-foreground/50">{settings.contactEmail}</span>
        </div>
      </div>
    </footer>
  );
}
