import { QueryClient, QueryFunction } from "@tanstack/react-query";

// This is a frontend-only version of the query client that doesn't depend on backend APIs
// It simulates the same interface but works with static/mock data instead

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Simple query function that just returns success without calling any backend
      queryFn: async () => {
        return { success: true };
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Static/frontend-only version of the API request function
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Simply create a successful response
  const mockResponse = new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  
  return mockResponse;
}

// Helper functions to maintain the same interface
export async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T,>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> => {
  return async () => {
    // In the frontend-only version, we simply return success
    return { success: true } as unknown as T;
  };
};