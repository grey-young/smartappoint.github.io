import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  );

  // Attach supabase to the Nuxt application
  nuxtApp.provide("supabase", supabase);
});
