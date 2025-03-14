import { Navbar as HeroUINavbar, NavbarContent } from "@heroui/navbar";

import { ThemeSwitch } from "@/components/ThemeSwitch";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
