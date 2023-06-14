import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {Object_1, Object_2} from '../components/uilib/Object'


export const Sphere = () => {
  return (
    <div className="sphere" style={{filter: "blur(0px)"}}>
      <Canvas 
      camera={{ fov: 65, near: 1, far: 1000, position: [0, 0, 10] }}
      gl={{ preserveDrawingBuffer: true }}
      >
        <OrbitControls />
        <fog attach="fog" args={["white", 2, 25]}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 50, 5]} angle={0.3} />

        <Object_1 />
        <Object_2 />

      </Canvas>
    </div>
  );
};
