module.exports = {
  siteMetadata: {
    title: `😏`,
    author: 'Yang Kui',
    description: '👤博客',
    siteUrl: 'https://github.com/thoamsy/blogs.git',
  },
  pathPrefix: '/blogs',
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `thoamsy's blog`,
        short_name: `😏`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/resource/icon@3x.png`, // This path is relative to the root of the site.
        include_favicon: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
