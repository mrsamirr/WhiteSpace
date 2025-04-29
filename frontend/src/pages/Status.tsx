const Status = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">System Status</h1>
  
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <h2 className="text-2xl font-serif">All Systems Operational</h2>
            </div>
  
            <p className="text-gray-600 mb-6">Updated April 29, 2025 at 11:32 AM</p>
  
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Website</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-600">Operational</span>
                  </div>
                </div>
              </div>
  
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">API</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-600">Operational</span>
                  </div>
                </div>
              </div>
  
              <div className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Database</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-600">Operational</span>
                  </div>
                </div>
              </div>
  
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">CDN</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-600">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-serif mb-4">Incident History</h2>
            <p className="text-gray-600">No incidents reported in the last 90 days.</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Status
  