import React, { useEffect, useRef } from 'react'
import './Compart.css'
import { TextureLoader } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'

const RotatingPlane = ({ texture }) => {
  const meshRef = useRef()

  useEffect(() => {
    // Set initial scale
    gsap.set(meshRef.current.scale, { x: 3, y: 3, z: 3 })
    // Animate scale from 3 to 1
    gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 })
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[2, 2.4]} />
      <meshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  )
}

const Compart = ({ productDetails, onClose }) => {
  const texture = new TextureLoader().load(productDetails.image)
  const containerRef = useRef(null)
  const textContainerRef = useRef(null)
  const canvasContainerRef = useRef(null)

  useEffect(() => {
    // Set initial styles
    gsap.set(containerRef.current, { opacity: 0 })
    gsap.set(textContainerRef.current.children, { y: 20, opacity: 0 })
    gsap.set(canvasContainerRef.current, { scale: 0.8, opacity: 0 })

    // Create animation timeline
    const tl = gsap.timeline()
    tl.to(containerRef.current, { opacity: 1, duration: 1 })
      .to(textContainerRef.current.children, { y: 0, opacity: 1, stagger: 0.2, duration: 0.5 }, "-=0.5")
      .to(canvasContainerRef.current, { scale: 1, opacity: 1, duration: 1 }, "-=0.5")
  }, [])

  return (
    <div ref={containerRef} className='compart px-10 py-10'>
      <button className='close-button h-10 w-10 bg-red-400 flex justify-center items-center' onClick={() => { console.log("Button clicked in Compart"); onClose(); }}>X</button>
      <div ref={textContainerRef} className='text-container'>
        <h1 className='name'>{productDetails.name}</h1>
        <p className='description'>{productDetails.description}</p>
        <p className='price'>Price: ${productDetails.price}</p>
        <p className='rating'>Rating: {productDetails.rating} / 5</p>
        <p className='size'>Size: {productDetails.size}</p>
        <button className='px-6 py-2 bg-red-500'>Add to cart</button>
      </div>
      <div ref={canvasContainerRef} className='canvas-container'>
        <Canvas flat camera={{ fov: 35 }} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <ambientLight />
          <RotatingPlane texture={texture} />
        </Canvas>
      </div>
    </div>
  )
}

export default Compart