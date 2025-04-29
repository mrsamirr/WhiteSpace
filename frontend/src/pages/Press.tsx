const Press = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Press</h1>
  
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif mb-4">Media Inquiries</h2>
            <p className="text-lg text-gray-700 mb-6">For press inquiries, please contact our communications team.</p>
            <a
              href="mailto:press@example.com"
              className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 inline-block"
            >
              Contact Press Team
            </a>
          </div>
  
          <h2 className="text-2xl font-serif mb-6">Recent Press Releases</h2>
  
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <p className="text-gray-500 text-sm mb-2">April 15, 2025</p>
              <h3 className="text-xl font-medium mb-3">Medium Announces New Features to Support Writers</h3>
              <p className="text-gray-700 mb-4">
                Medium today announced a suite of new features designed to help writers grow their audience and monetize
                their content more effectively.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Read full release →</button>
            </div>
  
            <div className="border-b border-gray-200 pb-8">
              <p className="text-gray-500 text-sm mb-2">March 22, 2025</p>
              <h3 className="text-xl font-medium mb-3">Medium Reaches 100 Million Monthly Readers</h3>
              <p className="text-gray-700 mb-4">
                Medium announced today that it has reached a milestone of 100 million monthly active readers, marking
                significant growth in its global audience.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Read full release →</button>
            </div>
  
            <div className="border-b border-gray-200 pb-8">
              <p className="text-gray-500 text-sm mb-2">February 8, 2025</p>
              <h3 className="text-xl font-medium mb-3">Medium Launches New Mobile Experience</h3>
              <p className="text-gray-700 mb-4">
                Medium today unveiled a completely redesigned mobile experience, making it easier than ever for readers to
                discover and engage with quality content on the go.
              </p>
              <button className="text-gray-900 font-medium hover:underline">Read full release →</button>
            </div>
          </div>
  
          <h2 className="text-2xl font-serif mt-12 mb-6">In the News</h2>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm mb-2">The New York Times</p>
              <h3 className="text-lg font-medium mb-3">"How Medium Is Changing Digital Publishing"</h3>
              <button className="text-gray-900 font-medium hover:underline">Read article →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm mb-2">TechCrunch</p>
              <h3 className="text-lg font-medium mb-3">"Medium's Writer-First Approach Pays Off"</h3>
              <button className="text-gray-900 font-medium hover:underline">Read article →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm mb-2">Fast Company</p>
              <h3 className="text-lg font-medium mb-3">"50 Most Innovative Companies: Medium"</h3>
              <button className="text-gray-900 font-medium hover:underline">Read article →</button>
            </div>
  
            <div className="border border-gray-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm mb-2">Wired</p>
              <h3 className="text-lg font-medium mb-3">"The Future of Reading Is on Medium"</h3>
              <button className="text-gray-900 font-medium hover:underline">Read article →</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Press
  