const Rules = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Platform Rules</h1>
  
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-gray-500 mb-8">Last updated: April 10, 2025</p>
  
            <p className="text-xl mb-8">
              We created these rules to ensure that everyone on Medium has a positive experience. By using Medium, you
              agree to follow these rules.
            </p>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Content Guidelines</h2>
  
            <h3 className="text-xl font-medium mt-6 mb-3">Do</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Share your authentic ideas and experiences</li>
              <li>Write with respect, even when discussing controversial topics</li>
              <li>Properly attribute quotes, media, and intellectual property</li>
              <li>Report content that violates these rules</li>
            </ul>
  
            <h3 className="text-xl font-medium mt-6 mb-3">Don't</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post content that harasses, threatens, or discriminates against others</li>
              <li>Share false or misleading information</li>
              <li>Publish private or confidential information without permission</li>
              <li>Use our platform to spam, scam, or engage in deceptive practices</li>
              <li>Post content that promotes violence or illegal activities</li>
            </ul>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Account Rules</h2>
  
            <h3 className="text-xl font-medium mt-6 mb-3">Do</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain the security of your account</li>
              <li>Provide accurate information when creating your profile</li>
              <li>Follow applicable laws and regulations</li>
            </ul>
  
            <h3 className="text-xl font-medium mt-6 mb-3">Don't</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create multiple accounts to evade restrictions</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Use automation to interact with the platform without permission</li>
              <li>Attempt to access, tamper with, or use non-public areas of the platform</li>
            </ul>
  
            <h2 className="text-2xl font-serif mt-8 mb-4">Enforcement</h2>
            <p>We may take action against accounts and content that violate these rules, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Removing content</li>
              <li>Limiting account functionality</li>
              <li>Suspending or terminating accounts</li>
            </ul>
  
            <p className="mt-6">
              We strive to enforce these rules consistently and fairly, but we cannot monitor all content. If you see
              something that violates these rules, please report it.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Rules
  