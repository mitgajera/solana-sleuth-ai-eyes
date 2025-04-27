
import { supabase } from "@/integrations/supabase/client";

export const apiKeyService = {
  /**
   * Store API key in database
   */
  saveApiKey: async (apiKey: string): Promise<void> => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User must be logged in to save API key');

    const { error } = await supabase
      .from('api_keys')
      .upsert({
        user_id: user.id,
        key_name: 'messari',
        api_key: apiKey,
      });

    if (error) throw error;
  },

  /**
   * Retrieve API key from database
   */
  getApiKey: async (): Promise<string | null> => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('api_key')
      .maybeSingle();

    if (error) throw error;
    return data?.api_key ?? null;
  },

  /**
   * Check if API key exists in database
   */
  hasApiKey: async (): Promise<boolean> => {
    const apiKey = await apiKeyService.getApiKey();
    return !!apiKey;
  },

  /**
   * Clear API key from database
   */
  clearApiKey: async (): Promise<void> => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .neq('api_key', '');
      
    if (error) throw error;
  }
};
