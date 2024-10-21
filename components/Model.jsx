import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Clock } from "three";
// import { useControls } from "leva";

function Model() {
  const mesh = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const { nodes } = useGLTF("/torrus.glb");
  const { viewport } = useThree();
  const clock = new Clock();

  useEffect(() => {
    if (nodes) {
      setIsLoading(false);
    }
  }, [nodes]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    mesh.current.rotation.x = elapsedTime;
  });

  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },
  //   ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },
  //   backside: { value: true },
  // });

  const mtmProps = {
    thickness: 0.15,
    roughness: 0.2,
    transmission: 1.0,
    ior: 1.2,
    chromaticAberration: 0.14,
    backside: false,
  };

  return (
    <>
      {isLoading && (
        <Text fontSize={1} position={[0, 0, -1]} color={"#ff0000"}>
          Loading...
        </Text>
      )}

      <group scale={viewport.width / 3.2}>
        <Text textAlign='center' fontSize={0.48} font='fonts/Inter_24pt-BoldItalic.ttf' position={[0, 0, -0.5]}>
          The First{"\n"}r3f{"\n"}Project
        </Text>

        <mesh ref={mesh} {...nodes.Torus002} position={[0, 0, 0]} scale={1.05}>
          <MeshTransmissionMaterial {...mtmProps} />
        </mesh>
      </group>
    </>
  );
}

export default Model;
