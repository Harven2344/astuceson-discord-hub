import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Settings, Link2, Globe, BarChart3, Bell, Shield, LogOut,
  Save, Eye, EyeOff, Lock, FileText, HelpCircle, Film, CalendarDays, Handshake,
  LayoutDashboard, Palette, AlertTriangle, ChevronRight, Activity, Users, TrendingUp, Zap,
  Monitor, Smartphone, Moon, Sun, Type, Image, ExternalLink, Mail, Hash
} from "lucide-react";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminFAQ from "@/components/admin/AdminFAQ";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminPartnerships from "@/components/admin/AdminPartnerships";

function LoginForm() {
  const [pass, setPass] = useState("");
  const { login } = useSiteSettings();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pass)) {
      toast({ title: "✅ Connecté", description: "Bienvenue dans le panneau admin !" });
    } else {
      toast({ title: "❌ Erreur", description: "Mot de passe incorrect.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <section className="py-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-cyan/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "3s" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, type: "spring" }} className="w-full max-w-md relative z-10">
          <Card className="border-border/30 bg-card/80 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto mb-4 w-20 h-20 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-pink/20 flex items-center justify-center border border-border/30"
              >
                <Lock className="h-10 w-10 text-neon-cyan" />
              </motion.div>
              <CardTitle className="font-display text-3xl font-black">
                Panneau <span className="text-gradient">Admin</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">Authentification requise</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Mot de passe</Label>
                  <Input type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} className="h-12 text-lg" />
                </div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 font-display font-bold text-lg rounded-xl transition-all hover:scale-[1.02]">
                  Se connecter
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
}

function SettingsField({ label, value, onChange, type = "text", placeholder = "", icon: Icon }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; icon?: any;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-10" />
    </div>
  );
}

type AdminSection = "dashboard" | "blog" | "faq" | "portfolio" | "events" | "partners" | "links" | "general" | "stats" | "announce" | "appearance" | "security";

const sidebarSections: { id: AdminSection; label: string; icon: any; color: string; group: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-neon-cyan", group: "Vue d'ensemble" },
  { id: "blog", label: "Blog", icon: FileText, color: "text-neon-pink", group: "Contenu" },
  { id: "faq", label: "FAQ", icon: HelpCircle, color: "text-neon-cyan", group: "Contenu" },
  { id: "portfolio", label: "Portfolio", icon: Film, color: "text-neon-purple", group: "Contenu" },
  { id: "events", label: "Événements", icon: CalendarDays, color: "text-neon-green", group: "Contenu" },
  { id: "partners", label: "Partenaires", icon: Handshake, color: "text-neon-orange", group: "Contenu" },
  { id: "links", label: "Réseaux sociaux", icon: Link2, color: "text-neon-pink", group: "Configuration" },
  { id: "general", label: "Général", icon: Globe, color: "text-neon-cyan", group: "Configuration" },
  { id: "stats", label: "Statistiques", icon: BarChart3, color: "text-neon-green", group: "Configuration" },
  { id: "announce", label: "Annonces", icon: Bell, color: "text-neon-yellow", group: "Configuration" },
  { id: "appearance", label: "Apparence", icon: Palette, color: "text-neon-purple", group: "Système" },
  { id: "security", label: "Sécurité", icon: Shield, color: "text-neon-orange", group: "Système" },
];

