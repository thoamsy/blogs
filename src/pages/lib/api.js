import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const postsDirectory = join(process.cwd(), 'src/_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  if (slug.endsWith('.DS_Store')) {
    return;
  }
  const fullPath = join(postsDirectory, slug, './index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let date = format(parseISO('' + data.date), 'yyyy/MM/dd');

  return {
    fields: {
      slug,
    },
    content,
    frontmatter: {
      ...data,
      date,
    },
  };
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter(Boolean)
    // sort posts by date in descending order
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? '-1' : '1'
    );
  return posts;
}
