import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "/coffee.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="mt-24 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-700 text-white">
                <img src={Logo} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">Origin Coffee</h2>

                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Freshly Brewed
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-stone-400">
              Premium coffee, handcrafted beverages, and freshly baked treats.
              Every cup is prepared with care using quality ingredients.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="transition hover:text-amber-400">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition hover:text-amber-400"
                >
                  Categories
                </a>
              </li>

              <li>
                <a href="#menu" className="transition hover:text-amber-400">
                  Menu
                </a>
              </li>

              <li>
                <a href="#about" className="transition hover:text-amber-400">
                  About
                </a>
              </li>

              <li>
                <Link to="/login" className="transition hover:text-amber-400">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-1 text-amber-500" size={18} />

                <span>Indianapolis, Indiana</span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 text-amber-500" size={18} />

                <span>+1 XXX XXX XXXX</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 text-amber-500" size={18} />

                <span>hello@origincoffee.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Opening Hours
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="mt-1 text-amber-500" size={18} />

                <div>
                  <p>Monday - Friday</p>
                  <p className="text-stone-500">8:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-1 text-amber-500" size={18} />

                <div>
                  <p>Saturday - Sunday</p>
                  <p className="text-stone-500">9:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-sm text-stone-500 md:flex-row">
          <p>© {year} Origin Coffee. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-amber-400">
              Terms
            </a>

            <a href="#" className="hover:text-amber-400">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
