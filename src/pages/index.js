import Downshift from 'downshift';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import Layout from '../templates/Layout';
import { rhythm } from '../utils/typography';

const BlogNav = ({ to, title, date, spoiler }) => (
  <article>
    <h3
      className="blog-index"
      style={{
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link tabIndex={-1} style={{ boxShadow: 'none' }} to={to}>
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

  const menuRef = useRef();
  useEffect(() => {
    // FIXME: 是否需要改成 context，并将 keyboard 的事件抽出来？
    const selectedIndex = +localStorage.getItem('selectedIndex');
    if (menuRef.current && !Number.isNaN(selectedIndex)) {
      // @ts-ignore
      menuRef.current.firstChild.children[selectedIndex].focus();
      localStorage.setItem('selectedIndex', null);
    }
  }, [menuRef]);

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet title={siteTitle} htmlAttributes={{ lang: 'zh-cn' }} />
      <nav ref={menuRef}>
        <Downshift
          defaultIsOpen
          initialIsOpen
          itemToString={item => (item ? item.title : '')}
        >
          {({ getMenuProps, getItemProps }) => (
            <ol {...getMenuProps({}, { suppressRefError: true })}>
              {posts.map(({ node }, index) => {
                const blogUrl = node.fields.slug;
                const { title = blogUrl, spoiler, date } = node.frontmatter;
                return (
                  <li
                    tabIndex={0}
                    {...getItemProps({
                      key: node.fields.slug,
                      index,
                      onKeyPress(e) {
                        e.preventDefault();
                        const key = e.key.toLowerCase();
                        switch (key) {
                          case 'enter':
                          case ' ':
                            localStorage.setItem('selectedIndex', index);
                            navigate(blogUrl);
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
                      to={blogUrl}
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
