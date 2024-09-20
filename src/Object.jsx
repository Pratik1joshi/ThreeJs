import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Object = () => {
  let texture = useTexture('./main.png')
  let chg = useRef(null)
  useFrame((state, delta) => {
    // chg.current.rotation.x += 0.1 * delta
    chg.current.rotation.y += 0.3 * delta
    // chg.current.rotation.z += 0.1 * delta
  })
  return (
    <group rotation={[ 0, 1.7, 0.5]}>
      <mesh ref={chg}>
        <cylinderGeometry args={[1.2, 1.2, 1.2, 60, 60, true]} />
        <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default Object