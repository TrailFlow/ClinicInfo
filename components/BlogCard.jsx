import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post, priority = false }) {
  return (
    <article className="overflow-hidden rounded-[6px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 sm:aspect-[16/8]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            className="object-cover"
          />
        </div>
        <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
          <span className="text-[14px] font-semibold leading-6 text-[#005bb7] sm:text-[16px]">
            {post.category}
          </span>
          <h2 className="line-clamp-3 mt-3 text-[18px] font-semibold leading-[1.32] text-[#001f42] sm:text-[20px] lg:text-[22px]">
            {post.title}
          </h2>
        </div>
      </Link>
      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        <p className="text-[13px] font-semibold leading-6 text-[#005bb7] sm:text-[14px]">
          <Link
            href={`/author/${post.authorSlug}`}
            className="hover:text-[#001f42]"
          >
            {post.author}
          </Link>{" "}
          / {post.date}
        </p>
        <Link href={`/blog/${post.slug}`} className="block">
          {/* <p className="line-clamp-3 mt-3.5 text-[17px] leading-[1.55] text-[#001f42]">
            {post.excerpt}
          </p> */}
        </Link>
      </div>
    </article>
  );
}
