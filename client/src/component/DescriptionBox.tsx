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
        className="w-full h-full text-white"
        >
           <p className="p-2 text-xl ">Model Description:</p>
           <div
            className="p-3 text-lg space-y-2"
            >
                <p><b>Name:</b> {name}</p>
                <p><b>Mesh Name:</b> {meshName}</p>
                <p><b>BBox X:</b>{xAxis}</p>
                <p><b>BBox Y:</b>{yAxis}</p>
                <p><b>BBox Z:</b>{zAxis}</p>
                <p><b>Surface Area:</b>{surfaceArea}</p>
                <p><b>Vertex Count:</b>{vertexCount}</p>
           </div>
    </div>
  );
};

export default DescriptionBox;