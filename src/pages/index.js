import Downshift from 'downshift';
import Link from 'next/link';
import { getAllPosts } from './lib/api';
import React from 'react';
import config from '../config';

import Layout from '../templates/Layout';
import { rhythm } from '../utils/typography';

const BlogNav = ({ href, title, date, spoiler }) => {
  return (
    <article>
      <h3
        className="blog-index"
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link
          tabIndex={-1}
          style={{ boxShadow: 'none' }}
          href={href}
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
const BlogIndex = ({ posts }) => {
  return (
    <Layout title={config.title}>
      <Downshift
        defaultIsOpen
        initialIsOpen
        itemToString={(item) => (item ? item.title : '')}
      >
        {({ getMenuProps, getItemProps }) => (
          <ol {...getMenuProps({}, { suppressRefError: true })}>
            {posts.map((post, index) => {
              const blogUrl = post.fields.slug;
              const { title = blogUrl, spoiler, date } = post.frontmatter;
              return (
                <li
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                  {...getItemProps({
                    key: post.fields.slug,
                    index,
                    item: post.frontmatter,
                  })}
                >
                  <BlogNav
                    href={blogUrl}
                    title={title}
                    date={date}
                    spoiler={spoiler || post.excerpt}
                  />
                </li>
              );
            })}
          </ol>
        )}
      </Downshift>
    </Layout>
  );
};
export default BlogIndex;

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'spoiler', 'image']);
  return {
    props: { posts },
  };
}
