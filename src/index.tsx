import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

type SpherePropType = ThreeElements['mesh'] & {
  radius?: number,
  widthSegments?: number,
  heightSegments?: number,
  wireframe?: boolean,
  color?: string,
}

function Sphere(props: SpherePropType) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => (ref.current.rotation.y -= 0.001))
  return (
    <mesh
      {...props}
      ref={ref}>
      <sphereBufferGeometry args={
        [
          props.radius ?? 1,
          props.widthSegments ?? 36,
          props.heightSegments ?? 36,
        ]}
      />
      <meshStandardMaterial
        wireframe={props.wireframe ?? false}
        color={props.color ?? 'white'}
      />
    </mesh>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas
      orthographic
      camera={{
        zoom: 720,
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 1000]} />
      <Sphere
        position={[-0.5, 0, 0]}
        radius={1}
        widthSegments={72}
        heightSegments={72}
        color={'white'}
      />
      <Sphere
        position={[-0.5, 0, 0]}
        radius={1.004}
        widthSegments={36}
        heightSegments={36}
        color={'#cccccc'}
        wireframe
      />
    </Canvas>
  </React.StrictMode>,
)
