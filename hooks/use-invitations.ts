// hooks/use-invitations.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Invitation } from "@/types"

async function fetchInvitations(): Promise<Invitation[]> {
  const res = await fetch("/api/invitations")
  if (!res.ok) throw new Error("Failed to fetch invitations")
  return res.json()
}

async function fetchInvitation(id: string): Promise<Invitation> {
  const res = await fetch(`/api/invitations/${id}`)
  if (!res.ok) throw new Error("Failed to fetch invitation")
  return res.json()
}

export function useInvitations() {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: fetchInvitations,
  })
}

export function useInvitation(id: string) {
  return useQuery({
    queryKey: ["invitation", id],
    queryFn: () => fetchInvitation(id),
    enabled: !!id,
  })
}

export function useCreateInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Invitation>) => {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to create invitation")
      return res.json() as Promise<Invitation>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
    },
  })
}

export function useUpdateInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<Invitation>
    }) => {
      const res = await fetch(`/api/invitations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update invitation")
      return res.json() as Promise<Invitation>
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
      queryClient.invalidateQueries({ queryKey: ["invitation", variables.id] })
    },
  })
}

export function useDeleteInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/invitations/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete invitation")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
    },
  })
}