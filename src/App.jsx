import React, { useState } from 'react'
import './App.css'
import './style.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Object from './Object'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function App() {
  const [showDiv, setShowDiv] = useState(false)

  return (
    <>
      <div className='heading w-full py-6 text-red-800 font-bold text-4xl justify-center items-center flex bg-transparent'>
        <h1>NEW ARRIVALS</h1>
      </div>
      {!showDiv &&(
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Canvas flat camera={{ fov: 35 }} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          <ambientLight />
          <group rotation={[0, 1.7, 0.5]}>
            <Object setShowDiv={setShowDiv} />
          </group>
          <EffectComposer>
            <Bloom mipmapBlur intensity={7} luminanceThreshold={0} luminanceSmoothing={0} />
          </EffectComposer>
        </Canvas>
        </div>
      )}
      
        {showDiv && (
          <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#ffffff', padding: '20px',}}>
            <h1>New Content Here</h1>
          </div>
        )}
      
    </>
  )
}

export default App
