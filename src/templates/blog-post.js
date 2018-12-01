import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Bio from '../components/Bio';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = ({ location }) => (
  <StaticQuery
    query={graphql`
      query BlogPostBySlug($slug: String!) {
        site {
          siteMetadata {
            title
            author
          }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
          id
          html
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    `}
    render={({ markdownRemark: post, site }) => {
      const siteTitle = site.siteMetadata.title;

      return (
        <Layout location={location}>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />
        </Layout>
      );
    }}
  />
);

export default BlogPostTemplate;
