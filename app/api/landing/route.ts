import { forwardToBackend } from "@/lib/server/backend-proxy"

export async function GET() {
  return forwardToBackend("/api/landing")
}
