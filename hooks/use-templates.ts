// hooks/use-templates.ts
import { useQuery } from "@tanstack/react-query"
import type { Culture, TemplateCategory, TemplatePreset } from "@/types"

type GetTemplatesParams = {
  category?: TemplateCategory
  culture?: Culture
  search?: string
}

async function fetchTemplates(
  params: GetTemplatesParams = {}
): Promise<TemplatePreset[]> {
  const queryParams = new URLSearchParams()
  if (params.category) queryParams.set("category", params.category)
  if (params.culture) queryParams.set("culture", params.culture)
  if (params.search) queryParams.set("search", params.search)

  const res = await fetch(`/api/templates?${queryParams.toString()}`)
  if (!res.ok) throw new Error("Failed to fetch templates")
  return res.json()
}

export function useTemplates(params: GetTemplatesParams = {}) {
  return useQuery({
    queryKey: ["templates", params],
    queryFn: () => fetchTemplates(params),
  })
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const res = await fetch(`/api/templates/${id}`)
      if (!res.ok) throw new Error("Failed to fetch template")
      return res.json() as Promise<TemplatePreset>
    },
    enabled: !!id,
  })
}