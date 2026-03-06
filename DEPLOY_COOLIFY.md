# Frontend Deploy on Coolify (`ltdkf`)

## 1. Create frontend service from repo

- Repository: `paem2025/ltdkf`
- Branch: `main`
- Build type: `Dockerfile`
- Port: `3000`

## 2. Required environment variables

Set these in Coolify frontend service:

```env
PORT=3000
BACKEND_API_BASE_URL=http://<backend-host>:8080
ADMIN_API_TOKEN=<same-value-as-backend-APP_ADMIN_TOKEN>
ADMIN_BASIC_USER=<admin-user>
ADMIN_BASIC_PASSWORD=<strong-admin-password>
```

Important:

- `BACKEND_API_BASE_URL` must point to backend reachable URL from the frontend container.
- `ADMIN_API_TOKEN` must match backend `APP_ADMIN_TOKEN`.
- Do **not** set `NEXT_PUBLIC_API_BASE_URL` for this architecture (frontend uses local `/api/*` proxy routes).

## 3. Admin behavior

- `/admin` and `/api/admin/*` are protected with HTTP Basic Auth.
- If `ADMIN_BASIC_USER` or `ADMIN_BASIC_PASSWORD` is missing in production, admin routes return `503`.

## 4. Quick checks after deploy

1. Open `/` and verify products/landing load from backend.
2. Open `/admin` and log in with basic auth credentials.
3. Create or edit one product and confirm it persists after refresh.
