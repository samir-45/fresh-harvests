import Image from 'next/image'
import Navbar from './Navbar'
import SpecialOfferCard from '../SpecialOfferCard'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <main className="min-h-screen w-full bg-fresh-cream relative overflow-hidden">
            <div className='z-50 relative w-11/12 mx-auto'>
                <Navbar />
            </div>

            {/* Background Texture Overlay (Optional: if your texture is a pattern image) */}
            <div className="absolute inset-0 bg-[url('/assets/bg/paper/texture.png')] opacity-50 mix-blend-multiply pointer-events-none"

            ></div>

            {/* The Solid Green Right Section Background */}
            <div className="absolute top-0 right-0 w-[30%] lg:w-[35%] h-full bg-[#749B3F] z-0  ">
                <div className="absolute inset-0 bg-[url('/assets/images/green-pattern-doodle.png')] opacity-100 mix-blend-overlay"></div>
            </div>

            {/* Leaves */}
            <div className="absolute top-24 left-[-2%] w-16 h-16 z-10 pointer-events-none">
                <Image src="/assets/images/leaf-1.png" alt="" fill className="object-contain rotate-12" />
            </div>
            <div className="absolute top-16 left-[55%] w-12 h-12 z-10 pointer-events-none">
                <Image src="/assets/images/leaf-2.png" alt="" fill className="object-contain -rotate-12" />
            </div>

            {/* Hero Content Grid */}
            <section className="w-11/12 mx-auto px-4 sm:px-8 py-12 z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* --- Left Column (Text Content) --- */}
                    <div className="md:col-span-7 lg:col-span-6 sm:pb-40">
                        {/* Welcome Badge */}
                        <span className="inline-block bg-[#759b3f27]  text-[#749B3F] font-bold px-4 py-1.5 rounded-lg mb-6">
                            Welcome to Fresh Harvest
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl relative lg:text-7xl font-bold text-fresh-dark leading-[1.1] mb-6">
                            Fresh Fruits and Vegetables
                        </h1>

                        {/* Subtext */}
                        <p className="text-fresh-gray text-lg relative max-w-lg leading-relaxed">
                            At Fresh Harvests, we are passionate about providing you with the freshest and most flavorful fruits and vegetables.
                        </p>

                        {/* CTA Button & Special Offer Container */}
                        <div className="relative mb-16 mt-8">
                            <button className="bg-[#FF6A1A] text-white text-lg font-bold px-10 py-4 rounded-xl shadow-lg shadow-fresh-orange/30 hover:bg-fresh-orange-dark transition-transform hover:-translate-y-1">
                                Shop Now
                            </button>

                            {/* Floating Special Offer Card Component */}
                            <SpecialOfferCard />

                        </div>

                        {/* Download App Section */}
                        <div className='absolute bottom-4  z-50  mt-20 pt-10 sm:pt-0'>
                            <p className="text-fresh-dark font-medium">Download App:</p>
                            {/* App Store buttons */}
                            <div className="mt-5 flex flex-row text-white md:justify-start items-center gap-4">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 bg-black px-3 py-2 rounded-lg  "
                                >
                                    <Image
                                        src="/assets/icons/Apple.svg"
                                        alt="Download on the App Store"
                                        width={25}
                                        height={25}
                                    />
                                    <div className="text-left">
                                        <p className="text-[12px] font-thin">Download on the</p>
                                        <p className="font-bold text-lg sm:text-xl">App Store</p>
                                    </div>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 bg-black px-3 py-2 rounded-lg  "
                                >
                                    <Image
                                        src="/assets/icons/Playstore.svg"
                                        alt="Download on Google Play"
                                        width={25}
                                        height={25}
                                    />
                                    <div className="text-left">
                                        <p className="text-[12px] font-thin">Download on the</p>
                                        <p className="font-bold text-lg sm:text-xl">Google Play</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* --- Right Column (Hero Image) --- */}
                    <div className="md:col-span-5 lg:col-span-6 -right-10 -bottom-16 relative sm:absolute mt-12 md:mt-0">
                        <Image
                            src="/assets/images/girl-basket.png"
                            alt="Girl holding fresh vegetable crate"
                            width={520}
                            height={680}
                            priority
                            className="h-auto w-sm md:w-lg max-w-none ml-auto bottom-0 "
                        />
                    </div>

                </div>
            </section>
        </main>

    )
}

export default HeroSection
