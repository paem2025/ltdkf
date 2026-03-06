import { forwardToBackend } from "@/lib/server/backend-proxy"

export async function GET() {
  return forwardToBackend("/api/landing")
}

export async function PUT(request: Request) {
  const body = await request.text()
  return forwardToBackend("/api/landing", {
    method: "PUT",
    body,
    requiresAdminToken: true,
  })
}
