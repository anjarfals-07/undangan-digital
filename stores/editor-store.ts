// stores/editor-store.ts
import { create } from "zustand";
import type { SectionInstance, ThemeSelection } from "@/types";

type EditorState = {
  // Selection
  selectedSectionId: string | null;
  previewMode: "mobile" | "desktop";
  editorMode: "simple" | "advanced" | "pro";

  // Theme selection (sementara)
  themeSelection: ThemeSelection | null;

  // Sections (sementara)
  sections: SectionInstance[];

  // Actions
  setSelectedSection: (id: string | null) => void;
  setPreviewMode: (mode: "mobile" | "desktop") => void;
  setEditorMode: (mode: "simple" | "advanced" | "pro") => void;
  setThemeSelection: (theme: ThemeSelection | null) => void;
  setSections: (sections: SectionInstance[]) => void;
  updateSection: (id: string, updates: Partial<SectionInstance>) => void;
  reorderSections: (from: number, to: number) => void;
  reset: () => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  selectedSectionId: null,
  previewMode: "desktop",
  editorMode: "simple",
  themeSelection: null,
  sections: [],

  setSelectedSection: (id) => set({ selectedSectionId: id }),

  setPreviewMode: (mode) => set({ previewMode: mode }),

  setEditorMode: (mode) => set({ editorMode: mode }),

  setThemeSelection: (theme) => set({ themeSelection: theme }),

  setSections: (sections) => set({ sections }),

  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })),

  reorderSections: (from, to) =>
    set((state) => {
      const newSections = [...state.sections];
      const [removed] = newSections.splice(from, 1);
      newSections.splice(to, 0, removed);
      return {
        sections: newSections.map((s, i) => ({ ...s, order: i })),
      };
    }),

  reset: () =>
    set({
      selectedSectionId: null,
      previewMode: "desktop",
      editorMode: "simple",
      themeSelection: null,
      sections: [],
    }),
}));
