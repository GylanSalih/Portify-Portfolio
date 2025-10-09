'use client';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function CustomModel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '85vh',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
          toneMapping: THREE.NoToneMapping,
        }}
        onCreated={({ gl, scene }) => {
          gl.outputEncoding = THREE.LinearSRGBColorSpace;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.physicallyCorrectLights = true;
          // Set solid background color (sky blue as an example)
          scene.background = new THREE.Color(0x000000); // You can change the color to any valid hex code
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-right={15}
          shadow-camera-left={-15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />

        <Model />
        {isClient && <OrbitControls />}
      </Canvas>
    </div>
  );
}

function Model() {
  const { scene } = useGLTF('/assets/models/AkiraBike/akirabike.glb');
  scene.scale.set(0.02, 0.02, 0.02);
  scene.position.set(0, -2, 0);
  scene.rotation.set(0, Math.PI / 2, 0);
  scene.castShadow = true; // Ensure the model casts shadows
  scene.receiveShadow = true; // Ensure the model receives shadows
  return <primitive object={scene} />;
}
