import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const Object = () => {
  return (
    <mesh position={[0, 0, 0]} scale={2}>
      <torusKnotGeometry attach="geometry" />
      {/* <meshLambertMaterial attach="material" color="red" /> */}
      <meshPhongMaterial 
      attach="material" 
      color={"red"} 
      depthTest={false}
      // envMap={Texture}
      transparent
      // alphaTest={0.35}
      opacity={0.99}
      reflectivity={1}
      emissive={"black"} 
      specular={"blue"} 
      shininess={40}
      />

    </mesh>
  );
};

const Object2 = () => {
  return (
    <mesh position={[0, 0, 0]} scale={3.9}>
      < icosahedronGeometry />
      {/* <meshLambertMaterial attach="material" color="red" /> */}
      <meshPhongMaterial 
      attach="material" 
      color={"blue"} 
      // depthTest={false}
      depthWrite={false}
      // envMap={Texture}
      transparent
      // alphaTest={0.35}
      opacity={0.5}
      reflectivity={1}
      emissive={"black"} 
      specular={"blue"} 
      shininess={4}
      />

    </mesh>
  );
};

const Object3 = () => {
  return (
    <mesh position={[0, 0, 0]} scale={5}>
      < tetrahedronGeometry />
      {/* <meshLambertMaterial attach="material" color="red" /> */}
      <meshPhongMaterial 
      attach="material" 
      color={"yellow"} 
      depthTest={false}
      // depthWrite={false}
      // envMap={Texture}
      transparent
      // alphaTest={0.35}
      opacity={0.2}
      reflectivity={1}
      emissive={"blue"} 
      specular={"red"} 
      shininess={4}
      />

    </mesh>
  );
};

export const Sphere = () => {
  return (
    <div className="sphere" style={{filter: "blur(0px)"}}>
      <Canvas camera={{ fov: 65, near: 1, far: 1000, position: [0, 0, 10] }}>
        <OrbitControls />
        <fog attach="fog" args={["white", 2, 25]}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 5]} angle={0.3} />
        <Object3/>
        <Object2 />
        <Object />
      </Canvas>
    </div>
  );
};
