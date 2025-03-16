import Link from "next/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";

import { ThemeSwitch } from "@/components/ThemeSwitch";

export const Navigation = () => {
  return (
    <HeroUINavbar
      className="h-[70px] flex items-center"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="flex items-center">
        <NavbarBrand className="flex-1 flex justify-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Video Collection</h1>
          </Link>
        </NavbarBrand>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
