import React, { useState } from "react";
import { useAuth } from "components/Hooks/useAuth";
import NavbarContainer from "../atom/NavbarContainer";
import Logo from "../atom/Logo";
import NavbarInteractiveSection from "../molecule/NavbarInteractiveSection";
import MobileNavbar from "../mobile/organism/MobileNavbar";
import SearchController from "components/Search/organism/SearchController";

export function Navbar() {
  const [show, setShow] = useState(false);

  const { isAuthenticated, signOut } = useAuth();

  const handleShow = () => setShow(!show);
  const handleLogout = async () => await signOut();
  const handleLogoutThenClose = async () => {
    await handleLogout();
    handleShow();
  };

  return (
    <>
    <MobileNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} onShow={handleShow} show={show} />
    <NavbarContainer>
      <Logo />
      <SearchController />
      <NavbarInteractiveSection isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    </NavbarContainer>
    </>
  );
}
