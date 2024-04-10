import { HttpClient } from "@/core/http"
import React from "react"
import { createContext } from "react"

interface HttpProviderData {
  client: HttpClient
}

const Context = createContext<HttpProviderData>(null!)

interface HttpProviderProps {
  client: HttpClient
  children: React.ReactNode
}

export function HttpClientProvider({ children, client }: HttpProviderProps) {
  return <Context.Provider value={{ client }}>{children}</Context.Provider>
}

export function useHttpClient() {
  const data = React.useContext(Context)
  if (!data) {
    throw new Error("useHttpClient must be used within a HttpProvider")
  }
  return data.client
}
