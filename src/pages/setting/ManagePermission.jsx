import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import BackButton from "@/components/ui/BackButton";

function ManagePermission() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [pages, setPages] = useState([]);
  const [checkedPages, setCheckedPages] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await axios.post(
          "https://betaoohsuite.efoxtechnologies.com/api/base/rolelist",
          { CompanyId: localStorage.getItem("CompanyID") },
          { headers: { "Content-Type": "application/json" } }
        );
        setRoles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setRoles([]);
      }
    }
    fetchRoles();
  }, []);

  // Fetch pages only once, but permissions on role change
  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await axios.post(
          "https://betaoohsuite.efoxtechnologies.com/api/pages/list",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        setPages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setPages([]);
      }
    }
    fetchPages();
  }, []);

  // Fetch permissions when role changes
  useEffect(() => {
    async function fetchPermissions() {
      if (!selectedRoleId) {
        setCheckedPages({});
        return;
      }
      try {
        const res = await axios.post(
          "https://betaoohsuite.efoxtechnologies.com/api/RolePermission/GetRoleForManage",
          {
            CompanyId: localStorage.getItem("CompanyID"),
            RoleId: selectedRoleId
          },
          { headers: { "Content-Type": "application/json" } }
        );
        // Set checkedPages based on CanView
        const permissions = Array.isArray(res.data) ? res.data : [];
        const checked = {};
        permissions.forEach(p => {
          checked[p.PageId] = p.CanView === "1" ? 1 : 0;
        });
        setCheckedPages(checked);
      } catch (err) {
        setCheckedPages({});
      }
    }
    fetchPermissions();
  }, [selectedRoleId]);

  // Hierarchy mapping
  const parents = pages.filter(p => String(p.ParentPageId) === "0");
  const childrenMap = pages.reduce((acc, p) => {
    const pid = String(p.ParentPageId || "0");
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(p);
    return acc;
  }, {});

  // Checkbox handler with parent-child logic
  const handleCheck = (pageId, checked, isParent = false, parentId = null) => {
    let updated = { ...checkedPages };

    if (isParent) {
      updated[pageId] = checked ? 1 : 0;
      (childrenMap[pageId] || []).forEach(child => {
        updated[child.PageId] = checked ? 1 : 0;
      });
    } else {
      updated[pageId] = checked ? 1 : 0;
      if (checked && parentId) {
        updated[parentId] = 1;
      } else if (!checked && parentId) {
        const siblings = childrenMap[parentId] || [];
        const anyChecked = siblings.some(child => child.PageId !== pageId && updated[child.PageId] === 1);
        if (!anyChecked) updated[parentId] = 0;
      }
    }
    setCheckedPages(updated);
  };

  // Reset handler
  const handleReset = () => {
    setCheckedPages({});
    setSubmitMsg("");
  };

  // Submit handler with API integration
  const handleSubmit = async () => {
    if (!selectedRoleId) return;
    setSubmitting(true);
    setSubmitMsg("");
    const companyId = localStorage.getItem("CompanyID");
    const loginId = localStorage.getItem("loginId") || "";

    let successCount = 0;
    let failCount = 0;

    for (const page of pages) {
      const checked = checkedPages[page.PageId] === 1 ? "1" : "0";
      const payload = {
        CompanyId: companyId,
        RoleId: selectedRoleId,
        PageID: page.PageId,
        CanView: checked,
        CanCreate: checked,
        CanUpdate: checked,
        CanDelete: checked,
        loginId: loginId,
        IsActive: 1
      };

      try {
        const res = await axios.post(
          "https://betaoohsuite.efoxtechnologies.com/api/RolePermission/InsertRolePermission",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data && res.data.success) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        failCount++;
      }
    }

    setSubmitting(false);
    setSubmitMsg(
      `Assigned Successfully! Success: ${successCount}, Failed: ${failCount}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center  py-8 px-6">
      <div className="w-full max-w-5xl mx-auto">
        {/* <h1 className="text-xl font-semibold text-gray-900 mb-5 text-center">Manage Permission</h1> */}
        <div className="flex items-center py-5">

          <BackButton />
          <h2 className="text-xl font-light tracking-tight">
            Page{" "}
            <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
              Permission
            </span>
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow p-5 mb-6 border border-gray-100 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={selectedRoleId}
            onChange={e => setSelectedRoleId(e.target.value)}
          >
            <option value="">-- Choose Role --</option>
            {roles.map(role => (
              <option key={role.RoleId} value={role.RoleId}>{role.RoleName}</option>
            ))}
          </select>
        </div>
        {selectedRoleId && (
          <div className="bg-white rounded-lg shadow p-5 border border-gray-100 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800">Pages</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Toggle all: if any unchecked, select all; else clear all
                    const anyUnchecked = pages.some(p => checkedPages[p.PageId] !== 1);
                    const updated = {};
                    pages.forEach(p => {
                      updated[p.PageId] = anyUnchecked ? 1 : 0;
                    });
                    setCheckedPages(updated);
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 border border-blue-300 flex items-center justify-center text-sm font-medium"
                  disabled={submitting}
                  title={pages.some(p => checkedPages[p.PageId] !== 1) ? "Select All" : "Clear"}
                >
                  {pages.some(p => checkedPages[p.PageId] !== 1)
                    ? (
                      <>
                        <FaRegSquare size={18} className="mr-1" />
                        Select All
                      </>
                    )
                    : (
                      <>
                        <FaRegCheckSquare size={18} className="mr-1" />
                        Clear
                      </>
                    )
                  }
                </button>
                <button
                  onClick={handleSubmit}
                  className={`px-5 py-1 bg-blue-600 text-white rounded font-medium shadow text-sm ${submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
            {submitMsg && (
              <div className="mb-2 text-green-600 font-medium text-sm text-center">{submitMsg}</div>
            )}
            <div className="space-y-2 w-full flex flex-col items-center">
              {parents.map(parent => (
                <div key={parent.PageId} className="border rounded p-3 bg-gray-50 w-full max-w-3xl mb-2">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={checkedPages[parent.PageId] === 1}
                      onChange={e => handleCheck(parent.PageId, e.target.checked, true)}
                      className="mr-2 accent-blue-600 w-4 h-4"
                      disabled={submitting}
                    />
                    <span className="font-medium text-gray-900 text-sm">{parent.PageName}</span>
                  </div>
                  {(childrenMap[parent.PageId] || []).length > 0 && (
                    <div className="ml-6 mt-2 pl-4 border-l-2 border-blue-100">
                      <div className="grid grid-cols-3 gap-y-2 gap-x-3">
                        {childrenMap[parent.PageId].map(child => (
                          <div key={child.PageId} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={checkedPages[child.PageId] === 1}
                              onChange={e => handleCheck(child.PageId, e.target.checked, false, parent.PageId)}
                              className="mr-1 accent-blue-500 w-3 h-3"
                              disabled={submitting}
                            />
                            <span className="text-gray-800 text-xs">{child.PageName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagePermission;