import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  ChevronRight,
  Briefcase,
  Users,
  UserPlus,
  Image,
  Mail,
  FileText,
  BarChart2,
  Settings,
  DollarSign,
  CheckSquare,
  PhoneCall,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme-context.jsx";
import { fetchNavItems } from "@/services/SideBardata.js"; // <-- Import dynamic fetch function

export default function Sidebar({ collapsed, setCollapsed }) {
  const [navItems, setNavItems] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const [popupMenu, setPopupMenu] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const parentBtnRefs = useRef({});
  const { theme } = useTheme();

  useEffect(() => {
    let mounted = true;
    async function loadSidebar() {
      // Replace with your actual companyId and roleId
      const items = await fetchNavItems("1032", "27");
      if (mounted) setNavItems(items);
    }
    loadSidebar();
    return () => { mounted = false; };
  }, []);

  // helper: dynamic import a lucide icon by its exported name (e.g. "Briefcase")
  async function importIconByName(iconName) {
    if (!iconName) return null;
    try {
      const module = await import(
        /* @vite-ignore */ "lucide-react"
      );
      return module[iconName] || null;
    } catch (err) {
      console.warn("lucide-react icon not found:", iconName, err);
      return null;
    }
  }

  // Hide all open menus except the current one
  const toggleMenu = (name) => {
    setOpenMenus((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[name] = !prev[name];
      return newState;
    });
  };

  useEffect(() => {
    if (!collapsed || !popupMenu) return;
    function handleClick(e) {
      const popup = document.querySelector(".sidebar-popup-menu");
      const parentBtn = parentBtnRefs.current[popupMenu]?.current;
      if (
        popup &&
        (popup.contains(e.target) || (parentBtn && parentBtn.contains(e.target)))
      ) {
        return;
      }
      setPopupMenu(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [collapsed, popupMenu]);

  const DefaultIcon = ({ size = 24 }) => (
    <div style={{
      width: size,
      height: size,
      borderRadius: 4,
      background: 'rgba(255,255,255,0.12)'
    }} />
  );

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 ease-out z-[100] shadow-2xl overflow-visible
        ${collapsed ? "w-20" : "w-72"}`}
      style={{
        // explicit 100% height ensures full-height inside transformed/zoomed pages
        height: "100%",
        fontFamily: theme.fontFamily,
        background: theme.sidebarBg,
      }}
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-6 py-[18px] border-b"
        style={{ borderColor: theme.sidebarBorder }}
      >
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: theme.sidebarText }}
            >
              OOH Manager
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hover:scale-[1.2] rounded transition-all duration-200 focus:outline-none
            ${collapsed ? "mx-auto mt-2" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{ color: theme.sidebarText }}
        >
          <ChevronRight
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* MENU */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2 relative custom-scrollbar"
      >
        {navItems.map((item) => {
          // support both: item.icon can be
          // - a string (API or config) -> resolve from iconsMap
          // - a React component (from SideBardata import) -> use directly
          // fall back to DefaultIcon
          const IconComponent = typeof item.icon === "string"
            ? (iconsMap[item.icon] || DefaultIcon)
            : (item.icon || DefaultIcon);
          const Icon = IconComponent;
          const activeParent = item.children?.some((c) =>
            location.pathname.startsWith(c.to)
          );
          if (!parentBtnRefs.current[item.name]) parentBtnRefs.current[item.name] = React.createRef();

          return (
            <div key={item.name} className="relative">
              {/* Parent Menu */}
              <button
                ref={parentBtnRefs.current[item.name]}
                onClick={() => {
                  if (collapsed) {
                    const rect = parentBtnRefs.current[item.name].current.getBoundingClientRect();
                    setMenuPos({
                      top: rect.top,
                      left: rect.right + 8,
                    });
                    setPopupMenu(item.name);
                  } else {
                    toggleMenu(item.name);
                  }
                }}
                className={`group relative flex items-center w-full px-4 py-2 text-left rounded transition-all duration-200 ease-out
                  ${collapsed ? "justify-center " : "justify-start "}
                  focus:outline-none`}
                style={{
                  background: activeParent ? theme.activeBg : theme.sidebarBg,
                  color: activeParent ? theme.activeText : theme.sidebarText,
                  border: item.children?.some((child) => location.pathname === child.to)
                    ? "2px solid #fff"
                    : "2px solid transparent",
                }}
              >
                <Icon size={24} className="transition-all duration-200 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1 text-sm font-medium tracking-wide ">
                      {item.name}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`transition-all duration-200 ${openMenus[item.name] ? "rotate-90" : ""} opacity-60 group-hover:opacity-100`}
                      style={{ color: theme.chevronColor }}
                    />
                  </>
                )}
              </button>

              {/* Children: popup menu */}
              {collapsed && popupMenu === item.name &&
                createPortal(
                  <div
                    className="sidebar-popup-menu rounded-md shadow-2xl py-2 px-2 min-w-[160px] flex flex-col gap-1 page-fade-in"
                    style={{
                      position: "fixed",
                      top: Math.min(menuPos.top, window.innerHeight - (item.children?.length || 1) * 44 - 24),
                      left: menuPos.left,
                      zIndex: 9999,
                      background: theme.popupBg,
                      maxHeight: "calc(100vh - 32px)",
                      overflowY: "auto",
                    }}
                  >
                    {item.children?.map((child) => (
                      <button
                        key={child.name}
                        onClick={() => {
                          navigate(child.to);
                          setPopupMenu(null);
                        }}
                        className="px-5 py-2 text-left rounded-md transition-all"
                        style={{
                          color: theme.popupText,
                          background: theme.popupItemBg,
                        }}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>,
                  document.body
                )}

              {/* Children: expanded sidebar */}
              {!collapsed && openMenus[item.name] && (
                <div
                  className="mt-2 ml-10 space-y-1 border-l pl-4"
                  style={{ borderColor: theme.sidebarBorder }}
                >
                  {item.children?.map((child) => {
                    const activeChild = location.pathname === child.to;
                    return (
                      <Link
                        key={child.name}
                        to={child.to}
                        className={`group flex items-center px-3 py-2.5 text-sm rounded transition-all duration-200 ease-out`}
                        style={{
                          color: activeChild ? "#fff" : theme.childText,
                          background: theme.childBg,
                          fontWeight: activeChild ? "500" : "400",
                          border: activeChild ? "2px solid #fff" : "2px solid transparent",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded mr-3 transition-all duration-200"
                          style={{
                            background: activeChild ? "#fff" : theme.childDot,
                          }}
                        ></div>
                        <span className="tracking-wide">{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t" style={{ borderColor: theme.sidebarBorder }}>
        {!collapsed && (
          <div
            className="text-xs font-medium tracking-wide"
            style={{ color: theme.footerText }}
          >
            &copy; {new Date().getFullYear()} OOH Manager
          </div>
        )}
      </div>
    </aside>
  );
}

