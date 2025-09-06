import { type FunctionComponent } from "react";

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
  return (
    <nav className="h-[4rem] mb-4 mt-2 md:mt-5 flex items-center flex-col relative">
      <div className="container mx-auto flex uppercase items-center px-4">
        <div className="hidden md:flex space-x-8 font-montserrat text-[2rem]">
          {links.map((link, index) => (
            <>
              <a
                key={link.href}
                href={link.href}
                className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline decoration-2 underline-offset-8" : ""}`}
              >
                {link.label}
              </a>
              {index < links.length - 1 && (
                <span className="border-l border-textColor h-8 self-center"></span>
              )}
            </>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          {(() => {
            const activeMainLink = links.find((link) => link.isActive);
            const activeSubLink = subNav?.find((link) => link.isActive);
            let displayLink = activeMainLink;

            if (!displayLink && activeSubLink) {
              // Find parent link based on URL path
              displayLink = links.find(
                (link) =>
                  activeSubLink.href.startsWith(link.href) && link.href !== "/",
              );
            }

            return displayLink ? (
              <span className="font-montserrat text-[2rem] text-textColor">
                {displayLink.label}
              </span>
            ) : null;
          })()}
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

      {/* Sub Navigation */}
      {subNav && (
        <>
          {/* Mobile: Fixed positioning */}
          <div className="container h-[2rem] flex items-center">
            <div className="container mx-auto flex uppercase px-4">
              {subNav.map((link, index) => (
                <>
                  <a
                    key={link.href}
                    href={link.href}
                    className={`hover:text-hoverColor text-textColor ${link.isActive ? "underline underline-offset-4 decoration-2" : ""}`}
                  >
                    {link.label}
                  </a>
                  {index < subNav.length - 1 && (
                    <span className="border-l border-textColor h-4 mx-2 self-center"></span>
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 z-20 flex flex-col items-center justify-center font-montserrat text-[2rem] space-y-8"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`hover:text-hoverColor ${link.isActive ? "underline decoration-2 underline-offset-8" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
