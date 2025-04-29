const Careers = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Careers</h1>
  
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're on a mission to create a better publishing platform—one that supports great writing and puts readers
              and writers first.
            </p>
            <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-2">
              View Open Positions
            </button>
          </div>
  
          <h2 className="text-2xl font-serif mb-6">Open Positions</h2>
  
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium mb-2">Senior Software Engineer</h3>
              <p className="text-gray-600 mb-4">Engineering • Full-time • Remote</p>
              <p className="mb-4">
                We're looking for experienced software engineers to help build and improve our platform. You'll work on
                challenging problems at scale and help shape the future of digital publishing.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Learn more →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium mb-2">Product Designer</h3>
              <p className="text-gray-600 mb-4">Design • Full-time • Remote</p>
              <p className="mb-4">
                Join our design team to create beautiful, intuitive experiences that help people discover and engage with
                ideas that matter.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Learn more →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium mb-2">Content Strategist</h3>
              <p className="text-gray-600 mb-4">Editorial • Full-time • New York</p>
              <p className="mb-4">
                Help shape our content strategy and work with writers to develop compelling stories that resonate with
                readers.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Learn more →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium mb-2">Marketing Manager</h3>
              <p className="text-gray-600 mb-4">Marketing • Full-time • San Francisco</p>
              <p className="mb-4">
                Drive growth and engagement through innovative marketing strategies that connect readers with great
                writing.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Learn more →</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Careers
  