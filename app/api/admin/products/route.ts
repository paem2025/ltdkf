import { forwardToBackend } from "@/lib/server/backend-proxy"

export async function GET() {
  return forwardToBackend("/api/products")
}

export async function POST(request: Request) {
  const body = await request.text()
  return forwardToBackend("/api/products", {
    method: "POST",
    body,
    requiresAdminToken: true,
  })
}
