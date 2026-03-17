import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASS = "astuceson2024";
const ALLOWED_TABLES = ["blog_posts", "faq_items", "portfolio_items", "events", "partnerships", "boutique_items"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, table, action, data, id } = await req.json();

    if (password !== ADMIN_PASS) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ALLOWED_TABLES.includes(table)) {
      return new Response(JSON.stringify({ error: "Invalid table" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let result;

    switch (action) {
      case "list": {
        const { data: items, error } = await supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = items;
        break;
      }
      case "create": {
        const { data: item, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        if (error) throw error;
        result = item;
        break;
      }
      case "update": {
        const { data: item, error } = await supabase
          .from(table)
          .update(data)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = item;
        break;
      }
      case "delete": {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("id", id);
        if (error) throw error;
        result = { success: true };
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
