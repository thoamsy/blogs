import Downshift from 'downshift';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../templates/Layout';
import { rhythm } from '../utils/typography';


const BlogNav = ({ to, title, date, spoiler }) => (
  <article tabIndex={0}>
    <h3
      className="blog-index"
      style={{
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link style={{ boxShadow: 'none' }} to={to}>
        {title}
      </Link>
    </h3>
    <time>
      <small>{date}</small>
    </time>
    <p
      dangerouslySetInnerHTML={{
        __html: spoiler,
      }}
    />
  </article>
);

const BlogIndex = ({ location, data, navigate }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet title={siteTitle} htmlAttributes={{ lang: 'zh-cn' }} />
      <nav>
        <Downshift
          itemToString={item => item.title}
        >
          {({ getMenuProps, getItemProps, highlightedIndex }) => (
            <ol {...getMenuProps()}>
              {posts.map(({ node }, index) => {
                const postUrl = node.fields.slug;
                const {
                  title = postUrl,
                  spoiler,
                  date,
                } = node.frontmatter;
                return (
                  <li
                    {...getItemProps({
                      key: node.fields.slug,
                      index,
                      onKeyPress(e) {

                        e.preventDefault();
                        const key = e.key.toLowerCase();
                        switch (key) {
                          case 'enter':
                          case ' ':
                            navigate(postUrl)
                          default:
                            break;
                        }
                      },
                      item: node.frontmatter,
                      // style: {
                      //   backgroundColor:
                      //     highlightedIndex === index ? 'aliceblue' : 'var(--bg)',
                      // },
                    })}
                  >
                    <BlogNav
                      to={postUrl}
                      title={title}
                      date={date}
                      spoiler={spoiler || node.excerpt}
                    />
                  </li>
                );
              })}
            </ol>
          )}
        </Downshift>
      </nav>
    </Layout>
  );
};
export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            spoiler
          }
        }
      }
    }
  }
`;
