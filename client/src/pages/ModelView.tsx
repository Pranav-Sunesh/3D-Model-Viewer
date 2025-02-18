import { Suspense, useEffect } from "react";
import Model from "../component/Model";
import useStore from "../store/store";
import DescriptionBox from "../component/DescriptionBox";
import Loading from "../component/Loading";
import { ModelType } from "../types";
import axios, { AxiosResponse } from "axios";
import useFileExits from "../hooks/useFileExits";

const ModelView = () => {

  const setHomePage: (val: boolean) => void = useStore(state => state.setHomePage);
  const setModelViewPage: (val: boolean) => void = useStore(state => state.setModelViewPage); 
  const models: ModelType[] = useStore(state => state.models);
  const modelUrl: string = useStore(state => state.modelUrl);
  const setModels: (models: ModelType[]) => void = useStore(state => state.setModels);
  const setModelUrl: (url: string) => void  = useStore(state => state.setModelUrl)

  const navigteToHome = (): void => {
    setModelViewPage(false);
    setHomePage(true);
  }

  useEffect(() => {
    const fetchModels = async() => {
      const response: AxiosResponse = await axios.get('http://localhost:5000/models');
      setModelUrl(response.data.url[0].url);
      setModels(response.data.uuid);

    }
    fetchModels();
  }, [])

  const fetchURL = async(model: ModelType) => {
    const response: AxiosResponse = await axios.get(`http://localhost:5000/models/${model.uuid}`);
    setModelUrl(response.data.url);
  }

  const fileExist: boolean = useFileExits(modelUrl);
  
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
          className="w-full h-5/6 flex justify-center items-center"
          >
            {
              models.length?
                (<div className="w-full h-full flex">
                  <div
                    className="w-2/3 h-full bg-white rounded flex justify-center items-center"
                    >
                      <Suspense fallback={<Loading />}>
                        {
                          fileExist?
                          <Model model={modelUrl}/>
                          :
                          <p>File not available</p>
                        }
                      </Suspense>
                  </div>

                  {/* Model Description */}
                  <div
                    className="w-1/3 h-full "
                    >
                      <DescriptionBox />
                  </div>
                </div>)
              :
                (<p className="text-xl text-white">
                  No Models!
                </p>)  
      }
        </div>

        <div
          className="h-16 mt-3 w-full flex justify-center items-center"
          > 
            <div
              className="w-1/3 h-14 space-x-3 overflow-x-auto  text-nowrap pagination"
              >
                {models.map((model: ModelType, index) => (
                  <button
                    className="w-10 h-10 font-semibold bg-white hover:bg-gray-100 active:bg-gray-200 justify-center inline-block items-center rounded"
                    onClick={() => fetchURL(model)}
                    key={index}>
                      {index + 1}
                  </button>
                ))}
                
            </div>
        </div>

        
        
    </div>
  );
};

export default ModelView;