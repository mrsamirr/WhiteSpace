const TextToSpeech = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Text to Speech</h1>
  
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-serif mb-4">Listen to Articles</h2>
            <p className="text-gray-700 mb-6">
              Our text-to-speech feature allows you to listen to any article on our platform. Perfect for multitasking,
              accessibility, or just giving your eyes a rest.
            </p>
  
            <div className="flex flex-col md:flex-row gap-4">
              <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 text-sm">
                Try Text to Speech
              </button>
              <button className="rounded-full border border-gray-300 px-6 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>
  
          <h2 className="text-2xl font-serif mb-6">How It Works</h2>
  
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex-shrink-0 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Find an article you want to listen to</h3>
                <p className="text-gray-700">
                  Browse our extensive library of articles across various topics and find something that interests you.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex-shrink-0 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Click the listen button</h3>
                <p className="text-gray-700">
                  Look for the headphone or speaker icon at the top of the article and click it to start the audio
                  playback.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex-shrink-0 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Adjust playback settings</h3>
                <p className="text-gray-700">
                  Control the playback speed, volume, and voice options to customize your listening experience.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-16 flex-shrink-0 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Listen on the go</h3>
                <p className="text-gray-700">
                  Continue listening even when your screen is locked or when using other apps. Perfect for commuting,
                  exercising, or multitasking.
                </p>
              </div>
            </div>
          </div>
  
          <div className="bg-gray-50 rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-serif mb-4">Frequently Asked Questions</h2>
  
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Is text-to-speech available for all articles?</h3>
                <p className="text-gray-700">Yes, our text-to-speech feature works with all articles on our platform.</p>
              </div>
  
              <div>
                <h3 className="text-lg font-medium mb-2">Can I use text-to-speech offline?</h3>
                <p className="text-gray-700">
                  Currently, an internet connection is required to use the text-to-speech feature.
                </p>
              </div>
  
              <div>
                <h3 className="text-lg font-medium mb-2">What languages are supported?</h3>
                <p className="text-gray-700">
                  We currently support English, Spanish, French, German, and Japanese, with more languages coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default TextToSpeech
  