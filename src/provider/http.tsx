import React, { createContext } from "react"

import { HttpClient } from "@/core/http"

interface HttpProviderData {
  client: HttpClient
}

const Context = createContext<HttpProviderData>(null!)

interface HttpProviderProps {
  client: HttpClient
  children: React.ReactNode
}

export function HttpClientProvider({ children, client }: HttpProviderProps) {
  const value = React.useMemo(() => ({ client }), [client])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useHttpClient() {
  const data = React.useContext(Context)
  if (!data) {
    throw new Error("useHttpClient must be used within a HttpProvider")
  }
  return data.client
}
