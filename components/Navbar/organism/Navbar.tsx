import React, { useState } from "react";
import { useAuth } from "components/Hooks/useAuth";
import Logo from "../atom/Logo";
import Collapse from "../molecule/Collapse";
import NavbarContainer from "../molecule/NavbarContainer";
import Toggle from "../molecule/Toggle";
import { Cart } from "components/Cart/organism/Cart";
import Search from "../molecule/Search";
import BreadcrumbsController from "components/Breadcrumbs/organism/BreadcrumbsController";

export function Navbar() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => await signOut();

  const toggleMobileNavbar = () => setIsMobileNavbarOpen(!isMobileNavbarOpen);

  return (
    <NavbarContainer isOpen={isMobileNavbarOpen}>
      <Logo />
      <Collapse isOpen={isMobileNavbarOpen} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Search />
      <Cart />
      <Toggle isOpen={isMobileNavbarOpen} onToggle={toggleMobileNavbar} />
      <BreadcrumbsController />
    </NavbarContainer>
  );
}
