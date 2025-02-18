import axios from "axios";
import { useEffect, useState } from "react";

const useFileExits = (url: string) => {
  const [exists, setExists] = useState<boolean>(true);
  useEffect(() => {
    if(!url) return;
    const checkFile = async() => {
        try {
            const response = await axios.head(url);
            if(response.status !== 200){
                setExists(false);
            }else{
                setExists(true);
            }
        } catch (error) {
            console.log(error)
            setExists(false)
        }
    }
    checkFile()
  }, [url])

  return exists

};  

export default useFileExits;