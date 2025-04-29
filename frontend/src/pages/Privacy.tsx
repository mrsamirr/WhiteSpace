const Privacy = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
  
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-gray-500 mb-8">Last updated: April 15, 2025</p>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Introduction</h2>
            <p>
              This Privacy Policy describes how we collect, use, and disclose your information when you use our platform.
              We are committed to protecting your privacy and ensuring you have a positive experience on our website.
            </p>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Information you provide to us:</strong> We collect information you provide directly to us when you
                create an account, publish content, or communicate with us.
              </li>
              <li>
                <strong>Information we collect automatically:</strong> When you use our platform, we automatically collect
                certain information about your device and how you interact with our services, including your IP address,
                browser type, operating system, and usage data.
              </li>
              <li>
                <strong>Information from third parties:</strong> We may receive information about you from third parties,
                such as social media platforms, if you choose to link your accounts.
              </li>
            </ul>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and administrative messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience on our platform</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address fraud and other illegal activities</li>
            </ul>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Sharing Your Information</h2>
            <p>We may share your information with third parties in certain circumstances, such as:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                With vendors and service providers who need access to such information to carry out work on our behalf
              </li>
              <li>In response to a legal request if we believe disclosure is required by law</li>
              <li>When we believe it's necessary to protect the rights, property, and safety of our users</li>
              <li>In connection with a merger, sale of company assets, financing, or acquisition</li>
            </ul>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Your Choices</h2>
            <p>You have several choices regarding the information we collect and how it's used:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Account Information: You can update your account information at any time by logging into your account
              </li>
              <li>
                Cookies: Most web browsers are set to accept cookies by default. You can usually set your browser to
                remove or reject cookies
              </li>
              <li>
                Promotional Communications: You can opt out of receiving promotional emails by following the instructions
                in those emails
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  export default Privacy
  