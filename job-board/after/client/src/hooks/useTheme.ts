import { Context } from "@/contexts/ThemeProvider"
import { useContext } from "react"

export function useTheme() {
  const theme = useContext(Context)
  if (theme == null) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return theme
}
