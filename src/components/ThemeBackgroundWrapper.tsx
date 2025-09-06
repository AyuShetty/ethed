"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import AnimatedWeb3Background from "./AnimatedWeb3Background";
import ThemeToggle from "./ThemeToggle";
import { useBackground } from "@/context/BackgroundContext";

export default function ThemeBackgroundWrapper({ children }: { children: React.ReactNode }) {
  useTheme();
  const { backgroundState } = useBackground();

  const getBackgroundStyle = () => {
    switch (backgroundState) {
      case "dimmed":
        return { opacity: 0.15, transition: "opacity 0.5s ease-in-out" };
      case "hidden":
        return { opacity: 0, transition: "opacity 0.5s ease-in-out" };
      case "visible":
      default:
        return { opacity: 1, transition: "opacity 0.5s ease-in-out" };
    }
  };

  return (
    <>
      {/* Background animation, pointerEvents: none, zIndex: 0 */}
      <div
        style={{
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          ...getBackgroundStyle(),
        }}
      >
        <AnimatedWeb3Background />
      </div>
      {/* Theme toggle, high zIndex, pointerEvents: auto */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
          pointerEvents: "auto",
        }}
      >
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}