import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";


const RotatingCube = () => {
  const meshRef = useRef(null);

  useFrame(() => {
    meshRef.current.rotation.x += 0.02;
    meshRef.current.rotation.y += 0.02;
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="green" wireframe />
    </mesh>
  )
}

const Loading = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <RotatingCube />
    </Canvas>
  );
};

export default Loading;