import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"',
    },
  })
}

function adminDisabledResponse() {
  return new NextResponse("Admin is disabled. Set ADMIN_BASIC_USER and ADMIN_BASIC_PASSWORD to enable it.", {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
    },
  })
}

export function proxy(request: NextRequest) {
  const adminUser = process.env.ADMIN_BASIC_USER
  const adminPassword = process.env.ADMIN_BASIC_PASSWORD

  if (!adminUser || !adminPassword) {
    if (process.env.NODE_ENV === "production") {
      return adminDisabledResponse()
    }

    return NextResponse.next()
  }

  const authorization = request.headers.get("authorization")
  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse()
  }

  let decoded = ""

  try {
    decoded = atob(authorization.slice(6))
  } catch {
    return unauthorizedResponse()
  }

  const separatorIndex = decoded.indexOf(":")
  if (separatorIndex === -1) {
    return unauthorizedResponse()
  }

  const providedUser = decoded.slice(0, separatorIndex)
  const providedPassword = decoded.slice(separatorIndex + 1)

  if (providedUser !== adminUser || providedPassword !== adminPassword) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
