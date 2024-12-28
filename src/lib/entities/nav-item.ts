interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: string;
  items?: NavItem[];
}
export default NavItem;
