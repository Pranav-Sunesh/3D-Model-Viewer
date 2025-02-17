import { Canvas} from "@react-three/fiber";
import { Bounds, OrbitControls, Environment, Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import useStore from "../store/store";

interface ModelProps {
  model: string;
}

const Model = ({ model }: ModelProps) => {

  const { scene } = useGLTF(model);
  
    const setName: (name: string) => void = useStore(state =>state.setName);
    const setMeshName: (name: string) => void = useStore(state => state.setMeshName);
    const setXAxis: (val: number) => void = useStore(state => state.setXAxis);
    const setYAxis: (val: number) => void = useStore(state => state.setYAxis);
    const setZAxis: (val: number) => void = useStore(state => state.setZAxis);
    const setVertexCount: (count: number) => void = useStore(state => state.setVertexCount);
    const setSurfaceArea: (area: number) => void = useStore(state => state.setSurfaceArea);

  //Compute Surface Area
  const computeSurfaceArea = (geometry: THREE.BufferGeometry): number => {
    const geom = geometry.index ? geometry.toNonIndexed() : geometry;
    const posAttr = geom.attributes.position;
    let area = 0;
  
    for (let i = 0; i < posAttr.count; i += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const b = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1);
      const c = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2);

      const ab = new THREE.Vector3().subVectors(b, a);
      const ac = new THREE.Vector3().subVectors(c, a);
  
      const cross = new THREE.Vector3().crossVectors(ab, ac);
      const triangleArea = 0.5 * cross.length();
      area += triangleArea;
    }
    return area;
  };

  //Traversing through loaded meshes
    useEffect(() => {
        scene.traverse((sceneComponents) => {
            if((sceneComponents as THREE.Mesh).isMesh){
                const mesh = sceneComponents as THREE.Mesh;
                const geometry = mesh.geometry;
                geometry.computeBoundingBox();
                const bbox = geometry.boundingBox;
                const size = new THREE.Vector3();
                if(bbox){
                    bbox.getSize(size);
                }
                const vertexCount = geometry.attributes.position.count;
                const surfaceArea = computeSurfaceArea(geometry);

                setName(scene.name);
                setMeshName(mesh.name);
                setXAxis(size.x);
                setYAxis(size.y);
                setZAxis(size.z);
                setVertexCount(vertexCount);
                setSurfaceArea(surfaceArea);
                console.log("Mesh Name:", mesh.name || "Unnamed Mesh");
                console.log("Material:", mesh.material);
                console.log("Bounding Box Size:", size); // x, y, z size
                console.log("Vertex Count:", vertexCount);
                console.log("Surface Area:", surfaceArea);
            }
          })
    }, [scene])

  return (
    <Canvas>

      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight position={[0, -10, 10]} angle={0.22} penumbra={1} intensity={2} castShadow shadow-mapSize={1024} />

      <Bounds fit clip observe margin={1}>
        <Center>
            <primitive object={scene} dispose={null} />
        </Center>
      </Bounds>

      <Environment preset="sunset" />
      <OrbitControls />
    </Canvas>
  );
};

export default Model;
