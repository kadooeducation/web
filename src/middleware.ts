import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import { decrypt } from './infra/shared/security/decrypt'
import { APP_ROUTES } from './shared/constants/routes'

const publicRoutes = [
  {
    path: APP_ROUTES.login,
    whenAuthenticated: 'redirect',
  },
  {
    path: APP_ROUTES.register,
    whenAuthenticated: 'redirect',
  },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = APP_ROUTES.login

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicRoute = publicRoutes.find((route) => route.path === path)
  const authToken = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME)

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = APP_ROUTES.home

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && !publicRoute) {
    const token = await decrypt(authToken.value)

    // if (!token || token === 'invalid') {
    //   const redirect = request.nextUrl.clone()

    //   redirect.pathname = APP_ROUTES.login

    //   const response = NextResponse.redirect(redirect)

    //   response.cookies.delete(process.env.NEXT_PUBLIC_TOKEN_NAME)

    //   return response
    // }
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/login',
    '/registro',
    '/',
    '/adm/:path*',
    '/edital/:path*'
  ],
}
