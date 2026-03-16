import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASS = "astuceson2024";

export function useAdminCrud<T extends { id: string }>(table: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const call = useCallback(async (action: string, data?: any, id?: string) => {
    const { data: result, error } = await supabase.functions.invoke("admin-crud", {
      body: { password: ADMIN_PASS, table, action, data, id },
    });
    if (error) throw error;
    return result;
  }, [table]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await call("list");
      setItems(result || []);
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [call]);

  const create = useCallback(async (data: Partial<T>) => {
    try {
      await call("create", data);
      toast({ title: "✅ Créé" });
      await fetchAll();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  }, [call, fetchAll]);

  const update = useCallback(async (id: string, data: Partial<T>) => {
    try {
      await call("update", data, id);
      toast({ title: "✅ Mis à jour" });
      await fetchAll();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  }, [call, fetchAll]);

  const remove = useCallback(async (id: string) => {
    try {
      await call("delete", undefined, id);
      toast({ title: "✅ Supprimé" });
      await fetchAll();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  }, [call, fetchAll]);

  return { items, loading, fetchAll, create, update, remove };
}
