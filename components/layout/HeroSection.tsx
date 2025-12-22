import Image from 'next/image'
import Navbar from './Navbar'

const HeroSection = () => {
    return (
        <main className="min-h-screen w-full bg-fresh-cream relative overflow-hidden">
            <div className='z-50 relative'>
                <Navbar />
            </div>

            {/* Background Texture Overlay (Optional: if your texture is a pattern image) */}
            <div className="absolute inset-0 bg-[url('/assets/bg/paper/texture.png')] opacity-50 mix-blend-multiply pointer-events-none"

            ></div>

            {/* The Solid Green Right Section Background */}
            <div className="absolute top-0 right-0 w-[30%] lg:w-[35%] h-full bg-[#749B3F] z-0  ">
                {/* Optional: Green doodle pattern overlay */}
                <div className="absolute inset-0 bg-[url('/assets/images/green-pattern-doodle.png')] opacity-100 mix-blend-overlay"></div>
            </div>

            {/* Decorative Floating Leaves */}
            <div className="absolute top-24 left-[-2%] w-16 h-16 z-10 pointer-events-none">
                <Image src="/assets/images/leaf-1.png" alt="" fill className="object-contain rotate-12" />
            </div>
            <div className="absolute top-16 left-[55%] w-12 h-12 z-10 pointer-events-none">
                <Image src="/assets/images/leaf-2.png" alt="" fill className="object-contain -rotate-12" />
            </div>

            {/* Hero Content Grid */}
            <section className="max-w-container mx-auto px-4 sm:px-8   relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* --- Left Column (Text Content) --- */}
                    <div className="md:col-span-7 lg:col-span-6 relative">
                        {/* Welcome Badge */}
                        <span className="inline-block bg-fresh-green-light text-fresh-green-dark font-medium px-4 py-2 rounded-lg mb-6">
                            Welcome to Fresh Harvest
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl lg:text-7xl font-bold text-fresh-dark leading-[1.1] mb-6">
                            Fresh Fruits and Vegetables
                        </h1>

                        {/* Subtext */}
                        <p className="text-fresh-gray text-lg  max-w-lg leading-relaxed">
                            At Fresh Harvests, we are passionate about providing you with the freshest and most flavorful fruits and vegetables.
                        </p>

                        {/* CTA Button & Special Offer Container */}
                        <div className="relative mb-16">
                            <button className="bg-fresh-orange text-white text-lg font-bold px-10 py-4 rounded-xl shadow-lg shadow-fresh-orange/30 hover:bg-fresh-orange-dark transition-transform hover:-translate-y-1">
                                Shop Now
                            </button>

                            {/* Floating Special Offer Card Component */}
                            {/* <SpecialOfferCard /> */}

                        </div>

                        {/* Download App Section */}
                        <div>
                            <p className="text-fresh-dark font-medium mb-4">Download App:</p>
                            <div className="flex items-center gap-4">
                                <button className="hover:opacity-80 transition-opacity">
                                    {/* Replace with actual App Store image */}
                                    <Image src="/images/app-store-btn.png" alt="Download on App Store" width={140} height={45} />
                                </button>
                                <button className="hover:opacity-80 transition-opacity">
                                    {/* Replace with actual Google Play image */}
                                    <Image src="/images/google-play-btn.png" alt="Get it on Google Play" width={140} height={45} />
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* --- Right Column (Hero Image) --- */}
                    <div className="md:col-span-5 lg:col-span-6 bottom-0 md:-bottom-20 lg:bottom-0 relative mt-12 md:mt-0">
                        <Image
                            src="/assets/images/girl-basket.png"
                            alt="Girl holding fresh vegetable crate"
                            width={520}
                            height={680}
                            priority
                            className="h-auto w-10/12 md:w-10/12 max-w-none ml-auto bottom-0 translate-x-[calc(12vw-12%)] sm:translate-x-[calc(5vw-5%)]"
                        />
                    </div>

                </div>
            </section>
        </main>

    )
}

export default HeroSection
