import { useEffect, useRef, useState } from "react";
import useStore from "../store/store";
import PopUp from "../component/PopUp";
import JSZip from "jszip"
import axios, { AxiosResponse } from "axios";

interface BufferAndImageProps {
    uri?: string;
    byteLength?: number;
  }

const Upload = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const setFile: (file: File | null) => void = useStore(state => state.setFile);
    const file: File | null = useStore(state => state.file);
    const setHomePage: (val: boolean) => void = useStore(state => state.setHomePage);
    const setUploadPage: (val: boolean) => void = useStore(state => state.setUploadPage);
    const [isDragging, setIsDragging] = useState<boolean>(false)    //For tracking File dragging
    const [noification, setNotification] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    console.log(file?.name);

    const navigateToHome = (): void => {
        setFile(null);
        setUploadPage(false);
        setHomePage(true);
    }
    const navigateToModelDescription = async(): Promise<void> => {
        const formData = new FormData();
        if(file){
            try {
                formData.append("file", file);
                setLoading(true);
                const response: AxiosResponse = await axios.post("http://localhost:5000/upload", formData); //Sending formdata to backend   
                
                setNotification(response.data.message) 
                setTimeout(() => {
                    setNotification('');
                    setFile(null);
                    setUploadPage(false);
                    setHomePage(true);
                    setLoading(false);
                }, 2000);
                
            } catch (error) {
                console.log(error);
                setNotification("Please try again :)")
                setTimeout(() => setNotification(''), 3000);
            }
        }else{
            setNotification("Please upload a File")
            setTimeout(() => setNotification(''), 3000);
        }
    }

    //Checking file extention

    useEffect(() => {
        if(file){
            const ext = file.name.split('.').pop()?.toLowerCase();
            if(ext === 'glb'){
                return;
            }else if(ext === 'zip'){

                //Unzipping the gltf file
                const unzippingFile = async(): Promise<void> => {
                    const zip = new JSZip();
                    try{
                        const zipData = await zip.loadAsync(file);
                        const fileNames = Object.keys(zipData.files);
                        const containsGLTF = fileNames.find((name) => name.endsWith('.gltf'));
                        if(!containsGLTF){
                            setNotification("File doesn't have a gltf file");
                            setTimeout(() => setNotification(''), 3000);
                            setFile(null);
                            return;
                        }

                        const gltfContent = await zipData.files[containsGLTF].async("text");
                        const jsonContent = JSON.parse(gltfContent);

                        const requiredAssets = new Set<string>;

                        //Checking for assets
                        if (jsonContent.buffers) {
                            jsonContent.buffers.forEach((buffer: BufferAndImageProps) => {
                                if (buffer.uri && !buffer.uri.startsWith("data:")) {
                                    requiredAssets.add(buffer.uri);
                                }
                            });
                        }

                        if (jsonContent.images) {
                            jsonContent.images.forEach((image: BufferAndImageProps) => {
                                if (image.uri && !image.uri.startsWith("data:")) {
                                    requiredAssets.add(image.uri);
                                }
                            });
                        }

                        const missingAssets = [...requiredAssets].filter(asset => !fileNames.includes(asset));
                        if (missingAssets.length > 0) {
                            setNotification(`Missing assets in ZIP: ${missingAssets.join(", ")}`);
                            setTimeout(() => setNotification(''), 3000);
                            setFile(null);
                            return;
                        }
                        


                    }catch(e){
                        console.log(e);
                        setNotification("Error while unzipping! Please try again :)");
                        setTimeout(() => setNotification(''), 3000);
                    }
                }

                unzippingFile();
                
            }else if(ext === 'gltf'){
                setNotification("Insert a zip file with necessary assets");
                setTimeout(() => setNotification(''), 3000);
                setFile(null)
            }else{
                setNotification("File should be a gltf or glb file");
                setTimeout(() => setNotification(''), 3000);
                setFile(null)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);
    
    //Click and upload file logic
    const uploadContainerClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value && event.target.files?.[0]){
            setFile(event.target.files[0])
        }
    }

    //Drag and drop file logic
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if(droppedFile){ 
            setFile(droppedFile);
            setIsDragging(false);
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
        setIsDragging(true);
    }

    const handleDragLeave = () => {
        setIsDragging(false);       
    }

  return (
    <div
        className="p-1 w-full h-full">
        {noification && <PopUp message={noification}/>}
        <div
            className="h-16 ml-10 mt-[30px] flex items-center"
            >
                <button
                    className="text-white text-md font-semibold py-3 px-4 rounded hover:bg-white/10 transition"
                    onClick={navigateToHome}
                    >
                    Back
                </button>
        </div>
        <div
            className="mt-[20px] w-full h-3/5 flex justify-center">

                {/* Upload Section */}
                <div
                    className="bg-black w-1/2 h-full rounded-2xl"
                    >
                        <p
                            className="text-white p-10 text-xl"
                            >
                            Upload File</p>
                        <div
                            className="w-full h-2/3 flex justify-center"
                            >
                                <div
                                    onClick={uploadContainerClick}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className={`h-full w-11/12  rounded-xl border ${isDragging? "border-blue-400":  "border-gray-700"}
                                        flex flex-col justify-center items-center cursor-pointer select-none`}
                                    >
                                    {
                                        file?
                                        (
                                            <p className="text-white text-xl">
                                                {file.name}
                                            </p>
                                        )
                                        :
                                        (
                                            <>
                                                <p className="text-white text-lg">
                                                    Click or Drag and Drop
                                                </p>
                                                <p className="text-gray-500">
                                                    glb files or gltf zip files
                                                </p>
                                            </>
                                        )
                                    }
                                </div>
                        </div>
                </div>
                <input onChange={handleFileChange} type="file" className="hidden" ref={fileInputRef}/>
                {/* Upload Section End */}  

        </div>
        <div
            className="w-full h-24 flex justify-center items-center "
            >
                <button
                    disabled={loading}
                    onClick={navigateToModelDescription}
                    className={`py-3 px-3 rounded text-white shadow transition
                       ${loading? "bg-blue-200  hover:bg-blue-200": "bg-blue-500  hover:bg-blue-600"}  `}
                    >Upload</button>
        </div>
    </div>
  );
};

export default Upload;