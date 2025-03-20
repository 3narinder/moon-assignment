import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/authSlice";
import { NAV_LINKS, NAV_ICONS } from "@/constants";
import Button from "./custom/Button";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartCount } = useSelector((state) => state.cart);
  const { loggedIn } = useSelector((state) => state.auth);

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
    router.push("/cart"); // Navigate to the Cart page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md py-5 px-40 flex items-center justify-between z-50">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo-full.png" alt="Logo" width={145} height={39} />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-14">
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

      {/* Navigation Icons */}
      <div className="relative flex items-center gap-8">
        <div className="flex items-center gap-2">
          {NAV_ICONS.map((icon, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-10 h-10"
              onClick={icon.alt === "Cart" ? handleCartClick : undefined} // Handle cart click
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={24}
                height={24}
                className="cursor-pointer"
              />
              {/* Cart Badge */}
              {icon.alt === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-red-400 text-white text-display-1 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleLogout} text="Logout" />
      </div>
    </nav>
  );
};

export default Navbar;
