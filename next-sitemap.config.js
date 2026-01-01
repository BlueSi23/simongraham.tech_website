/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.simongraham.tech',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
}
