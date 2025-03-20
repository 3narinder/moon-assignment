"use client";

import Button from "@/components/custom/Button";
import InputField from "@/components/custom/InputField";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user found. Please sign up.");
      return;
    }

    const userData = JSON.parse(storedUser);
    userData.password = newPassword;

    localStorage.setItem("user", JSON.stringify(userData));

    router.push("/auth/login");
  };

  return (
    <section className="flex items-center">
      {/* Left Side: Image Section */}
      <div className="lg:w-3/5 lg:block hidden">
        <div className="relative h-screen">
          <div className="absolute inset-0 bg-binge-peach opacity-5 z-10" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#FFDAB9] to-transparent mix-blend-multiply z-20" />

          <Image
            src="/images/forgot-image.jpg"
            alt="image"
            fill
            className="object-cover"
          />

          {/* Logo */}
          <Image
            src="/images/logo-full.png"
            alt="Logo"
            width={145}
            height={39}
            className="z-50 relative top-10 left-10"
          />
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="lg:w-2/5 w-full flex flex-col justify-center mx-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

        <div className="mt-4 text-display-2 text-neutral-6 mr-2 px-6">
          <div className="flex flex-col gap-4 mb-6">
            <InputField
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
          </div>
          <Button text="Change password" onClick={handleChangePassword} />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
