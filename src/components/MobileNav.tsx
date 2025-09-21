import { type FunctionComponent } from "react";
import { siteNavigation } from "./navigation";
import type { NavLink, NavTreeNode } from "./navigation";

interface MobileNavProps {
  subNav?: NavLink[];
}

interface NavTreeProps {
  nodes: NavTreeNode[];
  currentPath: string;
  level: number;
}

const NavTree: FunctionComponent<NavTreeProps> = ({
  nodes,
  currentPath,
  level,
}) => {
  return (
    <>
      {nodes.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isActive = currentPath === node.href;
        const shouldShowArrow = hasChildren && level === 1; // Show arrows for level 1 items with children (like "Spoty")

        return (
          <div key={node.href}>
            <div className="flex items-center">
              <a
                href={node.href}
                className={`block hover:text-hoverColor transition-colors duration-200 ${
                  isActive
                    ? "underline decoration-2 underline-offset-4 text-hoverColor"
                    : "text-textColor"
                } ${level > 0 ? "ml-4" : ""} ${level === 2 ? "text-base" : level === 1 ? "text-lg" : "text-xl"}`}
              >
                {node.label}
              </a>
              {shouldShowArrow && (
                <button
                  data-toggle-menu="spoty-section"
                  className="ml-2 text-textColor hover:text-hoverColor focus:outline-none mobile-menu-toggle"
                  aria-expanded="false"
                  aria-label="Toggle menu section"
                >
                  <svg
                    className="menu-arrow w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
              {hasChildren && !shouldShowArrow && <span className="w-4 mr-2" />}
            </div>
            {hasChildren && node.children && (
              <div
                id={
                  node.href === "/spots/jeziorsko/spoty"
                    ? "spoty-section"
                    : undefined
                }
                className={`ml-4 mt-2 space-y-2 mobile-menu-tree ${node.href === "/spots/jeziorsko/spoty" ? "collapsible-section" : ""}`}
              >
                <NavTree
                  nodes={node.children}
                  currentPath={currentPath}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export const MobileNav: FunctionComponent<MobileNavProps> = ({ subNav }) => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <nav className="md:min-h-[4.5rem] mb-2 mt-2 md:mt-5 flex flex-col">
      <div
        className={`container mx-auto flex uppercase ${subNav?.length ? "justify-between" : "justify-end"} px-4`}
      >
        {subNav && (
          <div>
            <div className="container mx-auto flex flex-wrap uppercase">
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
        <div className="flex flex-col justify-end">
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
        className="hidden fixed inset-0 w-screen bg-white z-[1300] flex flex-col items-start justify-start font-montserrat text-[1.5rem] p-8 overflow-y-auto"
      >
        <button
          id="close-mobile-menu"
          className="absolute top-6 right-6 text-textColor hover:text-hoverColor text-4xl font-bold focus:outline-none"
        >
          ×
        </button>
        <div className="w-full space-y-4">
          <NavTree nodes={siteNavigation} currentPath={currentPath} level={0} />
        </div>
      </div>
    </nav>
  );
};
