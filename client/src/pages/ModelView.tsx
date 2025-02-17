import { Suspense } from "react";
import Model from "../component/Model";
import useStore from "../store/store";
import DescriptionBox from "../component/DescriptionBox";

const ModelView = () => {

  const setHomePage: (val: boolean) => void = useStore(state => state.setHomePage);
  const setModelViewPage: (val: boolean) => void = useStore(state => state.setModelViewPage); 

  const navigteToHome = (): void => {
    setModelViewPage(false);
    setHomePage(true);
  }

  return (
    <div
      className="w-full h-full p-1"
      >
        <div
          className="h-12 flex items-end ml-5"
          >
            <button
              onClick={navigteToHome}
              className="text-white text-md font-semibold py-3 px-4 rounded hover:bg-white/10 transition"
              >
                Back
            </button>
        </div>

        {/* Model Container */}
        <div
          className="w-full h-5/6 flex"
          >
            <div
              className="w-2/3 h-full bg-white rounded flex justify-center items-center"
              >
                <Suspense fallback={<p>Loading...</p>}>
                  <Model model=" http://localhost:5000/models/177c9888-0cc9-412c-832c-78a452e5144e/destructible_robot_-_highpoly.glb"/>
                </Suspense>
            </div>

            {/* Model Description */}
            <div
              className="w-1/3 h-full "
              >
                <DescriptionBox />
            </div>
        </div>

        
        
    </div>
  );
};

export default ModelView;