import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, RefreshCw, Folder, FolderOpen, Settings, Edit, Trash2 } from "lucide-react";

export default function PageManager() {
  const [newPage, setNewPage] = useState({
    PageName: "",
    ParentPageId: "0",
    PageUrl: "",
    DisplayOrder: "0",
    IconClass: "",
  });
  const [running, setRunning] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [parentOptions, setParentOptions] = useState([]);
  const [pagesList, setPagesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalParentId, setModalParentId] = useState("0");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPage((p) => ({ ...p, [name]: value }));
  };

  const fetchParentList = async () => {
    try {
      const res = await axios.post(
        "https://betaoohsuite.efoxtechnologies.com/api/pages/parentlistfordropdown",
        {}
      );
      setParentOptions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setParentOptions([]);
    }
  };

  const fetchPagesList = async () => {
    try {
      const res = await axios.post(
        "https://betaoohsuite.efoxtechnologies.com/api/pages/list",
        {}
      );
      setPagesList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setPagesList([]);
    }
  };

  useEffect(() => {
    fetchParentList();
    fetchPagesList();
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const payload = {
      PageName: newPage.PageName,
      ParentPageId: String(newPage.ParentPageId || "0"),
      PageUrl: newPage.PageUrl,
      DisplayOrder: String(newPage.DisplayOrder || "0"),
      IconClass: newPage.IconClass || "",
    };

    setRunning(true);
    setLastResponse(null);

    try {
      const res = await axios.post(
        "https://betaoohsuite.efoxtechnologies.com/api/PageMaster/InsertPages",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setLastResponse(res.data);
      await fetchParentList();
      await fetchPagesList();
      setShowModal(false); // Close modal on success
      setNewPage({
        PageName: "",
        ParentPageId: "0",
        PageUrl: "",
        DisplayOrder: "0",
        IconClass: "",
      });
    } catch (err) {
      const message = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      setLastResponse({ success: false, message });
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setNewPage({
      PageName: "",
      ParentPageId: "0",
      PageUrl: "",
      DisplayOrder: "0",
      IconClass: "",
    });
    setLastResponse(null);
  };

  // Helper function to calculate next display order
  const getNextDisplayOrder = (parentId) => {
    const targetParentId = String(parentId);
    let count = 0;
    
    if (targetParentId === "0") {
      // Count parent pages (pages with ParentPageId = "0")
      count = pagesList.filter(p => String(p.ParentPageId) === "0").length;
    } else {
      // Count child pages for specific parent
      count = pagesList.filter(p => String(p.ParentPageId) === targetParentId).length;
    }
    
    return String(count + 1);
  };

  const openModal = (parentId = "0") => {
    const nextDisplayOrder = getNextDisplayOrder(parentId);
    
    setModalParentId(parentId);
    setNewPage({
      PageName: "",
      ParentPageId: parentId,
      PageUrl: "",
      DisplayOrder: nextDisplayOrder,
      IconClass: "",
    });
    setShowModal(true);
  };

  const parents = Array.isArray(pagesList)
    ? pagesList.filter((p) => String(p.ParentPageId) === "0")
    : [];
  const childrenMap = Array.isArray(pagesList)
    ? pagesList.reduce((acc, p) => {
        const pid = String(p.ParentPageId || "0");
        if (!acc[pid]) acc[pid] = [];
        acc[pid].push(p);
        return acc;
      }, {})
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Page Management</h1>
                <p className="text-gray-600 mt-1">Manage your application pages and navigation structure</p>
              </div>
            </div>
            <button
              onClick={() => openModal("0")}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add Parent Page</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pagesList.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FolderOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Parent Pages</p>
                <p className="text-2xl font-bold text-gray-900">{parents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Child Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pagesList.length - parents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pages Hierarchy Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Pages Hierarchy</h2>
              <button
                onClick={fetchPagesList}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            {parents.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No pages found</p>
                <p className="text-gray-400 text-sm mt-2">Create your first parent page to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {parents.map((p) => (
                  <div key={p.PageId} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                    {/* Parent Page */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Folder className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{p.PageName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>ID: {p.PageId}</span>
                              <span>•</span>
                              <span>Order: {p.DisplayOrder}</span>
                              <span>•</span>
                              <span className="text-blue-600">{p.PageUrl}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal(String(p.PageId))}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Child</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Child Pages */}
                    {(childrenMap[String(p.PageId)] || []).length > 0 && (
                      <div className="bg-white border-t border-gray-100">
                        <div className="px-6 py-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <FolderOpen className="w-4 h-4 mr-2 text-gray-500" />
                            Child Pages ({childrenMap[String(p.PageId)].length})
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {childrenMap[String(p.PageId)].map((c) => (
                              <div key={c.PageId} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group/child">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-900">{c.PageName}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      ID: {c.PageId} • Order: {c.DisplayOrder} • {c.PageUrl}
                                    </div>
                                  </div>
                                  <div className="flex space-x-1 opacity-0 group-hover/child:opacity-100 transition-opacity duration-200">
                                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white rounded">
                                      <Edit className="w-3 h-3" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded">
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Create New Page or Child Page */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalParentId === "0" ? "Create New Parent Page" : "Create Child Page"}
                </h2>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-8 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Page Name *</label>
                    <input
                      name="PageName"
                      value={newPage.PageName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter page name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Page</label>
                    <select
                      name="ParentPageId"
                      value={newPage.ParentPageId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      disabled={modalParentId !== "0"}
                    >
                      <option value="0">-- No parent --</option>
                      {parentOptions.map((p) => (
                        <option key={p.PageId} value={p.PageId}>
                          {p.PageName} (ID: {p.PageId})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Page URL *</label>
                    <input
                      name="PageUrl"
                      value={newPage.PageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="/example/url"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Order * 
                      <span className="text-gray-500 text-xs ml-1">
                        (Auto-generated: {newPage.DisplayOrder})
                      </span>
                    </label>
                    <input
                      name="DisplayOrder"
                      value={newPage.DisplayOrder}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Class</label>
                  <input
                    name="IconClass"
                    value={newPage.IconClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="fa-icon or lucide-icon"
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={running}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {running ? "Creating..." : "Create Page"}
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}