import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Stars } from "@react-three/drei";
import useGlobal from "../../hooks/useGlobal";
import { $geometry, $color } from "../../states/geometry";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Environment } from "@react-three/drei";
// import * as THREE from "three";
import { Mesh } from 'three'


type GLTFResult = GLTF & {
  nodes: {
    deformation1: THREE.Mesh;
  };
  materials: {};
};

export const Object_1 = (props: JSX.IntrinsicElements["group"]) => {

  const geometry = useGlobal($geometry);
  const color = useGlobal($color);
  const { nodes, materials } = useGLTF("/Object_1.gltf") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        
        castShadow
        receiveShadow
        geometry={nodes.deformation1.geometry}
        material={nodes.deformation1.material}
        scale={parseInt(geometry.scale) * 0.001}
      >
        <meshPhongMaterial
          attach="material"
          color={`hsl(${360 - parseInt(color)}, 20%, 50%)`}
          depthTest={false}
          // envMap={Texture}
          transparent
          // alphaTest={0.35}
          opacity={0.9}
          reflectivity={1}
          // emissive={"black"}
          // emissive={`hsl(${color}, 100%, 0%)`}
          // specular={"blue"}
          specular= {`hsl(${color}, 90%, 50%)`} 
          shininess={40}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("/Object_1.gltf");

type GLTFResult_2 = GLTF & {
    nodes: {
      Polygon: THREE.Mesh;
    };
    materials: {};
  };

export const Object_2 = (props: JSX.IntrinsicElements["group"]) => {
  const geometry = useGlobal($geometry);
  const color = useGlobal($color);
  const { nodes, materials } = useGLTF("Object_2.gltf") as GLTFResult_2;
  const object = useRef<Mesh>(null!);

  useFrame(() => {
    object.current.rotation.x= object.current.rotation.y +=0.0002
    // const a = clock.getElapsedTime();
    // object.current.rotation.z = a*0.02;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
      ref = {object}
        castShadow
        receiveShadow
        geometry={nodes.Polygon.geometry}
        material={nodes.Polygon.material}
        scale={parseInt(geometry.scale) * 0.006 }
      >
      <meshPhongMaterial
          attach="material"
          color={`hsl(${color}, 20%, 50%)`}
          transparent
          reflectivity={1}
          specular={`hsl(${360 - parseInt(color)}, 90%, 50%)`}
          shininess={40}
        />
        </mesh>
    </group>
  );
};

useGLTF.preload("/Object_2.gltf");


