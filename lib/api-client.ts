export class ApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "")

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl}${path}`

  const headers = new Headers(init?.headers)
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    let details: unknown = null

    try {
      details = await response.json()
    } catch {
      details = await response.text().catch(() => null)
    }

    const message =
      typeof details === "object" &&
      details !== null &&
      "error" in details &&
      typeof (details as { error: unknown }).error === "string"
        ? (details as { error: string }).error
        : `Request failed with status ${response.status}`

    throw new ApiError(message, response.status, details)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
