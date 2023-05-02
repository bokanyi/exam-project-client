import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import useGlobal from "../../hooks/useGlobal";
import { $geometry, $color } from "../../states/geometry"


const Object = () => {
  
    const geometry = useGlobal($geometry)
    const color = useGlobal($color)
  
    return (
        <>
        
      <mesh position={[0, 0, 0]} scale={parseInt(geometry.scale)}>
        <ringGeometry attach="geometry" args={[0, 1, 32]}/>
        {/* <meshLambertMaterial attach="material" color="red" /> */}
        
        <meshPhongMaterial 
        attach="material" 
        color={`hsl(${color}, 20%, 50%)`}
        depthTest={false}
        // envMap={Texture}
        transparent
        // alphaTest={0.35}
        opacity={0.99}
        reflectivity={1}
        // emissive={"black"} 
        // emissive={`hsl(${color}, 100%, 0%)`}
        // specular={"blue"} 
        specular={`hsl(${360-parseInt(color)}, 90%, 50%)`}
        shininess={40}
        />
      </mesh>
      <mesh position={[1, 1, 0]} scale={0.5}>
        <capsuleGeometry attach="geometry" />
        {/* <meshLambertMaterial attach="material" color="red" /> */}
        <meshPhongMaterial 
        attach="material" 
        color= "white"
        depthTest={false}
        // envMap={Texture}
        transparent
        // alphaTest={0.35}
        opacity={0.99}
        reflectivity={1}
        // emissive={"black"} 
        // emissive={`hsl(${color}, 100%, 0%)`}
        // specular={"blue"} 
        specular={`hsl(${360-parseInt(color)}, 90%, 50%)`}
        shininess={40}
        />
      </mesh>
        </>

    );
  };

  export const RangeInput = () => {
    return (
      <div className="sphere" style={{filter: "blur(0px)"}}>
        <Canvas camera={{ fov: 65, near: 1, far: 1000, position: [0, 0, 10] }}>
          {/* <OrbitControls /> */}
          <fog attach="fog" args={["white", 2, 25]}/>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 5]} angle={0.3} />
          <Object />
        </Canvas>
      </div>
    );
  };
  