
export const revalidate = 360;

export default async function sitemap() {
   const baseUrl = 'https://imyme.in';

   // let res = await fetchAllBlogs({pageNo: 1, pageSize: 200000});
    // let blogs = [];
    // if (res?.success) {
    //     blogs = res.data || [];
    // }

    // const blogsUrls = blogs.map((blog: any) => {
    //     return {
    //         url: `${baseUrl}/${blog?.slug}`,
    //         lastModified: new Date(),
    //         changeFrequency: 'weekly',
    //         priority: 1,
    //     }
    // })

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/cv`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/career`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/contactus`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/policy`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/term`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // ...blogsUrls,
    ]
}