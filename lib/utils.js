export function sortPosts(posts, sortBy) {
  if (sortBy === "latest") {
    return [...posts].sort(
      (a, b) => new Date(b.isoDate) - new Date(a.isoDate),
    );
  }
  if (sortBy === "popular") {
    return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));
  }
  if (sortBy === "az") {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }
  return posts;
}
