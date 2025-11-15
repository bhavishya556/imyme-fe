
const domain = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL === "production" ? ".imyme.in" : undefined;

export const cookiePayload = {
    path: '/',
    maxAge: 24 * 60 * 60, // 1 day
    httpOnly: true,
    sameSite: 'lax' as const,
    domain: domain,
}