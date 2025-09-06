"use client";

import { usePathname } from "next/navigation";
import GlassNavigationBar from "@/components/GlassNavigationBar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/ThemeToggle";
import { DemoRoleSwitcher } from "@/components/DemoRoleSwitcher";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <ThemeToggle />
      {/* Only show GlassNavigationBar if NOT on the homepage */}
      {pathname !== "/" && <GlassNavigationBar />}
      {children}
      <Footer />
      {/* Demo Role Switcher for testing - remove in production */}
      <DemoRoleSwitcher />
    </>
  );
}