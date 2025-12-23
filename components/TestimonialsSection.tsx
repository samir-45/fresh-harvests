"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  avatarSrc: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jane Doe",
    role: "Professional chef",
    message:
      "I absolutely love Fresh Harvest! The quality of their produce is outstanding. It's always fresh, flavorful, and delicious. The convenience of ordering online and having it delivered to my doorstep saves me so much time. Fresh Harvest has become my go-to for all my fruit and vegetable needs.",
    avatarSrc: "/assets/images/user.png",
  },
  {
    name: "John Smith",
    role: "Home cook",
    message:
      "Fresh Harvest makes shopping easy. Great variety, fair pricing, and super quick delivery. The produce quality has been consistently excellent.",
    avatarSrc: "/assets/images/user.png",
  },
  {
    name: "Sara Ali",
    role: "Nutritionist",
    message:
      "Reliable quality and freshness. Perfect for meal planning and healthy eating routines. Love the packaging and delivery experience.",
    avatarSrc: "/assets/images/user.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative mx-auto w-11/12 py-16">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
          Testimonial
        </div>

        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1B2032]">
          What Our Customers Say
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
          Don&apos;t just take our word for it—here&apos;s what some of our customers have to
          say about their experience with Fresh Harvest:
        </p>
      </div>

      {/* Slider */}
      <div className="mt-12">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="items-center gap-2 grid md:grid-cols-3 px-5 place-items-center justify-between">
                {/* avatar */}
                <div className="flex mx-auto w-full justify-center lg:justify-start">
                  <div className="relative h-[360px] w-[260px] overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src={t.avatarSrc}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="260px"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                {/* quote card */}
                <div className="relative md:col-span-2 pb-7 md:pb-0">
                  {/* orange quote marks */}
                  <div className="pointer-events-none absolute -left-3 -top-6 hidden h-10 w-10 lg:block">
                    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <path
                        d="M12 36c0-12 6-20 16-24v8c-6 3-8 8-8 16h8v16H12V36Zm24 0c0-12 6-20 16-24v8c-6 3-8 8-8 16h8v16H36V36Z"
                        fill="#F28C28"
                        opacity="0.95"
                      />
                    </svg>
                  </div>

                  <div className="rounded-2xl bg-[#F4F6F6] p-7 ">
                    <p className="text-sm leading-7 text-gray-600">
                      &quot;{t.message}&quot;
                    </p>

                    <div className="mt-6 text-sm">
                      <span className="font-semibold text-[#1B2032]">{t.name}</span>
                      <span className="text-gray-500"> - {t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db; /* gray-300 */
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #6d9b3b;
        }
      `}</style>
    </section>
  );
}
