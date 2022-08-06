import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

type SpherePropType = ThreeElements['mesh'] & {
  radius?: number,
  widthSegments?: number,
  heightSegments?: number,
}

function Sphere(props: SpherePropType) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
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
      <meshStandardMaterial color={'blue'} />
    </mesh>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere
        position={[0, 0, 0]}
        radius={2}
        widthSegments={72}
        heightSegments={72}
      />
    </Canvas>
  </React.StrictMode>,
)
