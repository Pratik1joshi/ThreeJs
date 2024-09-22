import React from 'react'
import './Compart.css'
import { TextureLoader } from 'three'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

const Compart = ({ productDetails, onClose }) => {
  const texture = new TextureLoader().load(productDetails.image)
  return (
    <div className='compart border-2 border-red-400'>
      <button className='close-button h-10 w-10 bg-red-400 flex justify-center items-center' onClick={() => { console.log("Button clicked in Compart"); onClose(); }}>X</button>
      <div className='text-container'>
        <h1 className='name'>{productDetails.name}</h1>
        <p className='description'>{productDetails.description}</p>
        <p className='price'>Price: ${productDetails.price}</p>
        <p className='rating'>Rating: {productDetails.rating} / 5</p>
        <p className='size'>Size: {productDetails.size}</p>
      </div>
      <div className='canvas-container'>
        <Canvas flat camera={{ fov: 35 }} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <ambientLight />
          <mesh
            key={productDetails.id}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          >
            <planeGeometry args={[1, 1.2]} />
            <meshStandardMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
}

export default Compart