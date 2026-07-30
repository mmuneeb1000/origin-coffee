import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "../../components/store/Header";
import Footer from "../../components/store/Footer";
import { Button, Input, Textarea } from "../../components/common";

export default function Contact() {
  return (
    <main className="bg-stone-50 mt-20 ">
      <Header />
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-amber-100">
            Have a question, feedback, or want to place a special order? Get in
            touch and our team will be happy to help.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <MapPin size={26} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-stone-900">
                Visit Us
              </h3>

              <p className="mt-2 text-stone-600">
                123 Coffee Street
                <br />
                Islamabad, Pakistan
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <Phone size={26} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-stone-900">
                Phone
              </h3>

              <p className="mt-2 text-stone-600">+92 300 1234567</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <Mail size={26} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-stone-900">
                Email
              </h3>

              <p className="mt-2 text-stone-600">hello@origincoffee.com</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <Clock size={26} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-stone-900">
                Opening Hours
              </h3>

              <div className="mt-3 space-y-2 text-stone-600">
                <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
                <p>Saturday: 9:00 AM - 11:00 PM</p>
                <p>Sunday: 9:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-stone-900">
              Send a Message
            </h2>

            <p className="mt-2 text-stone-500">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Full Name" placeholder="John Doe" required />

                <Input label="Phone Number" placeholder="+92 300 1234567" />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                required
              />

              <Input label="Subject" placeholder="How can we help?" required />

              <Textarea
                label="Message"
                rows={6}
                placeholder="Write your message..."
                required
              />

              <Button type="submit" icon={Send} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <iframe
              title="Origin Coffee Location"
              src="https://www.google.com/maps?q=Indianapolis,Indiana&output=embed"
              className="h-[450px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
