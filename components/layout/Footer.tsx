import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 ">

                <nav className='h-full flex flex-col justify-between'>
                    {/* logo */}
                    <div className="navbar-start w-full">
                        <Link href="/" className="text-xl gap-2 flex items-center w-full">
                            <div>
                                <Image
                                    src="/assets/images/Logo.png"
                                    alt="Fresh Harvests Logo"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <span className='text-2xl font-semibold w-fit'>Fresh Harvests</span>
                        </Link>
                    </div>

                    {/* -------------------------------- */}
                    {/* Download App Section */}
                    <div>
                        <p className="text-fresh-dark font-semibold">Download App:</p>
                        {/* App Store buttons */}
                        <div className="mt-5 flex flex-col sm:flex-row text-white md:justify-start items-center gap-4">
                            <Link
                                href="#"
                                className="flex w-full sm:w-fit items-center gap-2 bg-black px-3 py-2 rounded-lg  "
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
                </nav>

                <nav className='space-y-3'>
                    <h6 className="footer-title">Quick links 1</h6>
                    <Link href="/" className="link link-hover text-[#4A4A52]">Home</Link>
                    <Link href="/shop" className="link link-hover text-[#4A4A52]">Shop</Link>
                    <Link href="/about" className="link link-hover text-[#4A4A52]">About us</Link>
                    <Link href="/blog" className="link link-hover text-[#4A4A52]">Blog</Link>
                    <Link href="/blog-detail" className="link link-hover text-[#4A4A52]">Detail Blog</Link>
                </nav>
                <nav className='space-y-3'>
                    <h6 className="footer-title">Quick links 2</h6>
                    <Link href="/favorites" className="link link-hover text-[#4A4A52]">Favorites</Link>
                    <Link href="/cart" className="link link-hover text-[#4A4A52]">Cart</Link>
                    <Link href="/signin" className="link link-hover text-[#4A4A52]">Sign in</Link>
                    <Link href="/register" className="link link-hover text-[#4A4A52]">Register</Link>
                </nav>
                <nav className='space-y-3'>
                    <h6 className="footer-title">Contact us</h6>
                    <Link href="/terms" className="link link-hover flex items-center gap-2 text-[#4A4A52]">
                        <Image src="/assets/icons/call.svg" alt="Phone Icon" width={16} height={16}></Image>
                        1234 5678 90
                    </Link>
                    <Link href="/terms" className="link link-hover flex items-center gap-2 text-[#4A4A52]">
                        <Image src="/assets/icons/mail.svg" alt="Phone Icon" width={16} height={16}></Image>
                        Freshharvests@gmail.com
                    </Link>
                    <Link href="/terms" className="link link-hover flex items-center gap-2 text-[#4A4A52]">
                        <Image src="/assets/icons/map.svg" alt="Phone Icon" width={16} height={16}></Image>
                        Tanjung Sari Street, Pontianak, Indonesia
                    </Link>

                    <div>
                        <p className="text-fresh-dark font-semibold">Accepted Payment Methods:</p>
                        {/* App Store buttons */}
                        <div className="mt-5 flex flex-row text-white md:justify-start items-center gap-4">
                            <Image src="/assets/images/visa.jpg" alt="visa Logo" width={85} height={85}></Image>
                            <Image src="/assets/images/paypal.jpg" alt="paypal Logo" width={85} height={85}></Image>
                            <Image src="/assets/images/ApplePay.jpg" alt="ApplePay Logo" width={85} height={85}></Image>
                        </div>
                    </div>

                </nav>
            </footer>
            <footer className="footer bg-base-200 text-base-content flex flex-col sm:flex-row justify-center items-center sm:items-start sm:justify-between border-base-300 border-t px-10 py-4">

                <p>
                    © Copyright 2024, All Rights Reserved by Banana Studio
                </p>

                <nav className="">
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer
