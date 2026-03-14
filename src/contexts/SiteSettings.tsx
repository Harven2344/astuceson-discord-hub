import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteSettings {
  discordLink: string;
  tiktokLink: string;
  instagramLink: string;
  youtubeLink: string;
  twitterLink: string;
  snapchatLink: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  heroTitle: string;
  heroSubtitle: string;
  statsMembers: string;
  statsVideos: string;
  statsAstuces: string;
  announcementText: string;
  announcementEnabled: boolean;
  maintenanceMode: boolean;
}

const defaults: SiteSettings = {
  discordLink: "#",
  tiktokLink: "#",
  instagramLink: "#",
  youtubeLink: "#",
  twitterLink: "#",
  snapchatLink: "#",
  siteName: "Astuceson",
  siteDescription: "TikTokeur passionné partageant les meilleures astuces. Rejoins la communauté Discord !",
  contactEmail: "contact.astuceson@gmail.com",
  heroTitle: "Bienvenue chez Astuceson",
  heroSubtitle: "TikTokeur passionné, je partage les meilleures astuces du web. Rejoins ma communauté Discord pour ne rien rater !",
  statsMembers: "10K+",
  statsVideos: "500+",
  statsAstuces: "1K+",
  announcementText: "",
  announcementEnabled: false,
  maintenanceMode: false,
};

interface Ctx {
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => void;
  isAdmin: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
}

const SiteSettingsContext = createContext<Ctx>({
  settings: defaults,
  updateSettings: () => {},
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const STORAGE_KEY = "astuceson-settings";
const ADMIN_KEY = "astuceson-admin";
const ADMIN_PASS = "astuceson2024";

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(ADMIN_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (partial: Partial<SiteSettings>) =>
    setSettings((prev) => ({ ...prev, ...partial }));

  const login = (pass: string) => {
    if (pass === ADMIN_PASS) {
      setIsAdmin(true);
      localStorage.setItem(ADMIN_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_KEY);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, isAdmin, login, logout }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
