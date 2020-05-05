import Downshift from 'downshift';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import React, { useCallback, useEffect, useRef } from 'react';
import Helmet from 'react-helmet';

import Layout from '../templates/Layout';
import { rhythm } from '../utils/typography';

const localStorage =
  typeof window !== 'undefined'
    ? window.localStorage
    : {
        getItem() {},
        setItem() {},
      };

const supportPrefetch = () => {
  const link = document.createElement('link');
  const relList = link.relList;
  if (!relList || !relList.supports) return false;
  return relList.supports('prefetch');
};
const BlogNav = ({ to, title, date, spoiler }) => {
  const hadPrefetch = useRef(false);
  return (
    <article>
      <h3
        className="blog-index"
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link
          onPointerEnter={() => {
            if (hadPrefetch.current) {
              return;
            }
            const support = supportPrefetch();
            if (!support) {
              hadPrefetch.current = true;
            }
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.type = 'text/html';
            link.href = to;
            link.onload = () => (hadPrefetch.current = true);
            document.head.appendChild(link);
          }}
          tabIndex={-1}
          style={{ boxShadow: 'none' }}
          to={to}
        >
          {title}
        </Link>
      </h3>
      <div style={{ color: 'var(--text-secondary)' }}>
        <time>
          <small>{date}</small>
        </time>
        <p
          dangerouslySetInnerHTML={{
            __html: spoiler,
          }}
        />
      </div>
    </article>
  );
};

// TODO: 使用自己的 useVimShortcut 重构
const BlogIndex = ({ location, data, navigate }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const menuRef = useRef();
  const selectedIndex = useRef(+localStorage.getItem('selectedIndex') || -1);
  useEffect(() => {
    // FIXME: 是否需要改成 context，并将 keyboard 的事件抽出来？
    const index = selectedIndex.current;
    if (menuRef.current && !Number.isNaN(index) && index !== -1) {
      // @ts-ignore
      menuRef.current.firstChild.children[index].focus();
      localStorage.setItem('selectedIndex', null);
    }
  }, [menuRef]);

  const lastKey = useRef();
  const onKeyDownHandler = useCallback(
    e => {
      const key = e.key.toLowerCase();
      let index = selectedIndex.current;
      switch (key) {
        case 'tab': {
          e.preventDefault();
          break;
        }
        case 'arrowdown':
        case 'j': {
          if (index < posts.length - 1) selectedIndex.current = ++index;
          menuRef.current.firstChild.children[index].focus();
          break;
        }
        case 'arrowup':
        case 'k': {
          if (index < 1) return;
          selectedIndex.current = --index;
          menuRef.current.firstChild.children[index].focus();
          if (!index) {
            document.body.scrollIntoView();
          }
          break;
        }
        case 'g': {
          if (e.shiftKey) {
            selectedIndex.current = index = posts.length - 1;
          } else if (
            e.key === lastKey.current.key &&
            e.metaKey === lastKey.current.metaKey
          ) {
            selectedIndex.current = index = 0;
          }
          menuRef.current.firstChild.children[index].focus();
          break;
        }
        default:
          break;
      }
      lastKey.current = e;
    },
    [posts.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler);
    return () => {
      window.removeEventListener('keydown', onKeyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                    {...getItemProps({
                      key: node.fields.slug,
                      index,
                      onKeyDown(e) {
                        e.preventDefault();
                        const key = e.key.toLowerCase();
                        switch (key) {
                          case 'enter':
                          case ' ':
                            localStorage.setItem('selectedIndex', index);
                            navigate(
                              (location.pathname + blogUrl).replace(
                                /\/{2}/g,
                                '/'
                              )
                            );
                            break;
                          default:
                            break;
                        }
                      },
                      item: node.frontmatter,
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
