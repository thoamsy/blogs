import React, { useEffect } from 'react';
import { getPostBySlug, getAllPosts } from './lib/api';
import remark from 'remark';
import html from 'remark-html';
import { rhythm, scale } from '../utils/typography';
import Layout from '../components/Layout';
import Bio from '../components/Bio';
import PageNavigation from '../components/PageNavigation';

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const Post = ({ location, pageContext, post }) => {
  const { title: postTitle, spoiler, image } = post.frontmatter || {};

  useEffect(() => {
    const homePageTitle = '😏';
    document.title = `${homePageTitle} ${postTitle}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <header>
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
      </header>

      <article
        className="content"
        style={{ fontSize: rhythm(0.6) }}
        dangerouslySetInnerHTML={{ __html: post.content }}
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

export default Post;

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'image',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.fields.slug,
        },
      };
    }),
    fallback: false,
  };
}
