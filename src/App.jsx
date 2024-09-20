import React from 'react'
import './App.css'
import './style.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Object from './Object'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function App() {
  return (
    <>
      <div className='heading w-full py-6 text-red-800 font-bold text-4xl justify-center items-center flex bg-transparent'>
        <h1>NEW ARRIVALS</h1>
      </div>
      <Canvas flat camera={{ fov: 35 }}>
        <ambientLight />
        <Object />
        <EffectComposer>
          <Bloom mipmapBlur intensity={7} luminanceThreshold={0} luminanceSmoothing={0} />
        </EffectComposer>
      </Canvas>
    </>
  )
}

export default App
