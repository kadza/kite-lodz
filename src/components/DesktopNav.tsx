import { type FunctionComponent } from "react";
import type { NavLink } from "./navigation";

interface DesktopNavProps {
  links: NavLink[];
  subNav?: NavLink[];
}

export const DesktopNav: FunctionComponent<DesktopNavProps> = ({
  links,
  subNav,
}) => (
  <nav className="mb-2 mt-2 md:mt-5 min-h-[4.5rem]">
    <div className="container mx-auto flex uppercase items-center px-4">
      <div className="flex space-x-8 font-montserrat text-[2rem]">
        {links.map((link, index) => (
          <div key={link.href} className="contents">
            <a
              href={link.href}
              className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline decoration-2 underline-offset-8" : ""}`}
            >
              {link.label}
            </a>
            {index < links.length - 1 && (
              <span className="border-l border-textColor h-8 self-center mx-4"></span>
            )}
          </div>
        ))}
      </div>
    </div>
    {subNav && (
      <div className="container mx-auto flex flex-nowrap uppercase px-4 gap-3 md:gap-0">
        {subNav.map((link, index) => (
          <div key={link.href} className="contents">
            <a
              href={link.href}
              className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline underline-offset-4 decoration-2" : ""}`}
            >
              {link.label}
            </a>
            {index < subNav.length - 1 && (
              <span className="border-l border-textColor h-4 mx-2 self-center"></span>
            )}
          </div>
        ))}
      </div>
    )}
  </nav>
);

