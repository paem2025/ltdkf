import { forwardToBackend } from "@/lib/server/backend-proxy"

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  return forwardToBackend(`/api/products/${id}`)
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  const body = await request.text()
  return forwardToBackend(`/api/products/${id}`, {
    method: "PUT",
    body,
    requiresAdminToken: true,
  })
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  return forwardToBackend(`/api/products/${id}`, {
    method: "DELETE",
    requiresAdminToken: true,
  })
}
