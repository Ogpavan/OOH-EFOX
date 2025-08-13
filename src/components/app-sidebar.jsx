import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  MdBusiness, MdPeople, MdGroupAdd, MdGroups, MdPermMedia,
  MdEmail, MdReceipt, MdStorage, MdSettings, MdAttachMoney, MdTask,
  MdContactPhone,
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
      { name: "Create Proposal", to: "/campaign/add" },
      { name: "Manage Proposal", to: "/campaign/manage" },
      { name: "Manage Order", to: "/campaign/order" },
  ]},
  { name: "Purchase Order", icon: MdReceipt, children: [
      { name: "Add PO", to: "/purchase-order/add" },
      { name: "Manage PO", to: "/purchase-order/manage" },
  ]},
  {
  name: "Report", icon: MdStorage, children: [
    { name: "Media Tracker", to: "/report/media-tracker" },
    { name: "Media Expiry Tracker", to: "/report/media-expiry-tracker" },
    { name: "Media ROI Tracker", to: "/report/media-roi-tracker" },
    { name: "Media Campaign Tracker", to: "/report/media-campaign-tracker" },
    { name: "Company Outstanding", to: "/report/company-outstanding" },
  ]
},
  { name: "Setting", icon: MdSettings, children: [
      { name: "App Configuration", to: "/setting/app-Configuration" },
     
  ]},
  { name: "Expense", icon: MdAttachMoney, children: [
      { name: "Manage Expense", to: "/expense/add" },
    
  ]},
  { name: "Task  ", icon: MdTask, children: [
      { name: "Manage Task", to: "/tasks/add" },
      { name: "Task Report", to: "/tasks/report" },
  ]},
  {
    name: "Lead Management", icon: MdContactPhone, children: [
      { name: "Add Lead", to: "/leads/add" },
      { name: "Lead List", to: "/leads/list" },
      { name: "Follow-Ups", to: "/leads/follow-ups" },
      { name: "Reports & Analytics", to: "/leads/reports" },
    ]
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openMenus, setOpenMenus] = useState({});
  const [popupMenu, setPopupMenu] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const parentBtnRefs = useRef({});
  const { theme } = useTheme();

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
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2 relative custom-scrollbar"
        style={{
          
        }}
      >
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
                  border: item.children.some((child) => location.pathname === child.to)
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
                {/* Remove previous activeParent indicator */}
              </button>

              {/* Children: popup menu */}
              {collapsed && popupMenu === item.name &&
                createPortal(
                  <div
                    className="sidebar-popup-menu rounded-md shadow-2xl py-2 px-2 min-w-[160px] flex flex-col gap-1 page-fade-in"
                    style={{
                      position: "fixed",
                      top: Math.min(menuPos.top, window.innerHeight - (item.children.length * 44) - 24), // 44px per item + some padding
                      left: menuPos.left,
                      zIndex: 9999,
                      background: theme.popupBg,
                      maxHeight: "calc(100vh - 32px)",
                      overflowY: "auto",
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
                          color: activeChild ? "#fff" : theme.childText, // White text if active
                          background: theme.childBg, // No bg change
                          fontWeight: activeChild ? "500" : "400",
                          border: activeChild ? "2px solid #fff" : "2px solid transparent", // White border if active
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

