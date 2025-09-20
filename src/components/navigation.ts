export interface NavLink {
  href: string;
  label: string;
  isActive?: boolean;
}

export interface NavTreeNode {
  href: string;
  label: string;
  children?: NavTreeNode[];
}

export const siteNavigation: NavTreeNode[] = [
  {
    href: "/",
    label: "Kite Łódź",
  },
  {
    href: "/spots/jeziorsko/",
    label: "Jeziorsko",
    children: [
      {
        href: "/spots/jeziorsko/spoty",
        label: "Spoty",
        children: [
          { href: "/spots/jeziorsko/popow", label: "Popów" },
          { href: "/spots/jeziorsko/popow-polanka", label: "Popów polanka" },
          { href: "/spots/jeziorsko/wylazlow", label: "Wylazłów" },
          { href: "/spots/jeziorsko/brodnia-tama", label: "Brodnia tama" },
          { href: "/spots/jeziorsko/brodnia-cypel", label: "Brodnia cypel" },
          { href: "/spots/jeziorsko/ostrow", label: "Ostrów Warcki" },
          { href: "/spots/jeziorsko/zaspy", label: "Zaspy" },
          { href: "/spots/jeziorsko/milkowice", label: "Miłkowice" },
          { href: "/spots/jeziorsko/skarpa", label: "Skarpa" },
        ],
      },
      {
        href: "/spots/jeziorsko/pogoda",
        label: "Pogoda",
      },
    ],
  },
];

export function flattenNavigationTree(
  tree: NavTreeNode[],
  currentPath?: string,
): NavLink[] {
  const result: NavLink[] = [];

  function traverse(nodes: NavTreeNode[], level = 0) {
    for (const node of nodes) {
      result.push({
        href: node.href,
        label: level > 0 ? `${"  ".repeat(level)}└─ ${node.label}` : node.label,
        isActive: currentPath === node.href,
      });

      if (node.children) {
        traverse(node.children, level + 1);
      }
    }
  }

  traverse(tree);
  return result;
}
