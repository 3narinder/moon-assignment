import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/authSlice";
import { NAV_LINKS, NAV_ICONS } from "@/constants";
import Button from "./custom/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartCount } = useSelector((state) => state.cart);
  const { loggedIn } = useSelector((state) => state.auth);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn !== "true") {
      router.push("/auth/login");
    }
  }, [loggedIn, router]);

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md py-5 lg:px-40 px-8 flex items-center justify-between z-50">
      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center z-50">
        <Image
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          src="/icons/Menu.png"
          alt="Icon_menu"
          width={20}
          height={20}
        />
      </div>

      {/* Logo */}
      <Link className="z-50" href="/">
        <Image src="/images/logo-full.png" alt="Logo" width={145} height={39} />
      </Link>

      {/* Desktop Navigation Links */}
      <div className="lg:flex  items-center gap-14 hidden ml-32">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-display-2 cursor-pointer transform transition duration-200 ease-in-out hover:scale-105"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center pt-32 gap-8 shadow-lg"
          >
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                className="text-display-2 text-black font-medium uppercase tracking-wide transform transition duration-200 ease-in-out hover:scale-105"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-1/3">
              <Button onClick={handleLogout} text="Logout" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Icons & Logout Button */}
      <div className="relative flex items-center gap-4">
        <div className="flex items-center gap-2">
          {NAV_ICONS.map((icon, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-center w-10 h-10 ${
                icon.alt !== "Cart" ? "hidden lg:flex" : "flex"
              }`}
              onClick={icon.alt === "Cart" ? handleCartClick : undefined}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={24}
                height={24}
                className="cursor-pointer"
              />
              {icon.alt === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-red-400 text-white text-display-1 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="lg:flex hidden">
          <Button onClick={handleLogout} text="Logout" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
