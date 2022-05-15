import React from "react";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Jobs", href: "/jobs" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms and Conditions", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <nav
        className="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        {navigation.main.map((item) => (
          <div key={item.name} className="px-5 py-2">
            <Link href={item.href} scroll={false}>
              <a
                className="text-base text-gray-500 hover:text-gray-900
            dark:text-gray-400 dark:hover:text-gray-100"
              >
                {item.name}
              </a>
            </Link>
          </div>
        ))}
      </nav>
      <div className="mt-8 flex justify-center space-x-6">
        <a
          href="https://twitter.com/bbrevengetour"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter className="h-8 w-8 text-[#00acee] dark:text-gray-50" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer">
          <FaFacebook className="h-8 w-8 text-[#3b5998] dark:text-gray-50" />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
          <FaInstagram className="h-8 w-8 text-[#8a3ab9] dark:text-gray-50" />
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <FaTiktok className="h-8 w-8 text-gray-900 dark:text-gray-50" />
        </a>
      </div>
      <p className="mt-8 text-center text-base">
        &copy; 2022 Buffalo Bills Revenge Tour. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
