import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
    // Keep the data fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Retry on error
    retry: 1,
  });
};
