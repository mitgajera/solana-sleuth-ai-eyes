
import { supabase } from "@/integrations/supabase/client";

export const apiKeyService = {
  /**
   * Store API key in database or localStorage if not authenticated
   */
  saveApiKey: async (apiKey: string): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User is authenticated, store in database
        const { error } = await supabase
          .from('api_keys')
          .upsert({
            user_id: user.id,
            key_name: 'messari',
            api_key: apiKey,
          });

        if (error) throw error;
      } else {
        // No authenticated user, store in localStorage
        localStorage.setItem('messari_api_key', apiKey);
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      throw new Error('Failed to save API key');
    }
  },

  /**
   * Retrieve API key from database or localStorage
   */
  getApiKey: async (): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User is authenticated, get from database
        const { data, error } = await supabase
          .from('api_keys')
          .select('api_key')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        return data?.api_key ?? null;
      } else {
        // No authenticated user, get from localStorage
        return localStorage.getItem('messari_api_key');
      }
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  },

  /**
   * Check if API key exists in database or localStorage
   */
  hasApiKey: async (): Promise<boolean> => {
    try {
      const apiKey = await apiKeyService.getApiKey();
      return !!apiKey;
    } catch (error) {
      console.error('Error checking API key:', error);
      return false;
    }
  },

  /**
   * Clear API key from database or localStorage
   */
  clearApiKey: async (): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User is authenticated, delete from database
        const { error } = await supabase
          .from('api_keys')
          .delete()
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // No authenticated user, remove from localStorage
        localStorage.removeItem('messari_api_key');
      }
    } catch (error) {
      console.error('Error clearing API key:', error);
      throw new Error('Failed to clear API key');
    }
  }
};
