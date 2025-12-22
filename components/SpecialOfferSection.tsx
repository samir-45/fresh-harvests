"use client";

import Image from "next/image";

function TimeBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="w-[78px] rounded-xl border border-gray-200 bg-white/85 px-3 py-3 text-center shadow-sm backdrop-blur">
            <div className="text-[26px] font-extrabold leading-none text-[#1B2032]">
                {value}
            </div>
            <div className="mt-1 text-[12px] text-gray-500">{label}</div>
        </div>
    );
}

export default function SpecialOfferSection() {
    // demo values (later তুমি real countdown বসাবে)
    const dd = "03";
    const hh = "18";
    const mm = "54";
    const ss = "21";

    return (
        <section className="mx-auto py-10">
            <div className="relative py-10 overflow-hidden">
                {/* 1) Texture bg (full ground) */}
                <div className="absolute inset-0 bg-[url('/assets/images/texture.png')] bg-no-repeat bg-cover bg-center" />


                {/* 2) soft overlay to match screenshot */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-white/20" />

                {/* 3) Bottom-left doodle */}
                <div className="pointer-events-none absolute bottom-1 left-1  opacity-80">
                    <Image
                        src="/assets/images/doodle-2.png" // <-- bottom-left doodle
                        alt=""
                        width="500"
                        height="500"
                        className="w-120% h-auto"
                        priority
                    />
                </div>

                {/* 4) Top-right doodle */}
                <div className="pointer-events-none absolute top-1 right-1  opacity-80">
                    <Image
                        src="/assets/images/doodle-1.png" // <-- bottom-left doodle
                        alt=""
                        width="500"
                        height="500"
                        className="w-120% h-auto"
                        priority
                    />
                </div>


                {/* 5) Leaves (3) */}
                <div className="pointer-events-none absolute top-3 right-[26%] h-20 w-20 rotate-[-12deg]">
                    <Image src="/assets/images/leaf-1.png" alt="" fill className="object-contain" sizes="40px" />
                </div>
                <div className="pointer-events-none absolute -bottom-12 -left-10 h-28 w-28 rotate-[-12deg] opacity-90">
                    <Image src="/assets/images/leaf-3.png" alt="" fill className="object-contain" sizes="112px" />
                </div>
                <div className="pointer-events-none absolute -bottom-14 -right-10 h-32 w-32 rotate-[10deg] opacity-90">
                    <Image src="/assets/images/leaf-2.png" alt="" fill className="object-contain" sizes="128px" />
                </div>

                {/* CONTENT */}
                <div className="relative grid items-center gap-8 px-8 py-10 md:px-10 lg:grid-cols-2">
                    {/* LEFT text */}
                    <div className="max-w-xl">
                        <div className="inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
                            Special Offer
                        </div>

                        <h2 className="mt-4 text-[44px] font-extrabold leading-[1.05] tracking-tight text-[#1B2032]">
                            Seasonal Fruit Bundle
                        </h2>

                        <p className="mt-3 text-[22px] font-semibold text-[#1B2032]">
                            Discount up to <span className="text-[#F28C28]">80% OFF</span>
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <TimeBox value={dd} label="Days" />
                            <TimeBox value={hh} label="Hour" />
                            <TimeBox value={mm} label="Min" />
                            <TimeBox value={ss} label="Second" />
                        </div>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F7A3E] px-6 py-3 text-white shadow-sm">
                            <span className="text-sm font-semibold">CODE :</span>
                            <span className="text-sm font-extrabold text-[#F5C542]">FRESH28</span>
                        </div>
                    </div>

                    {/* RIGHT fruits */}
                    <div className="relative">
                        <div className="relative mx-auto h-[260px] w-full max-w-[540px] md:h-[310px]">
                            <Image
                                src="/assets/images/fruits.png" // <-- fruits image
                                alt="Fruits"
                                fill
                                className="object-contain"
                                sizes="540px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
