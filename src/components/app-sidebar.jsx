import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  MdBusiness, MdPeople, MdGroupAdd, MdGroups, MdPermMedia,
  MdEmail, MdReceipt, MdStorage, MdSettings, MdAttachMoney, MdTask,
} from "react-icons/md";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme-context.jsx"; // <-- import useTheme

const navItems = [
  { name: "Company", icon: MdBusiness, children: [
      { name: "Add Company", to: "/company/add" },
      { name: "Manage Company", to: "/company/manage" },
  ]},
  { name: "Clients", icon: MdPeople, children: [
      { name: "Add Client", to: "/clients/add" },
      { name: "Manage Clients", to: "/clients/manage" },
  ]},
  { name: "Vendors  ", icon: MdGroupAdd, children: [
      { name: "Add Vendor", to: "/vendors/add" },
      { name: "Manage Vendors", to: "/vendors/manage" },
  ]},
  { name: "Staff ", icon: MdGroups, children: [
      { name: "Add Staff", to: "/staff/add" },
      { name: "Manage Staff", to: "/staff/manage" },
  ]},
  { name: "Media ", icon: MdPermMedia, children: [
      { name: "Add Media", to: "/media/add" },
      { name: "Manage Media", to: "/media/manage" },
  ]},
  { name: "Campaign", icon: MdEmail, children: [
      { name: "Add Campaign", to: "/campaign/add" },
      { name: "Manage Campaign", to: "/campaign/manage" },
  ]},
  { name: "Purchase Order", icon: MdReceipt, children: [
      { name: "Add PO", to: "/purchase-order/add" },
      { name: "Manage PO", to: "/purchase-order/manage" },
  ]},
  { name: "Report", icon: MdStorage, children: [
      { name: "Add Report", to: "/report/add" },
      { name: "Manage Report", to: "/report/manage" },
  ]},
  { name: "Setting", icon: MdSettings, children: [
      { name: "Profile", to: "/setting/profile" },
      { name: "Preferences", to: "/setting/preferences" },
  ]},
  { name: "Expense", icon: MdAttachMoney, children: [
      { name: "Add Expense", to: "/expense/add" },
      { name: "Manage Expense", to: "/expense/manage" },
  ]},
  { name: "Task  ", icon: MdTask, children: [
      { name: "Add Task", to: "/tasks/add" },
      { name: "Manage Tasks", to: "/tasks/manage" },
  ]},
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openMenus, setOpenMenus] = useState({});
  const [popupMenu, setPopupMenu] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const parentBtnRefs = useRef({});
  const { theme } = useTheme(); // <-- get theme

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
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

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-out z-[100] shadow-2xl overflow-visible
        ${collapsed ? "w-20" : "w-72"}`}
      style={{
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
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const activeParent = item.children.some((c) =>
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
                {activeParent && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded"
                    style={{ background: theme.activeText }}
                  ></div>
                )}
              </button>

              {/* Children: popup menu */}
              {collapsed && popupMenu === item.name &&
                createPortal(
                  <div
                    className="sidebar-popup-menu rounded-md shadow-2xl py-2 px-2 min-w-[160px] flex flex-col gap-1 page-fade-in"
                    style={{
                      position: "fixed",
                      top: menuPos.top,
                      left: menuPos.left,
                      zIndex: 9999,
                      background: theme.popupBg,
                    }}
                  >
                    {item.children.map((child) => (
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
                  {item.children.map((child) => {
                    const activeChild = location.pathname === child.to;
                    return (
                      <Link
                        key={child.name}
                        to={child.to}
                        className={`group flex items-center px-3 py-2.5 text-sm rounded transition-all duration-200 ease-out`}
                        style={{
                          color: activeChild ? theme.activeText : theme.childText,
                          background: activeChild ? theme.activeBg : theme.childBg,
                          fontWeight: activeChild ? "500" : "400",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded mr-3 transition-all duration-200"
                          style={{
                            background: activeChild ? theme.activeText : theme.childDot,
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