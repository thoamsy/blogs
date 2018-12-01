import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import './style.css';

import Layout from '../components/Layout';
import Bio from '../components/Bio';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ location }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexQuery {
          site {
            siteMetadata {
              title
            }
          }
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "YYYY/MM/DD")
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.allMarkdownRemark.edges;
        return (
          <Layout location={location}>
            <Helmet title={siteTitle} />
            <Bio />
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <div key={node.fields.slug}>
                  <h3
                    className="blog-index"
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </div>
              );
            })}
          </Layout>
        );
      }}
    />
  );
};
export default BlogIndex;
