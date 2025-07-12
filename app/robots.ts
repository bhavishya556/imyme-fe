import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bizelevators.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/en/admin',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}