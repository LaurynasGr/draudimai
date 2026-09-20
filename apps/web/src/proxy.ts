import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server'
import { jwtExpiresAt } from '@scaffold/core'

const isLoginPage = createRouteMatcher(['/login'])

// Every page is public: the content is not private, and sign-in is kept only for user-specific features to come.
// The middleware still runs everywhere because it keeps the auth cookies fresh and serves /api/auth, where the
// Convex Auth client exchanges tokens.
export default convexAuthNextjsMiddleware(
    async (request, { convexAuth }) => {
        if (!isLoginPage(request)) return
        // Someone already signed in has no use for the login page. Decided from the cookie alone:
        // `convexAuth.isAuthenticated()` would ask the Convex backend, in front of the first byte. Only this redirect
        // depends on it; every Convex function verifies the token itself.
        const token = await convexAuth.getToken()
        const expiresAt = token ? jwtExpiresAt(token) : null
        if (expiresAt !== null && expiresAt > Date.now()) return nextjsMiddlewareRedirect(request, '/')
    },
    // Keep the session across browser restarts (30 days), matching the client-side token storage.
    { cookieConfig: { maxAge: 60 * 60 * 24 * 30 } },
)

export const config = {
    // Everything except Next internals and the metadata files served from
    // app/ (icon, manifest, robots, sitemap).
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)',
    ],
}
