import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function Box(props) {
  const box = useRef()

  // use effect?
  const x = props.x
  const y = props.y
  const z = props.z

  const angle = Math.PI / 2

  const ox = ( x === 0 && z !== 0 ) ? angle : 0
  const oy = 0
  const oz = (x!==0 && z===0)? angle : 0

  const color = props.color

  const quat = new THREE.Quaternion()

  quat.setFromRotationMatrix( props.matrix )

  useFrame(() => {
    box.current.quaternion.slerp(quat,0.1)
  })


  return (
    <group ref={box}>
      <RoundedBox
        args={[1, 1, 1]}
        // {...props}
        position={[x, y, z]} 
        scale={[4.8, 4.8, 4.8]}
        // onClick={rotate}
      >
        <meshStandardMaterial
          attach="material"
          color={'#1c1e26'}
          />
        <RoundedBox
          args={[1, 1, 1]}
          position={[x/10, y/10, z/10]} 
          scale={[0.8, 0.05, 0.8]}
          rotation={[ ox, oy, oz]}
        >
          <meshStandardMaterial
            attach="material"
            color={color}
            />
        </RoundedBox>
      </RoundedBox>
    </group>
  )
}
