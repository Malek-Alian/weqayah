import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import Advertisements from './pages/Advertisements';
import Blogs from './pages/Blogs';
import MedicalNews from './pages/MedicalNews';
import Overview from './pages/Overview';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen bg-gray-50 flex overflow-hidden'>
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className='flex-1 flex flex-col h-full overflow-hidden'>
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='mx-auto'>
            <Routes>
              <Route index element={<Overview />} />
              <Route path='medical-news' element={<MedicalNews />} />
              <Route
                path='patients'
                element={
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>
                      Patients Management
                    </h2>
                    <p>Patients management page coming soon...</p>
                  </div>
                }
              />
              <Route
                path='hospitals'
                element={
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>
                      Hospitals Management
                    </h2>
                    <p>Hospitals management page coming soon...</p>
                  </div>
                }
              />
              <Route
                path='clinics'
                element={
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>
                      Clinics Management
                    </h2>
                    <p>Clinics management page coming soon...</p>
                  </div>
                }
              />
              <Route
                path='doctors'
                element={
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>
                      Doctors Management
                    </h2>
                    <p>Doctors management page coming soon...</p>
                  </div>
                }
              />
              <Route path='blogs' element={<Blogs />} />
              <Route path='advertisements' element={<Advertisements />} />
              <Route
                path='settings'
                element={
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>Settings</h2>
                    <p>Settings page coming soon...</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
