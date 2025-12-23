"use client";

import Image from "next/image";

type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Exploring Seasonal Delights: A Guide to What's Fresh Right Now",
    date: "May 23, 2024",
    excerpt: "",
    image: "/assets/images/blog-1.png",
  },
  {
    id: 2,
    title:
      "Mastering Salad Creations: Tips and Tricks for Building Delicious and Nutritious Salads",
    date: "May 23, 2024",
    excerpt: "",
    image: "/assets/images/blog-2.png",
  },
  {
    id: 3,
    title:
      "The Art of Meal Prepping: How to Save Time and Eat Healthy Throughout the Week",
    date: "May 23, 2024",
    excerpt: "",
    image: "/assets/images/blog-3.png",
  },
];

export default function BlogSection() {
  return (
    <section className="relative mx-auto w-11/12 py-16">
      {/* floating leaves */}
      <div className="pointer-events-none absolute left-10 top-20 hidden h-10 w-10 lg:block">
        <Image
          src="/assets/images/leaf-1.png"
          alt=""
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>
      <div className="pointer-events-none absolute right-14 top-24 hidden h-10 w-10 lg:block">
        <Image
          src="/assets/images/leaf-2.png"
          alt=""
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>

      {/* header */}
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
          Our Blog
        </div>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1B2032]">
          Fresh Harvest Blog
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
          Welcome to the Fresh Harvest Blog, your go-to resource for all things
          related to fresh produce, healthy eating, and culinary inspiration.
        </p>
      </div>

      {/* cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[18px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(min-width: 1024px) 320px, 100vw"
              />
            </div>

            <div className="mt-4 text-xs text-gray-400">{post.date}</div>

            <h3 className="mt-1 text-[15px] font-semibold leading-6 text-[#1B2032]">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="mt-1 text-sm text-gray-500">{post.excerpt}</p>
            )}

            <button
              type="button"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#F28C28]"
            >
              Read More
              <span className="ml-1 text-base">➜</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
