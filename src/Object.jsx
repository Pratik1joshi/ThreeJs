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
    { id: 1, name: 'Shoe 1',image: './shoe1.png', price: 59.99, description: 'Step up your game with the Urban Runner Sneakers, designed for comfort and style. Featuring a lightweight mesh upper and a cushioned sole, these sneakers are perfect for daily wear or casual outings. Available in a variety of colors, they offer breathability and all-day comfort.' },
    { id: 2, name: 'Shoe 2',image: './shoe2.png', price: 89.99, description: 'Elevate your formal look with these Classic Leather Oxfords. Crafted from premium leather with a timeless design, these shoes are perfect for business meetings and special occasions. The padded insole ensures maximum comfort, making them an ideal choice for long hours of wear.' },
    { id: 3, name: 'Shoe 3',image: './shoe3.png', price: 99.99, description: 'Conquer the outdoors with the Adventure Hiking Boots. Built for rugged terrain, these boots feature a durable waterproof exterior, reinforced toe, and extra grip soles. Perfect for hiking, camping, and outdoor activities, they provide stability and protection in any weather condition.' },
    { id: 4, name: 'Shoe 4',image: './shoe4.jpg', price: 69.99, description: 'Stay stylish and comfortable with the Modern Slip-On Loafers. These versatile shoes are designed with a soft, flexible sole and a sleek leather finish. Easy to wear and perfect for both casual and semi-formal settings, they offer an effortless blend of sophistication and ease.' },
    { id: 5, name: 'Shoe 5',image: './shoe5.png', price: 79.99, description: 'Gear up for your workout with the Athletic Performance Trainers. Designed with advanced cushioning technology and breathable mesh fabric, these trainers ensure optimal support and comfort during intense activities. The non-slip outsole provides excellent traction for running, gym sessions, or any sport.' }
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