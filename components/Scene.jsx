"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";

function Scene() {
  return (
    <Canvas>
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset='warehouse' />
      <Model />
    </Canvas>
  );
}

export default Scene;
