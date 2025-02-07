"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  {
    label: "Developers",
    href: "#",
  },
  {
    label: "Documentation",
    href: "https://docs.ductape.app/",
  },
  {
    label: "Pricing",
    href: "#",
  },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // make menu full screen
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  return (
    <header className="max-w-[1344px] mx-auto relative py-2.5">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.svg" width={129} height={44} alt="logo" />
        </Link>
        <ul className="items-center text-grey font-medium hidden lg:flex">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="px-6 py-4">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              src={
                isMenuOpen ? "/images/close-menu.svg" : "/images/hamburger.svg"
              }
              alt={isMenuOpen ? "Close menu" : "Open menu"}
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 font-semibold">
          <a
            href="https://cloud.ductape.app/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4"
          >
            Login
          </a>
          <a
            href="https://www.npmjs.com/package/ductape-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary rounded-full px-6 py-4 flex items-center gap-4 text-white font-semibold"
          >
            <Image src="/images/ductape.svg" width={24} height={24} alt="cta" />
            Download Ductape
          </a>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="absolute w-auto left-0 right-0 z-10 items-start gap-6 lg:hidden flex flex-col -mx-4 px-4 py-8 bg-white h-[calc(100dvh)]">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
          <div className="flex flex-col items-start gap-3 font-semibold">
            <Link href="/auth/login" className="py-4">
              Login
            </Link>
            <a
              href="https://www.npmjs.com/package/ductape-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary rounded-full px-6 py-4 flex items-center gap-4 text-white font-semibold"
            >
              <Image
                src="/images/github-white.svg"
                width={24}
                height={24}
                alt="cta"
              />
              Download Ductape
            </a>
          </div>
        </ul>
      )}
    </header>
  );
}
