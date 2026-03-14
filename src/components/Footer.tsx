import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl font-bold text-gradient mb-3">{settings.siteName}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{settings.siteDescription}</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-foreground">Navigation</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/a-propos", label: "À propos" },
                { to: "/reseaux", label: "Réseaux" },
                { to: "/partenariats", label: "Partenariats" },
                { to: "/blog", label: "Blog" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-foreground">Légal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/conditions" className="text-sm text-muted-foreground hover:text-accent transition-colors">Conditions d'Utilisation</Link>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-accent transition-colors">Politique de Confidentialité</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
