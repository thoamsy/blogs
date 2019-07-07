import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { rhythm, scale } from '../utils/typography';
import Bio from './Bio';
import PageNavigation from './components/PageNavigation';
import Layout from './Layout';

const BlogPostTemplate = ({
  location,
  pageContext,
  data: { markdownRemark: post, site },
}) => {
  const siteTitle = site.siteMetadata.title;

  useEffect(() => {
    const homePageTitle = '😏';
    document.title = `${homePageTitle}  ${post.frontmatter.title}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout location={location} title={siteTitle}>
      <hgroup>
        <h1
          style={{
            color: 'var(--text-title)',
            transition: 'color 0.3s ease-out, background 0.3s ease-out',
          }}
        >
          {post.frontmatter.title}
        </h1>
        <time
          style={{
            ...scale(-1 / 4),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </time>
      </hgroup>
      <main
        style={{ fontSize: rhythm(0.6) }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <footer>
        <Bio />
        <br />
        <PageNavigation {...pageContext} />
      </footer>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
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
        spoiler
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`;
