const NotFound = () => {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 inline-block">
          Go back home
        </a>
      </div>
    )
  }
  
  export default NotFound
