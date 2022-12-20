import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function Corner3D(props) {
  // const [ ori, setOri ] = useState(0)
  // const [ mat, setMat ] = useState(new THREE.Matrix4())

  // function toString() {
  //   // console.log("Matrix = " + mat + "\n position = (" + this.x + ", " + this.y + ", " + this.z + ")\n orientation = " + this.ori + "\n color = (" + this.color1 + ", " + this.color2 + ", " + this.color3 + ")")
  // }


  const box = useRef()
  const angle = Math.PI / 2

  // use effect?
  // const [x, setX] = useState(props.x)
  const x = props.x
  const y = props.y
  const z = props.z

  // sticker position
  const x1 = 0
  const y1 = y / 10
  const z1 = 0

  const x2 = 0
  const y2 = 0
  const z2 = z / 10

  const x3 = x / 10
  const y3 = 0
  const z3 = 0

  // sticker orientation
  const ox1 = 0
  const oy1 = 0
  const oz1 = 0

  const ox2 = angle
  const oy2 = 0
  const oz2 = 0

  const ox3 = 0
  const oy3 = 0
  const oz3 = angle
  // sticker color

  const color1 = props.color1
  const color2 = props.color2
  const color3 = props.color3

  const quat = new THREE.Quaternion()

  quat.setFromRotationMatrix(props.matrix)

  useFrame(() => {
    box.current.quaternion.slerp(quat, 0.1)
  })

  return (
    <group ref={box} >
      <RoundedBox
        args={[1, 1, 1]}
        {...props}
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
          position={[x1, y1, z1]}
          scale={[0.8, 0.05, 0.8]}
          rotation={[ox1, oy1, oz1]}
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
          rotation={[ox2, oy2, oz2]}
        >
          <meshStandardMaterial
            attach="material"
            color={color2}
          />
        </RoundedBox>
        <RoundedBox
          args={[1, 1, 1]}
          position={[x3, y3, z3]}
          scale={[0.8, 0.05, 0.8]}
          rotation={[ox3, oy3, oz3]}
        >
          <meshStandardMaterial
            attach="material"
            color={color3}
          />
        </RoundedBox>
      </RoundedBox>
    </group>
  )
}
