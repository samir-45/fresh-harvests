import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Fresh Harvests",
  description:
    "Learn about Fresh Harvests — our mission, sourcing, quality promise, and the people behind the store.",
};

function ValueCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-[#1B2032]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-gray-600">{desc}</p>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
      <div className="text-3xl font-extrabold text-[#1B2032]">{value}</div>
      <div className="mt-2 text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
              About Fresh Harvests
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#1B2032] sm:text-5xl">
              Fresh produce, delivered with care.
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Fresh Harvests is built to make everyday shopping for fruits and vegetables simple,
              fast, and reliable. From sourcing to delivery, the goal is to keep quality high and
              the experience smooth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Shop now
              </Link>
              <Link
                href="/#blog"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700"
              >
                Read our blog
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[#F6F7F9]">
              <Image
                src="/assets/images/Logo.png"
                alt="Fresh Harvests"
                fill
                className="object-contain p-10"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#EAF3DF] p-4">
                <p className="text-xs font-semibold text-[#6D9B3B]">Quality promise</p>
                <p className="mt-1 text-sm text-[#1B2032]">
                  Clean, fresh, and carefully packed.
                </p>
              </div>
              <div className="rounded-xl bg-orange-50 p-4">
                <p className="text-xs font-semibold text-orange-600">Fast checkout</p>
                <p className="mt-1 text-sm text-[#1B2032]">
                  Simple shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-extrabold text-[#1B2032]">Our story</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Fresh Harvests started with a simple idea: make fresh produce shopping feel as easy as
              ordering anything else online—without compromising on quality.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              The focus is on clarity (real product details), trust (consistent quality), and
              convenience (quick order-to-door workflow).
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-extrabold text-[#1B2032]">Mission & vision</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Mission: deliver fresh, affordable produce with a smooth online experience.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Vision: become the go-to place for everyday healthy groceries—backed by quality,
              transparency, and great service.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
            What we stand for
          </div>
          <h2 className="mt-3 text-4xl font-extrabold text-[#1B2032]">Our values</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            These values guide how products are selected, packed, and delivered.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            title="Freshness first"
            desc="Products are chosen with freshness in mind so you can cook and eat confidently."
          />
          <ValueCard
            title="Transparency"
            desc="Clear product info, pricing, and a consistent shopping experience."
          />
          <ValueCard
            title="Customer care"
            desc="Quick support and a service mindset from checkout to delivery."
          />
          <ValueCard
            title="Reliable delivery"
            desc="Smart packing and careful handling to reduce damage and waste."
          />
          <ValueCard
            title="Fair pricing"
            desc="Simple pricing that aims to stay affordable for everyday shopping."
          />
          <ValueCard
            title="Continuous improvement"
            desc="Feedback-driven updates to product quality, UI, and performance."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <h2 className="text-2xl font-extrabold text-[#1B2032]">How Fresh Harvests works</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-[#F6F7F9] p-6">
              <div className="text-sm font-semibold text-[#6D9B3B]">Step 01</div>
              <h3 className="mt-2 text-lg font-bold text-[#1B2032]">Pick your items</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Browse categories, view details, and add to cart.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F6F7F9] p-6">
              <div className="text-sm font-semibold text-[#6D9B3B]">Step 02</div>
              <h3 className="mt-2 text-lg font-bold text-[#1B2032]">Place your order</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Simple checkout flow designed for speed and clarity.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F6F7F9] p-6">
              <div className="text-sm font-semibold text-[#6D9B3B]">Step 03</div>
              <h3 className="mt-2 text-lg font-bold text-[#1B2032]">Packed & delivered</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Items are packed carefully to stay fresh and arrive safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (optional “trust” block) */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Curated categories" value="10+" />
          <Stat label="Quality checks" value="2x" />
          <Stat label="Customer-first support" value="24/7" />
          <Stat label="Fast browsing UX" value="A+" />
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          (Replace these stats later with real data from your dashboard/admin.)
        </p>
      </section>

      {/* Team */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-md bg-[#EAF3DF] px-3 py-1 text-xs font-semibold text-[#6D9B3B]">
            The people
          </div>
          <h2 className="mt-3 text-4xl font-extrabold text-[#1B2032]">Meet the team</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            A small team focused on quality sourcing, clean UI, and dependable service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Operations Lead", role: "Quality & packing" },
            { name: "Delivery Coordinator", role: "Logistics & timing" },
            { name: "Product Engineer", role: "Site & performance" },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#F6F7F9]" />
                <div>
                  <div className="font-bold text-[#1B2032]">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.role}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                Replace this with real team members later (photo, name, short bio).
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="rounded-3xl bg-[#1B2032] p-8 text-white">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold">Ready to shop fresh?</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Browse the shop and try your first order today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/shop"
                className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white"
              >
                Go to shop
              </Link>
              <a
                href="mailto:support@freshharvests.com"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-11/12 max-w-6xl py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <h2 className="text-2xl font-extrabold text-[#1B2032]">FAQ</h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-bold text-[#1B2032]">Do you guarantee freshness?</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                The goal is consistent freshness through careful selection and packing.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1B2032]">Where are you located?</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Add your real location/coverage area here (e.g., Dhaka).
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1B2032]">Can I return an item?</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Add your policy later; for now link to support email/WhatsApp.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1B2032]">How can I contact you?</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Add phone, WhatsApp, or a Contact page route when you’re ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
