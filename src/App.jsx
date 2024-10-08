import React, { useState } from 'react'
import './App.css'
import './style.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Object from './Object'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Compart from './Compart'

function App() {
  const [showDiv, setShowDiv] = useState(false)
  const [productDetails, setProductDetails] = useState(null)

  const handleClose = () => {
    console.log("Close button clicked in App") // Debugging line
    setShowDiv(false)
    setProductDetails(null)
  }

  return (
    <>
      <div className='heading w-full py-6 text-red-800 font-bold text-4xl justify-center items-center flex bg-transparent'>
        <h1>NEW ARRIVALS</h1>
      </div>
      {!showDiv && (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <Canvas flat camera={{ fov: 35 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <ambientLight />
            <group rotation={[0, 1.7, 0.5]}>
              <Object setShowDiv={setShowDiv} setProductDetails={setProductDetails} />
            </group>
            <EffectComposer>
              <Bloom mipmapBlur intensity={7} luminanceThreshold={0} luminanceSmoothing={0} />
            </EffectComposer>
          </Canvas>
        </div>
      )}
      
      {showDiv && productDetails && (
          <Compart productDetails={productDetails} onClose={handleClose} />
      )}
      
    </>
  )
}

export default App
