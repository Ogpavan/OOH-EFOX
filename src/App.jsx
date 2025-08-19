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

import SettingAdd from './pages/setting/add.jsx';
import SettingManage from './pages/setting/manage.jsx';
import SettingProfile from './pages/setting/profile.jsx';
import SettingPreferences from './pages/setting/preferences.jsx';
import ExpenseAdd from './pages/expense/add.jsx';

import TasksAdd from './pages/tasks/add.jsx';
import TasksManage from './pages/tasks/Report.jsx';
import ViewCompany from './pages/company/view.jsx';
import ViewClient from './pages/clients/view.jsx';
import SignIn from './pages/auth/signin.jsx';
import OrderManage from './pages/campaign/OrderManage.jsx';
import CompanyOutstanding from './pages/report/CompanyOutstanding.jsx';
import MediaCampaignTracker from './pages/report/MediaCampaignTracker.jsx';
import MediaROITracker from './pages/report/MediaROITracker.jsx';
import MediaExpiryTracker from './pages/report/MediaExpiryTracker.jsx';
import MediaTracker from './pages/report/MediaTracker.jsx';
import AppConfig from './pages/setting/AppConfig.jsx';
import AddLead from './pages/leads/AddLead.jsx';
import LeadList from './pages/leads/list.jsx';
import LeadDetails from './pages/leads/detail.jsx';
import LeadFollowUps from './pages/leads/follow-ups.jsx';
import LeadReports from './pages/leads/reports.jsx';
import Report from './pages/tasks/Report.jsx';
import { Toaster } from "sonner";
import Profile from './pages/CompanyPages/Profile.jsx';


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
                <Route path="/profile" element={<Profile />} />
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
                <Route path="/campaign/order" element={<OrderManage/>} />
                <Route path="/purchase-order/add" element={<PurchaseOrderAdd />} />
                <Route path="/purchase-order/manage" element={<PurchaseOrderManage />} />
               
                <Route path="/report/media-tracker" element={<MediaTracker />} />
                <Route path="/report/media-expiry-tracker" element={<MediaExpiryTracker/>} />
                <Route path="/report/media-roi-tracker" element={<MediaROITracker />} />
                <Route path="/report/media-campaign-tracker" element={<MediaCampaignTracker />} />
                <Route path="/report/company-outstanding" element={<CompanyOutstanding />} />
               
                <Route path="/setting/app-Configuration" element={<AppConfig />} />
               
                <Route path="/expense/add" element={<ExpenseAdd />} />
                
                <Route path="/tasks/add" element={<TasksAdd />} />
                <Route path="/tasks/report" element={<Report />} />
                {/* Lead Management routes */}
                <Route path="/leads/add" element={<AddLead />} />
                <Route path="/leads/list" element={<LeadList />} />
                <Route path="/leads/details/:id" element={<LeadDetails />} />
                <Route path="/leads/follow-ups" element={<LeadFollowUps />} />
                <Route path="/leads/reports" element={<LeadReports />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;