function AdminDashboard() {
  const { settings, updateSettings, logout } = useSiteSettings();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [showPass, setShowPass] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const save = () => {
    toast({ title: "✅ Sauvegardé", description: "Les paramètres ont été mis à jour." });
  };

  const grouped = sidebarSections.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {} as Record<string, typeof sidebarSections>);

  const currentSection = sidebarSections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-card/95 backdrop-blur-xl border-r border-border/30 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border/30">
          <h2 className="font-display text-xl font-black text-rainbow">Astuceson</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Panneau d'administration</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 mb-1.5">{group}</p>
              <div className="space-y-0.5">
                {items.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      activeSection === s.id
                        ? "bg-accent/10 text-accent border border-accent/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <s.icon className={`h-4 w-4 ${activeSection === s.id ? "text-accent" : s.color} transition-colors`} />
                    <span className="flex-1 text-left">{s.label}</span>
                    {activeSection === s.id && <ChevronRight className="h-3.5 w-3.5 text-accent" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border/30">
          {settings.maintenanceMode && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              Mode maintenance actif
            </div>
          )}
          <Button variant="outline" onClick={logout} className="w-full gap-2 text-sm rounded-xl border-border/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all">
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted/50 text-muted-foreground">
            <Settings className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            {currentSection && <currentSection.icon className={`h-5 w-5 ${currentSection.color}`} />}
            <h1 className="font-display text-lg font-bold">{currentSection?.label || "Dashboard"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-lg border-border/30">
                <ExternalLink className="h-3.5 w-3.5" /> Voir le site
              </Button>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "dashboard" && <DashboardOverview settings={settings} onNavigate={setActiveSection} />}
              {activeSection === "blog" && <AdminBlog />}
              {activeSection === "faq" && <AdminFAQ />}
              {activeSection === "portfolio" && <AdminPortfolio />}
              {activeSection === "events" && <AdminEvents />}
              {activeSection === "partners" && <AdminPartnerships />}

              {activeSection === "links" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-neon-pink" /> Réseaux sociaux
                      </CardTitle>
                      <CardDescription>Configure tes liens vers les réseaux sociaux</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-5 rounded-xl bg-discord/5 border border-discord/20">
                        <h3 className="font-display font-bold text-discord mb-3 flex items-center gap-2">🎮 Discord</h3>
                        <SettingsField label="Lien d'invitation" value={settings.discordLink} onChange={(v) => updateSettings({ discordLink: v })} placeholder="https://discord.gg/..." icon={ExternalLink} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <SettingsField label="TikTok" value={settings.tiktokLink} onChange={(v) => updateSettings({ tiktokLink: v })} placeholder="https://tiktok.com/@..." icon={Hash} />
                        <SettingsField label="Instagram" value={settings.instagramLink} onChange={(v) => updateSettings({ instagramLink: v })} placeholder="https://instagram.com/..." icon={Image} />
                        <SettingsField label="YouTube" value={settings.youtubeLink} onChange={(v) => updateSettings({ youtubeLink: v })} placeholder="https://youtube.com/..." icon={Film} />
                        <SettingsField label="Twitter / X" value={settings.twitterLink} onChange={(v) => updateSettings({ twitterLink: v })} placeholder="https://x.com/..." icon={ExternalLink} />
                        <SettingsField label="Snapchat" value={settings.snapchatLink} onChange={(v) => updateSettings({ snapchatLink: v })} placeholder="https://snapchat.com/..." icon={ExternalLink} />
                      </div>
                      <Button onClick={save} className="bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 gap-2 rounded-xl"><Save className="h-4 w-4" /> Sauvegarder</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "general" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2"><Globe className="h-5 w-5 text-neon-cyan" /> Paramètres généraux</CardTitle>
                      <CardDescription>Informations de base du site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <SettingsField label="Nom du site" value={settings.siteName} onChange={(v) => updateSettings({ siteName: v })} icon={Type} />
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Description</Label>
                        <Textarea value={settings.siteDescription} onChange={(e) => updateSettings({ siteDescription: e.target.value })} rows={3} className="resize-none" />
                      </div>
                      <SettingsField label="Email de contact" value={settings.contactEmail} onChange={(v) => updateSettings({ contactEmail: v })} type="email" icon={Mail} />
                      <div className="border-t border-border/30 pt-5">
                        <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2"><Monitor className="h-4 w-4 text-neon-purple" /> Section Hero</h3>
                        <div className="space-y-4">
                          <SettingsField label="Titre Hero" value={settings.heroTitle} onChange={(v) => updateSettings({ heroTitle: v })} icon={Type} />
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">Sous-titre Hero</Label>
                            <Textarea value={settings.heroSubtitle} onChange={(e) => updateSettings({ heroSubtitle: e.target.value })} rows={2} className="resize-none" />
                          </div>
                        </div>
                      </div>
                      <Button onClick={save} className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 gap-2 rounded-xl"><Save className="h-4 w-4" /> Sauvegarder</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "stats" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2"><BarChart3 className="h-5 w-5 text-neon-green" /> Statistiques affichées</CardTitle>
                      <CardDescription>Chiffres affichés sur la page d'accueil</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 space-y-3">
                          <div className="flex items-center gap-2 text-neon-cyan">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Membres</span>
                          </div>
                          <Input value={settings.statsMembers} onChange={(e) => updateSettings({ statsMembers: e.target.value })} className="text-center font-display text-lg font-bold" />
                        </div>
                        <div className="p-4 rounded-xl bg-neon-pink/5 border border-neon-pink/20 space-y-3">
                          <div className="flex items-center gap-2 text-neon-pink">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Vidéos</span>
                          </div>
                          <Input value={settings.statsVideos} onChange={(e) => updateSettings({ statsVideos: e.target.value })} className="text-center font-display text-lg font-bold" />
                        </div>
                        <div className="p-4 rounded-xl bg-neon-orange/5 border border-neon-orange/20 space-y-3">
                          <div className="flex items-center gap-2 text-neon-orange">
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Contenus</span>
                          </div>
                          <Input value={settings.statsAstuces} onChange={(e) => updateSettings({ statsAstuces: e.target.value })} className="text-center font-display text-lg font-bold" />
                        </div>
                      </div>
                      <Button onClick={save} className="bg-gradient-to-r from-neon-green to-neon-cyan hover:opacity-90 gap-2 rounded-xl"><Save className="h-4 w-4" /> Sauvegarder</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "announce" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2"><Bell className="h-5 w-5 text-neon-yellow" /> Bandeau d'annonce</CardTitle>
                      <CardDescription>Affiche un message en haut de toutes les pages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${settings.announcementEnabled ? "bg-neon-green animate-pulse" : "bg-muted-foreground/30"}`} />
                          <div>
                            <Label className="font-medium">Activer le bandeau</Label>
                            <p className="text-[11px] text-muted-foreground">Visible sur toutes les pages</p>
                          </div>
                        </div>
                        <Switch checked={settings.announcementEnabled} onCheckedChange={(v) => updateSettings({ announcementEnabled: v })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Texte de l'annonce</Label>
                        <Textarea value={settings.announcementText} onChange={(e) => updateSettings({ announcementText: e.target.value })} rows={2} placeholder="🎉 Nouveau contenu chaque semaine !" className="resize-none" />
                      </div>
                      {settings.announcementEnabled && settings.announcementText && (
                        <div className="rounded-xl overflow-hidden border border-border/30">
                          <p className="text-[11px] text-muted-foreground px-3 py-1.5 bg-muted/30">Aperçu</p>
                          <div className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-background text-center text-sm font-medium py-2.5 px-4">
                            {settings.announcementText}
                          </div>
                        </div>
                      )}
                      <Button onClick={save} className="bg-gradient-to-r from-neon-yellow to-neon-orange hover:opacity-90 gap-2 rounded-xl text-background"><Save className="h-4 w-4" /> Sauvegarder</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2"><Palette className="h-5 w-5 text-neon-purple" /> Apparence</CardTitle>
                      <CardDescription>Personnalise le look de ton site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-5 rounded-xl border border-border/30 bg-muted/20 text-center space-y-2">
                          <Moon className="h-6 w-6 mx-auto text-neon-purple" />
                          <p className="font-display font-bold text-sm">Mode sombre</p>
                          <p className="text-[11px] text-muted-foreground">Thème actuel</p>
                          <div className="w-2 h-2 rounded-full bg-neon-green mx-auto" />
                        </div>
                        <div className="p-5 rounded-xl border border-border/30 bg-muted/10 text-center space-y-2 opacity-40">
                          <Sun className="h-6 w-6 mx-auto text-neon-yellow" />
                          <p className="font-display font-bold text-sm">Mode clair</p>
                          <p className="text-[11px] text-muted-foreground">Bientôt</p>
                        </div>
                      </div>
                      <div className="border-t border-border/30 pt-5">
                        <h3 className="font-display font-bold text-sm mb-3">Palette de couleurs</h3>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { name: "Cyan", color: "bg-neon-cyan" },
                            { name: "Pink", color: "bg-neon-pink" },
                            { name: "Purple", color: "bg-neon-purple" },
                            { name: "Orange", color: "bg-neon-orange" },
                            { name: "Green", color: "bg-neon-green" },
                            { name: "Yellow", color: "bg-neon-yellow" },
                          ].map(c => (
                            <div key={c.name} className="flex flex-col items-center gap-1.5">
                              <div className={`w-10 h-10 rounded-xl ${c.color} shadow-lg`} />
                              <span className="text-[10px] text-muted-foreground">{c.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-border/30 pt-5">
                        <h3 className="font-display font-bold text-sm mb-3">Responsive</h3>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Monitor className="h-4 w-4 text-neon-cyan" /> Desktop
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Smartphone className="h-4 w-4 text-neon-green" /> Mobile
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Le site s'adapte automatiquement à tous les écrans.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6">
                  <Card className="border-border/30 bg-card/80">
                    <CardHeader>
                      <CardTitle className="font-display flex items-center gap-2"><Shield className="h-5 w-5 text-neon-orange" /> Sécurité & Maintenance</CardTitle>
                      <CardDescription>Gère la sécurité et l'accès au site</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Maintenance mode */}
                      <div className={`p-5 rounded-xl border transition-all duration-300 ${settings.maintenanceMode ? "bg-destructive/5 border-destructive/30" : "bg-muted/20 border-border/30"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.maintenanceMode ? "bg-destructive/10" : "bg-muted/30"}`}>
                              <AlertTriangle className={`h-5 w-5 ${settings.maintenanceMode ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                              <Label className="font-display font-bold block">Mode Maintenance</Label>
                              <p className="text-[11px] text-muted-foreground">Les visiteurs verront une page de maintenance</p>
                            </div>
                          </div>
                          <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => updateSettings({ maintenanceMode: v })} />
                        </div>
                        {settings.maintenanceMode && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 text-xs text-destructive bg-destructive/10 rounded-lg p-3 border border-destructive/20"
                          >
                            ⚠️ Le site est actuellement invisible pour les visiteurs. Toi en tant qu'admin, tu peux toujours le voir.
                          </motion.p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
                        <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
                          <Lock className="h-4 w-4 text-neon-orange" /> Mot de passe admin
                        </h3>
                        <div className="flex items-center gap-2">
                          <Input type={showPass ? "text" : "password"} value="astuceson2024" readOnly className="font-mono h-10" />
                          <Button variant="outline" size="icon" onClick={() => setShowPass(!showPass)} className="h-10 w-10 shrink-0 rounded-lg border-border/30">
                            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-2">Ce mot de passe protège l'accès au panneau admin.</p>
                      </div>

                      {/* Session info */}
                      <div className="p-5 rounded-xl bg-neon-green/5 border border-neon-green/20">
                        <h3 className="font-display font-bold text-sm mb-2 flex items-center gap-2 text-neon-green">
                          <Activity className="h-4 w-4" /> Session active
                        </h3>
                        <p className="text-xs text-muted-foreground">Tu es connecté en tant qu'administrateur. Ta session est stockée localement.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ settings, onNavigate }: { settings: any; onNavigate: (s: AdminSection) => void }) {
  const quickActions: { label: string; section: AdminSection; icon: any; color: string; desc: string }[] = [
    { label: "Blog", section: "blog", icon: FileText, color: "from-neon-pink/10 to-neon-pink/5 border-neon-pink/20 hover:border-neon-pink/50", desc: "Gérer les articles" },
    { label: "FAQ", section: "faq", icon: HelpCircle, color: "from-neon-cyan/10 to-neon-cyan/5 border-neon-cyan/20 hover:border-neon-cyan/50", desc: "Questions / réponses" },
    { label: "Portfolio", section: "portfolio", icon: Film, color: "from-neon-purple/10 to-neon-purple/5 border-neon-purple/20 hover:border-neon-purple/50", desc: "Vidéos & contenus" },
    { label: "Événements", section: "events", icon: CalendarDays, color: "from-neon-green/10 to-neon-green/5 border-neon-green/20 hover:border-neon-green/50", desc: "Lives & giveaways" },
    { label: "Partenaires", section: "partners", icon: Handshake, color: "from-neon-orange/10 to-neon-orange/5 border-neon-orange/20 hover:border-neon-orange/50", desc: "Collaborations" },
    { label: "Réseaux", section: "links", icon: Link2, color: "from-neon-pink/10 to-neon-pink/5 border-neon-pink/20 hover:border-neon-pink/50", desc: "Liens sociaux" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-neon-purple/5 to-neon-pink/5 border border-border/30 p-6 lg:p-8">
        <h2 className="font-display text-2xl lg:text-3xl font-black mb-2">
          Salut <span className="text-gradient">Admin</span> 👋
        </h2>
        <p className="text-muted-foreground text-sm">Bienvenue dans ton centre de commande. Gère tout depuis ici.</p>

        {/* Status indicators */}
        <div className="flex flex-wrap gap-3 mt-5">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            settings.maintenanceMode
              ? "bg-destructive/10 text-destructive border-destructive/30"
              : "bg-neon-green/10 text-neon-green border-neon-green/30"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${settings.maintenanceMode ? "bg-destructive" : "bg-neon-green"} animate-pulse`} />
            {settings.maintenanceMode ? "Maintenance" : "Site en ligne"}
          </div>
          {settings.announcementEnabled && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/30">
              <Bell className="h-3 w-3" /> Annonce active
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Membres", value: settings.statsMembers, color: "text-neon-cyan" },
          { label: "Vidéos", value: settings.statsVideos, color: "text-neon-pink" },
          { label: "Contenus", value: settings.statsAstuces, color: "text-neon-orange" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border/30 bg-card/50 p-4 text-center">
            <div className={`font-display text-2xl lg:text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions grid */}
      <div>
        <h3 className="font-display font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Accès rapide</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map(a => (
            <motion.button
              key={a.section}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(a.section)}
              className={`p-5 rounded-xl bg-gradient-to-br ${a.color} border text-left transition-all group`}
            >
              <a.icon className="h-6 w-6 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-display font-bold text-sm">{a.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAdmin } = useSiteSettings();
  return isAdmin ? <AdminDashboard /> : <LoginForm />;
}
