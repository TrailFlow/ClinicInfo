import PostCard from "@/components/PostCard";

export default function BlogCard({ post, priority = false, index = 0 }) {
  return <PostCard post={post} priority={priority} index={index} />;
}
