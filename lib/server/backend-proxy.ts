import { NextResponse } from "next/server"

const DEV_ADMIN_TOKEN = "dev-admin-token"

function getBackendBaseUrl(): string | null {
  const configured = process.env.BACKEND_API_BASE_URL?.trim()
  if (configured) {
    return configured.replace(/\/$/, "")
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8080"
  }

  return null
}

function getAdminToken(): string | null {
  if (process.env.ADMIN_API_TOKEN) {
    return process.env.ADMIN_API_TOKEN
  }

  if (process.env.NODE_ENV !== "production") {
    return DEV_ADMIN_TOKEN
  }

  return null
}

type ForwardOptions = {
  body?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  requiresAdminToken?: boolean
}

export async function forwardToBackend(path: string, options: ForwardOptions = {}): Promise<Response> {
  const backendBaseUrl = getBackendBaseUrl()
  if (!backendBaseUrl) {
    return NextResponse.json(
      { error: "BACKEND_API_BASE_URL is not configured on frontend server" },
      { status: 503 },
    )
  }

  const method = options.method ?? "GET"
  const headers = new Headers()

  if (options.body) {
    headers.set("Content-Type", "application/json")
  }

  if (options.requiresAdminToken) {
    const token = getAdminToken()
    if (!token) {
      return NextResponse.json(
        { error: "Admin API token is not configured on frontend server" },
        { status: 503 },
      )
    }
    headers.set("X-Admin-Token", token)
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = `${backendBaseUrl}${normalizedPath}`

  try {
    const backendResponse = await fetch(url, {
      method,
      headers,
      body: options.body,
      cache: "no-store",
    })

    const responseText = await backendResponse.text()
    const responseHeaders = new Headers()
    const contentType = backendResponse.headers.get("content-type")

    if (contentType) {
      responseHeaders.set("content-type", contentType)
    }

    return new Response(responseText, {
      status: backendResponse.status,
      headers: responseHeaders,
    })
  } catch {
    return NextResponse.json(
      { error: "Backend unavailable" },
      { status: 502 },
    )
  }
}
