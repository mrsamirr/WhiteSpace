const Help = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Help Center</h1>
  
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-serif mb-4">Frequently Asked Questions</h2>
  
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How do I create an account?</h3>
                <p className="text-gray-600">
                  You can sign up for an account by clicking the "Get started" button in the top right corner of the
                  homepage. Follow the prompts to create your account using your email or sign in with Google or Facebook.
                </p>
              </div>
  
              <div>
                <h3 className="text-lg font-medium mb-2">How do I publish a story?</h3>
                <p className="text-gray-600">
                  After signing in, click on "Write" in the navigation menu. You'll be taken to the editor where you can
                  write and format your story. When you're ready to publish, click the "Publish" button.
                </p>
              </div>
  
              <div>
                <h3 className="text-lg font-medium mb-2">What is the membership program?</h3>
                <p className="text-gray-600">
                  Our membership program gives you unlimited access to all stories on our platform and supports the
                  writers you read. Members can also publish their own stories and engage with a community of readers and
                  writers.
                </p>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-serif mb-4">Contact Support</h2>
            <p className="text-gray-600 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
  
            <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 text-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Help
  