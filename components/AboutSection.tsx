import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="mx-auto w-11/12 py-16 pb-24">
            <div className="grid items-center gap-20 sm:gap-10 lg:grid-cols-2">
                {/* LEFT: Illustration + overlays */}
                <div className="relative">
                    {/* main illustration */}
                    <div className="relative mx-auto aspect-[6/5] w-full max-w-11/12">
                        <Image
                            src="/assets/images/grocery-boy.png"   // <-- তোমার illustration path দাও
                            alt="Fresh Harvests about illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* top badge: Fresh Harvests */}
                    <div className="absolute left-[52%] top-[58%] -translate-x-1/2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/images/Logo.png"
                                alt="Fresh Harvests Logo"
                                width={28}
                                height={28}
                            />
                            <span className="text-sm font-semibold text-gray-900">
                                Fresh Harvests
                            </span>
                        </div>
                    </div>

                    {/* floating mini product card */}
                    <div className="absolute left-[60%] sm:left-[62%] top-[70%] w-4/12 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.12)]">
                        <div className="rounded-2xl bg-gray-50 p-3">
                            <div className="relative mx-auto h-[70px] w-[110px]">
                                <Image
                                    src="/assets/images/letus.png"
                                    alt="letus"
                                    fill
                                    className="object-contain object-center"
                                    sizes="110px"
                                />
                            </div>
                        </div>

                        <div className="mt-3 text-center">
                            <p className="text-[12px] font-semibold text-gray-900">Mushroom</p>
                            <p className="mt-0.5 text-[11px] text-gray-500">$2.3/kg</p>

                            <button
                                className="mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 text-[12px] font-medium text-gray-700"
                                type="button"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>

                    {/* small leaf (optional) */}
                    <div className="absolute left-[70%] top-[5%] h-10 w-10 opacity-90">
                        <Image
                            src="/assets/images/leaf-2.png" // <-- optional
                            alt="Leaf"
                            fill
                            className="object-contain"
                            sizes="40px"
                        />
                    </div>
                </div>

                {/* RIGHT: Content */}
                <div className="max-w-xl">
                    <div className="inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-medium text-[#74A23A]">
                        About us
                    </div>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900">
                        About Fresh Harvest
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-500">
                        Welcome to Fresh Harvest, your premier destination for high-quality and
                        fresh produce. We are passionate about providing you with the finest
                        fruits, vegetables, and salad ingredients to nourish your body and
                        delight your taste buds. With a commitment to excellence, sustainability,
                        and customer satisfaction, Fresh Harvest is here to revolutionize your
                        grocery shopping experience.
                    </p>

                    <button
                        type="button"
                        className="mt-7 inline-flex items-center justify-center rounded-xl border border-orange-400 bg-white px-6 py-3 text-sm font-semibold text-orange-500 shadow-sm hover:bg-orange-50"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </section>
    );
}
