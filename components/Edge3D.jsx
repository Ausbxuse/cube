import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function Box(props) {
  const box = useRef()

  const angle = Math.PI / 2

  const x = props.x
  const y = props.y
  const z = props.z

  // sticker position
  const x1 = 0
  const y1 = (x===0 || z===0) ? y / 10 : 0
  const z1 = (y===0)? z / 10 : 0

  const x2 = (z===0 || y===0) ? x / 10 : 0
  const y2 = 0
  const z2 = (x===0) ? z / 10 : 0

  // sticker orientation
  const ox1 = (y===0)? angle : 0
  const oy1 = 0
  const oz1 = 0

  const ox2 = (x===0)? angle : 0
  const oy2 = 0
  const oz2 = (z===0 || y===0)? angle : 0

  // sticker color

  const color1 = props.color1
  const color2 = props.color2

  const quat = new THREE.Quaternion()

  quat.setFromRotationMatrix( props.matrix )

  useFrame(() => {
    box.current.quaternion.slerp(quat,0.1)
  })


  return (
    <group ref={box} >
      <RoundedBox
        args={[1, 1, 1]}
        {...props}
        position={[x, y, z]} 
        scale={[4.8, 4.8, 4.8]}
      >
        <meshStandardMaterial
          attach="material"
          color={'#1c1e26'}
          />
        <RoundedBox
          args={[1, 1, 1]}
          position={[x1, y1, z1]} 
          scale={[0.8, 0.05, 0.8]}
          rotation={[ ox1, oy1, oz1]}
        >
          <meshStandardMaterial
            attach="material"
            color={color1}
            />
        </RoundedBox>
        <RoundedBox
          args={[1, 1, 1]}
          position={[x2, y2, z2]} 
          scale={[0.8, 0.05, 0.8]}
          rotation={[ ox2, oy2, oz2 ]}
        >
          <meshStandardMaterial
            attach="material"
            color={color2}
            />
        </RoundedBox>
      </RoundedBox>
    </group>
  )
}
