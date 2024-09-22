import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const Object = ({ setShowDiv, setProductDetails }) => {
  let chg = useRef(null)
  const [isRotating, setIsRotating] = useState(true)

  const textures = useLoader(THREE.TextureLoader, [
    './shoe1.png',
    './shoe2.png',
    './shoe3.png',
    './shoe4.jpg',
    './shoe5.png'
  ])

  const products = [
    { id: 1, name: 'Shoe 1',image: './shoe1.png', description: 'Description for shoe 1' },
    { id: 2, name: 'Shoe 2',image: './shoe2.png', description: 'Description for shoe 2' },
    { id: 3, name: 'Shoe 3',image: './shoe3.png', description: 'Description for shoe 3' },
    { id: 4, name: 'Shoe 4',image: './shoe4.jpg', description: 'Description for shoe 4' },
    { id: 5, name: 'Shoe 5',image: './shoe5.png', description: 'Description for shoe 5' }
  ]

  useFrame((state, delta) => {
    if (isRotating && chg.current) {
      chg.current.rotation.y += 0.3 * delta
    }
  })

  const handleClick = (index) => {
    setIsRotating(false)
    gsap.to(chg.current.position, { x: -3, y: 1.7, z: -0.5 })
    chg.current.children.forEach((mesh, i) => {
      gsap.to(mesh.material, { opacity: 0, duration: 1, onComplete: () => {
        if (i === index) {
          setProductDetails(products[index])
          setShowDiv(true)
        }
      }})
    })
  }

  const radius = 1 // Adjust this value to change the cylinder's radius
  const height = 1.2 // Adjust this value to change the cylinder's height
  const segments = 5 // Number of segments in the cylinder

  return (
    <>
      <group ref={chg} rotation={[0, 1.7, 0]}>
        {textures.map((texture, index) => {
          const angle = (index / segments) * Math.PI * 2
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius

          return (
            <mesh 
              key={index} 
              position={[x, 0, z]} 
              rotation={[0, angle + Math.PI, 0]}
              onClick={() => handleClick(index)}
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