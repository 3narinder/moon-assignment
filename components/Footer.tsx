"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FOOTER_LINKS } from "@/constants";
import Button from "./custom/Button";

const Footer = () => {
  return (
    <footer className="bg-warm-black text-neutral-3 lg:px-40 ">
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-8 items-start justify-between py-10 lg:relative">
        {/* logo */}
        <div className="lg:w-2/5 w-full lg:px-20 md:px-12 px-6 text-neutral-2">
          <Image
            src="/images/logo-full-light.png"
            alt="logo"
            width={145}
            height={38}
            className="mb-4"
          />

          <p className="text-display-2 mb-8 lg:w-full w-3/4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            mauris sed ma
          </p>

          <Button text="Get started" variant="footer" />
        </div>

        {/* Full-height divider */}
        <div className="lg:flex  hidden absolute left-1/2 transform -translate-x-20 top-0 bottom-0 w-[1px] bg-neutral-2"></div>

        <div className="lg:w-3/5 w-full grid lg:grid-cols-3 grid-cols-2 gap-8 lg:px-20 md:px-12 px-6 border-neutral-2">
          {FOOTER_LINKS.map((category, index) => (
            <div key={index}>
              <h3 className="text-display-3 font-semibold mb-6 text-white">
                {category.title}
              </h3>
              <ul className="text-neutral-2 text-display-1 flex flex-col gap-4">
                {category.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-neutral-5 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-2 py-8 text-center text-display-1">
        Copyright © 2023 Moon| All Rights Reserved | Terms and Conditions |
        Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
