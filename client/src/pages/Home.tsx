import useStore from "../store/store";

const Home = () => {

  const setUploadPage: (val: boolean) => void = useStore(state => state.setUploadPage);
  const setModelViewPage: (val: boolean) => void = useStore(state => state.setModelViewPage)
  const setHomePage: (val: boolean) => void = useStore(state => state.setHomePage);

  const navigateToUpload = (): void => {
    setHomePage(false);
    setUploadPage(true)
  }

  const navigateToModelView = (): void => {
    setHomePage(false);
    setModelViewPage(true);
  }

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Particle Container */}
        <div 
          className="absolute inset-0 overflow-hidden"
          >
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
        </div>

        {/* Text Content */}
        <div 
          className="relative z-10 flex flex-col items-center space-y-10 text-white font-semibold mt-[-130px]"
          >
            <div
              className="space-y-4 flex flex-col items-center"
              >
                <div className="text-6xl">Welcome to</div>
                <div className="text-7xl">3D Model Viewer</div>

            </div>
            
            {/* Button Content */}
            <div className="flex space-x-5 mt-8">
              <button 
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md transition"
                onClick={navigateToUpload}
                >
                  Upload Model
              </button>
              <button 
                className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium text-lg rounded-lg shadow-md transition"
                onClick={navigateToModelView}
                >
                  View Model
              </button>
            </div>
        </div>
    </div>
  );
};

export default Home;
