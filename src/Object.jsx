import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const Object = ({setShowDiv}) => {
  let chg = useRef(null)
  const [isRotating, setIsRotating] = useState(true)

  const textures = useLoader(THREE.TextureLoader, [

    './shoe1.png',
    './shoe2.png',
    './shoe3.png',
    './shoe4.jpg',
    './shoe5.png'
  ])

  useFrame((state, delta) => {
    if (isRotating && chg.current) {
      chg.current.rotation.y += 0.3 * delta
    }
  })

  const handleClick = (e) => {
    setIsRotating(false)
    gsap.to(chg.current.position, {x: -3, y: 1.7, z: -0.5})
    chg.current.children.forEach(mesh => {
      gsap.to(mesh.material, { opacity: 0, duration: 1, onComplete: () => setShowDiv(true) });
    });
  }

  const radius = 1 // Adjust this value to change the cylinder's radius
  const height = 1.2 // Adjust this value to change the cylinder's height
  const segments = 5 // Number of segments in the cylinder

  return (
    <>
      <group ref={chg} rotation={[0, 1.7, 0]} onClick={handleClick}>
        {textures.map((texture, index) => {

          const angle = (index / segments) * Math.PI * 2
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius

          return (
            <mesh 
              key={index} 
              position={[x, 0, z]} 
              rotation={[0, angle + Math.PI, 0]}
            >
              <planeGeometry args={[1, height]} />
              <meshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
            </mesh>
          )
        })}
      </group>
    </>
  )
}

export default Object