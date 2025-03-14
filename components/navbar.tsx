import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";

import { title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export const NavBar = () => {
  return (
    <HeroUINavbar
      className="h-[70px] flex items-center"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="flex items-center">
        <NavbarBrand className="flex-1 flex justify-center">
          <h1 className={title({ size: "sm" })}>Video Collection</h1>
        </NavbarBrand>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
