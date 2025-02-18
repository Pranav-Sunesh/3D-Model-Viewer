import useStore from "../store/store";


const DescriptionBox = () => {
    

    const name: string = useStore(state => state.name);
    const meshName: string = useStore(state => state.meshName);
    const xAxis: number = useStore(state => state.xAxis);
    const yAxis: number = useStore(state => state.yAxis);
    const zAxis: number = useStore(state => state.zAxis);
    const vertexCount: number = useStore(state => state.vertexCount);
    const surfaceArea: number = useStore(state => state.surfaceArea);
    

   

  return (
    <div
      id="description-box"
        className=" h-full text-white ml-10"
        >
           <p className="p-2 text-xl ">Model Description:</p>
           <div
            className="p-3 text-lg space-y-2"
            >
                <p><b className="mr-5">Name:</b>{name}</p>
                <p><b className="mr-5">Mesh Name:</b> {meshName}</p>
                <p><b className="mr-5">BBox X:</b>{xAxis}</p>
                <p><b className="mr-5">BBox Y:</b>{yAxis}</p>
                <p><b className="mr-5">BBox Z:</b>{zAxis}</p>
                <p><b className="mr-5">Surface Area:</b>{surfaceArea}</p>
                <p><b className="mr-5">Vertex Count:</b>{vertexCount}</p>
           </div>
           
    </div>
  );
};

export default DescriptionBox;