// lib/query-client.ts
import { QueryClient } from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 menit
        gcTime: 5 * 60 * 1000, // 5 menit
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: selalu buat query client baru
    return makeQueryClient()
  } else {
    // Browser: pakai singleton
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}