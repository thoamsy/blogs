import React from 'react';
import { graphql, Link } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import { rhythm, scale } from '../utils/typography';

const PageNavigation = ({ previous, next }) => (
  <ul
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      listStyle: 'none',
      padding: 0,
    }}
  >
    <li>
      {previous && (
        <Link to={previous.fields.slug} rel="prev">
          ← {previous.frontmatter.title}
        </Link>
      )}
    </li>
    <li>
      {next && (
        <Link to={next.fields.slug} rel="next">
          {next.frontmatter.title} →
        </Link>
      )}
    </li>
  </ul>
);
const BlogPostTemplate = ({
  location,
  pageContext,
  data: { markdownRemark: post, site },
}) => {
  const siteTitle = site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <header>
        <h1
          style={{
            color: 'var(--textTitle)',
            transition: 'color 0.3s ease-out, background 0.3s ease-out',
          }}
        >
          {post.frontmatter.title}
        </h1>
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
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />
      <br />
      <PageNavigation {...pageContext} />
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
