import postsData from './posts.json';

export const POSTS_PER_PAGE = 10;
export const posts = postsData;

export function getTotalPages(perPage = POSTS_PER_PAGE) {
  return Math.ceil(posts.length / perPage);
}

export function getAuthors() {
  return Array.from(
    new Map(
      posts.map((post) => [
        post.authorSlug,
        {
          name: post.author,
          slug: post.authorSlug
        }
      ])
    ).values()
  );
}

export function getAuthorBySlug(authorSlug) {
  return getAuthors().find((author) => author.slug === authorSlug);
}

export function getPostsByAuthor(authorSlug) {
  return posts.filter((post) => post.authorSlug === authorSlug);
}

export function getPagePath(page) {
  return page === 1 ? "/" : `/page/${page}`;
}

export function getPaginatedPosts(page = 1, perPage = POSTS_PER_PAGE) {
  return paginatePosts(posts, page, perPage);
}

export function getPaginatedAuthorPosts(
  authorSlug,
  page = 1,
  perPage = POSTS_PER_PAGE
) {
  return paginatePosts(getPostsByAuthor(authorSlug), page, perPage);
}

export function paginatePosts(postList, page = 1, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.ceil(postList.length / perPage);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    posts: postList.slice(start, start + perPage),
    totalPages,
    currentPage
  };
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getPostNavigation(slug) {
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  };
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  const otherPosts = posts.filter((post) => post.slug !== currentSlug);
  const related = otherPosts.filter((post) => post.category === currentPost.category);
  
  if (related.length < limit) {
    const additionalPosts = otherPosts.filter((post) => post.category !== currentPost.category);
    related.push(...additionalPosts.slice(0, limit - related.length));
  }
  
  return related.slice(0, limit);
}
