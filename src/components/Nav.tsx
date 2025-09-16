import { type FunctionComponent } from "react";
import { siteNavigation, flattenNavigationTree } from "./navigation";

export interface NavLink {
  href: string;
  label: string;
  isActive?: boolean;
}

interface NavProps {
  links: NavLink[];
  subNav?: NavLink[];
}

export const Nav: FunctionComponent<NavProps> = ({ links, subNav }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav className="md:min-h-[4.5rem] mb-2 mt-2 md:mt-5 flex flex-col">
      {/*Desktop*/}
      <div>
        <div className="container mx-auto flex uppercase items-center px-4">
          <div className="hidden md:flex space-x-8 font-montserrat text-[2rem]">
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
          <div className="container mx-auto hidden md:flex md:flex-nowrap uppercase px-4 gap-3 md:gap-0">
            {subNav.map((link, index) => (
              <div key={link.href} className="contents">
                <a
                  href={link.href}
                  className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline underline-offset-4 decoration-2" : ""}`}
                >
                  {link.label}
                </a>
                {index < subNav.length - 1 && (
                  <span className="border-l border-textColor h-4 mx-2 self-center hidden md:block"></span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile nav*/}
      <div
        className={`container mx-auto flex uppercase ${subNav?.length ? "justify-between" : "justify-end"} px-4`}
      >
        {subNav && (
          <div>
            <div className="md:hidden container mx-auto flex flex-wrap uppercase">
              {subNav.map((link, index) => (
                <div key={link.href} className="contents">
                  <a
                    href={link.href}
                    className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline decoration-2 underline-offset-4" : ""}`}
                  >
                    {link.label}
                  </a>
                  {index < subNav.length - 1 && (
                    <span className="border-l border-textColor h-4 self-center mx-2"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex flex-col justify-end">
          <button id="menu-btn" className="text-textColor focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden fixed inset-0 w-screen bg-white z-[1300] flex flex-col items-start justify-start font-montserrat text-[1.5rem] pt-20 px-8 overflow-y-auto"
      >
        <button
          id="close-mobile-menu"
          className="absolute top-6 right-6 text-textColor hover:text-hoverColor text-4xl font-bold focus:outline-none"
        >
          ×
        </button>
        <div className="w-full space-y-4">
          {flattenNavigationTree(siteNavigation, currentPath).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block hover:text-hoverColor transition-colors duration-200 ${
                link.isActive ? "underline decoration-2 underline-offset-4 text-hoverColor" : "text-textColor"
              } ${link.label.startsWith('  ') ? 'ml-8 text-lg' : ''} ${
                link.label.includes('└─') ? 'ml-4 text-base' : ''
              }`}
            >
              {link.label.replace(/^ {2}└─ /, '└─ ')}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
