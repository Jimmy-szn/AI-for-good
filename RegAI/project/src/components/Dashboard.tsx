import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">ADStudio</h1>
        </div>
        
        <div className="px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MAIN MENU</h3>
          <nav className="space-y-2">
            <a href="#dashboard" className="flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Dashboard
            </a>
            <a href="#home" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Home
            </a>
            <a href="#regai" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              RegAI
            </a>
            <a href="#chatbot" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
              Chat Bot
            </a>
          </nav>
          
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-8">PREFERENCES</h3>
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Help Center
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hello Darlene 👋</h2>
              <p className="text-gray-600">Let's check your stats today!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Sessions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Sessions</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">2.4k+</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>

            {/* Total Visitors */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Visitors</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">1.6k+</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-red-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-red-400 to-red-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>

            {/* Views by Browser */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Views by Browser</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">44%</div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">22%</div>
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">18%</div>
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">16%</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Explorer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Safari</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                  <span>Chrome</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span>Firefox</span>
                </div>
              </div>
            </div>

            {/* Time Spent */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Time Spent</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">8.49</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>

            {/* AVG Requests Received */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">AVG Requests Received</h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">4.4</div>
              <div className="flex items-center mb-4">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-500 text-sm">17% last month</span>
              </div>
              <div className="h-12 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
                <div className="text-white text-xs">s s m t w t f</div>
              </div>
            </div>

            {/* Sessions Top */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Sessions Top</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-sm">Chrome</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                  <span className="text-sm">Firefox</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm">Safari</span>
                </div>
              </div>
            </div>

            {/* Sessions Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-600">Sessions Overview</h3>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">312</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                  <div className="text-xs text-gray-500 mt-1">31 March, 2022</div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Online Visitors</span>
                  <span className="text-sm font-semibold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Page Views</span>
                  <span className="text-sm font-semibold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="text-sm font-semibold text-red-600">23%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
