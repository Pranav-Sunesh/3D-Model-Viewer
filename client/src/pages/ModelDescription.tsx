import useStore from "../store/store";
import Model from "../component/Model";
import { Suspense } from "react";

const ModelDescription = () => {
  
  const file: File = useStore(state => state.file)!; 
  const setFile: (file: File | null) => void = useStore(state => state.setFile);
  const setModelDescriptionPage: (val: boolean) => void = useStore(state => state.setModelDescriptionPage);
  const setUploadPage: (val: boolean) => void = useStore(state => state.setUploadPage);


  const navigateToUpload = (): void => {
    setFile(null);
    setModelDescriptionPage(false);
    setUploadPage(true);
  }

  return (
    <div
      className="w-full h-full p-1 "
      >
        <div
          className="h-16 flex items-end ml-5"
          >
            <button
              onClick={navigateToUpload}
              className="text-white text-md font-semibold py-3 px-4 rounded hover:bg-white/10 transition"
              >
                Back
            </button>
        </div>
        <div
          className="w-1/2 h-[90%]"
          >

          {/* Model Display */}
            <div
              className="w-full h-full bg-white shadow rounded-lg flex justify-center items-center"
              >
                <Suspense fallback={<>Loading.....</>}>
                  <Model model={URL.createObjectURL(file)}/>
                </Suspense>

            </div>

            {/* Model Description */}
            <div>
              
            </div>

        </div>
    </div>
  );
};

export default ModelDescription;