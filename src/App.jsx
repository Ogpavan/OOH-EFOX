import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './lib/theme-context.jsx';
import Layout from './components/ui/layout';

// Import all page components
import CompanyAdd from './pages/company/add.jsx';
import CompanyManage from './pages/company/manage.jsx';
import ClientsAdd from './pages/clients/add.jsx';
import ClientsManage from './pages/clients/manage.jsx';
import VendorsAdd from './pages/vendors/add.jsx';
import VendorsManage from './pages/vendors/manage.jsx';
import StaffAdd from './pages/staff/add.jsx';
import StaffManage from './pages/staff/manage.jsx';
import MediaAdd from './pages/media/add.jsx';
import MediaManage from './pages/media/manage.jsx';
import CampaignAdd from './pages/campaign/add.jsx';
import CampaignManage from './pages/campaign/manage.jsx';
import PurchaseOrderAdd from './pages/purchase-order/add.jsx';
import PurchaseOrderManage from './pages/purchase-order/manage.jsx';
import ReportAdd from './pages/report/add.jsx';
import ReportManage from './pages/report/manage.jsx';
import SettingAdd from './pages/setting/add.jsx';
import SettingManage from './pages/setting/manage.jsx';
import SettingProfile from './pages/setting/profile.jsx';
import SettingPreferences from './pages/setting/preferences.jsx';
import ExpenseAdd from './pages/expense/add.jsx';
import ExpenseManage from './pages/expense/manage.jsx';
import TasksAdd from './pages/tasks/add.jsx';
import TasksManage from './pages/tasks/manage.jsx';
import ViewCompany from './pages/company/view.jsx';
import ViewClient from './pages/clients/view.jsx';
import SignIn from './pages/auth/signin.jsx';

function ThemeToggle() {
 
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth routes without Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected routes with Layout */}
          <Route path="/*" element={
            <Layout>
              <ThemeToggle />
              <Routes>
                <Route path="/company/add" element={<CompanyAdd />} />
                <Route path="/company/manage" element={<CompanyManage />} />
                <Route path="/company/view/:id" element={<ViewCompany />} />
                <Route path="/clients/add" element={<ClientsAdd />} />
                <Route path="/clients/manage" element={<ClientsManage />} />
                <Route path="/clients/view/:id" element={<ViewClient />} />
                <Route path="/vendors/add" element={<VendorsAdd />} />
                <Route path="/vendors/manage" element={<VendorsManage />} />
                <Route path="/staff/add" element={<StaffAdd />} />
                <Route path="/staff/manage" element={<StaffManage />} />
                <Route path="/media/add" element={<MediaAdd />} />
                <Route path="/media/manage" element={<MediaManage />} />
                <Route path="/campaign/add" element={<CampaignAdd />} />
                <Route path="/campaign/manage" element={<CampaignManage />} />
                <Route path="/purchase-order/add" element={<PurchaseOrderAdd />} />
                <Route path="/purchase-order/manage" element={<PurchaseOrderManage />} />
                <Route path="/report/add" element={<ReportAdd />} />
                <Route path="/report/manage" element={<ReportManage />} />
                <Route path="/setting/add" element={<SettingAdd />} />
                <Route path="/setting/manage" element={<SettingManage />} />
                <Route path="/setting/profile" element={<SettingProfile />} />
                <Route path="/setting/preferences" element={<SettingPreferences />} />
                <Route path="/expense/add" element={<ExpenseAdd />} />
                <Route path="/expense/manage" element={<ExpenseManage />} />
                <Route path="/tasks/add" element={<TasksAdd />} />
                <Route path="/tasks/manage" element={<TasksManage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;