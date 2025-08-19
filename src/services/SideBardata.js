import {
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

export const defaultNavItems = [
  {
    name: "Company",
    icon: Briefcase,
    children: [
      { name: "Add Company", to: "/company/add" },
      { name: "Manage Company", to: "/company/manage" },
    ],
  },
  {
    name: "Clients",
    icon: Users,
    children: [
      { name: "Add Client", to: "/clients/add" },
      { name: "Manage Clients", to: "/clients/manage" },
    ],
  },
  {
    name: "Vendors",
    icon: UserPlus,
    children: [
      { name: "Add Vendor", to: "/vendors/add" },
      { name: "Manage Vendors", to: "/vendors/manage" },
    ],
  },
  {
    name: "Staff",
    icon: Users,
    children: [
      { name: "Add Staff", to: "/staff/add" },
      { name: "Manage Staff", to: "/staff/manage" },
    ],
  },
  {
    name: "Media",
    icon: Image,
    children: [
      { name: "Add Media", to: "/media/add" },
      { name: "Manage Media", to: "/media/manage" },
    ],
  },
  {
    name: "Campaign",
    icon: Mail,
    children: [
      { name: "Create Proposal", to: "/campaign/add" },
      { name: "Manage Proposal", to: "/campaign/manage" },
      { name: "Manage Order", to: "/campaign/order" },
    ],
  },
  {
    name: "Purchase Order",
    icon: FileText,
    children: [
      { name: "Add PO", to: "/purchase-order/add" },
      { name: "Manage PO", to: "/purchase-order/manage" },
    ],
  },
  {
    name: "Report",
    icon: BarChart2,
    children: [
      { name: "Media Tracker", to: "/report/media-tracker" },
      { name: "Media Expiry Tracker", to: "/report/media-expiry-tracker" },
      { name: "Media ROI Tracker", to: "/report/media-roi-tracker" },
      { name: "Media Campaign Tracker", to: "/report/media-campaign-tracker" },
      { name: "Company Outstanding", to: "/report/company-outstanding" },
    ],
  },
  {
    name: "Setting",
    icon: Settings,
    children: [{ name: "App Configuration", to: "/setting/app-Configuration" }],
  },
  {
    name: "Expense",
    icon: DollarSign,
    children: [{ name: "Manage Expense", to: "/expense/add" }],
  },
  {
    name: "Task",
    icon: CheckSquare,
    children: [
      { name: "Manage Task", to: "/tasks/add" },
      { name: "Task Report", to: "/tasks/report" },
    ],
  },
  {
    name: "Lead Management",
    icon: PhoneCall,
    children: [
      { name: "Add Lead", to: "/leads/add" },
      { name: "Lead List", to: "/leads/list" },
      { name: "Follow-Ups", to: "/leads/follow-ups" },
      { name: "Reports & Analytics", to: "/leads/reports" },
    ],
  },
];