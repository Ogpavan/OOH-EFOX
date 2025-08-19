import axios from "axios";
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

// Map icon string to actual icon component
const iconMap = {
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
};

export async function fetchNavItems(companyId, roleId) {
  const data = JSON.stringify({
    CompanyId: companyId,
    RoleId: roleId,
  });

  const config = {
    method: "post",
    url: "https://betaoohsuite.efoxtechnologies.com/api/RolePermission/GetRoleForManage",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios.request(config);
    const pages = response.data;
    console.log("Fetched pages:", pages);

    // Build parent items, only include if CanView !== "0"
    const parents = pages
      .filter((p) => p.ParentPageId === "0" && p.CanView !== "0")
      .sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder))
      .map((parent) => {
        // Find children, only include if CanView !== "0"
        const children = pages
          .filter((c) => c.ParentPageId === parent.PageId && c.CanView !== "0")
          .sort((a, b) => Number(a.DisplayOrder) - Number(b.DisplayOrder))
          .map((child) => ({
            name: child.PageName,
            to: child.PageUrl,
          }));

        return {
          name: parent.PageName,
          icon: iconMap[parent.IconClass] || Briefcase,
          children,
        };
      });

    return parents;
  } catch (error) {
    console.error("Failed to fetch sidebar data:", error);
    return [];
  }
}