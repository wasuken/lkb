import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavbarBrand href="/">LKB</NavbarBrand>
        </Link>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="nav-link" href="/">
                <NavLink href="/">input</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" href="/year">
                <NavLink href="/year">year</NavLink>
              </Link>
            </NavItem>
			<NavItem>
              <Link className="nav-link" href="/month">
                <NavLink href="/month">month</NavLink>
              </Link>
            </NavItem>
			<NavItem>
              <Link className="nav-link" href="/day">
                <NavLink href="/day">day</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
