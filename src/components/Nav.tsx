import { useState, type FunctionComponent } from 'react';

export interface NavLink {
  href: string;
  label: string;
  isActive?: boolean;
}

interface NavProps {
  links: NavLink[];
  homeLink?: string;
  subNav?: NavLink[];
}

export const Nav: FunctionComponent<NavProps> = ({ links, homeLink = "/", subNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="h-[3rem] md:h-[6rem] flex items-center fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex uppercase justify-between items-center px-4">
        <span className="hidden md:flex">
          <a
            href={homeLink}
            className="font-montserrat text-[2rem] hover:text-hoverColor underline decoration-2 underline-offset-8"
          >
            Kite Łódź
          </a>
        </span>
        <span className="font-montserrat text-[2rem] md:hidden">
          Kite Łódź
        </span>

        <div className="hidden md:flex space-x-16 font-montserrat text-[2rem]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-hoverColor ${link.isActive ? 'underline decoration-2 underline-offset-8' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button
            id="menu-btn"
            className="text-textColor focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
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

      {/* Sub Navigation for mobile */}
      {subNav && (
        <nav className="h-[3rem] md:h-[6rem] flex items-center fixed top-[3rem] md:top-[6rem] left-0 right-0 z-10">
          <div className="container mx-auto flex uppercase px-4 space-x-4">
            {subNav.map((link, index) => (
              <div key={link.href} className="flex items-center space-x-4">
                <a href={link.href} className="hover:text-hoverColor p-1">
                  {link.label}
                </a>
                {index < subNav.length - 1 && (
                  <span className="border-l border-textColor h-6"></span>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 z-20 flex flex-col items-center justify-center font-montserrat text-[2rem] space-y-8"
      >
        <a href={homeLink} className="hover:text-hoverColor underline decoration-2 underline-offset-8">
          Kite Łódź
        </a>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`hover:text-hoverColor ${link.isActive ? 'underline decoration-2 underline-offset-8' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};