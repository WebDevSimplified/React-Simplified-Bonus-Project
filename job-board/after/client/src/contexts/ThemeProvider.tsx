import { THEME_OPTIONS } from "@/constants/constants"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ReactNode, createContext } from "react"

type Theme = (typeof THEME_OPTIONS)[number]
type ThemeProviderProps = {
  children: ReactNode
}

type ThemeContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

export const Context = createContext<ThemeContext | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>("THEME", "system")

  function changeTheme(theme: Theme) {
    const isDark =
      theme === "dark" ||
      (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches)

    document.documentElement.classList.toggle("dark", isDark)
    setTheme(theme)
  }

  return (
    <Context.Provider
      value={{
        theme,
        setTheme: changeTheme,
        isDark: document.documentElement.classList.contains("dark"),
      }}
    >
      {children}
    </Context.Provider>
  )
}
