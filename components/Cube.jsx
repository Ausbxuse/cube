import { useState, useEffect, useRef } from 'react'
import Center from '../components/Center'
import Edge from '../components/Edge'
import Corner from '../components/Corner'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Cube(props) {
  const wholeCube = useRef()
  // var x = 0
  useFrame((state, delta) => {
    // x += 0.05
    // wholeCube.current.position.y = 0.5 * Math.cos(x)
  })

  return (
    <group ref={wholeCube}>
      <Center x={0} y={5} z={0} color={"#ffffff"} matrix={props.center0.mat} />
      <Center x={0} y={-5} z={0} color={"#ffff00"} matrix={props.center1.mat} />
      <Center x={0} y={0} z={5} color={"#00ff00"} matrix={props.center2.mat} />
      <Center x={-5} y={0} z={0} color={"#ffa500"} matrix={props.center3.mat} />
      <Center x={0} y={0} z={-5} color={"#0000ff"} matrix={props.center4.mat} />
      <Center x={5} y={0} z={0} color={"#ff0000"} matrix={props.center5.mat} />

      <Corner x={-5} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} color3={"#ffa500"} matrix={props.corner0.mat} ori={props.corner0.ori} />
      <Corner x={-5} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} color3={"#ffa500"} matrix={props.corner1.mat} ori={props.corner1.ori} />
      <Corner x={5} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} color3={"#ff0000"} matrix={props.corner2.mat} ori={props.corner2.ori} />
      <Corner x={5} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} color3={"#ff0000"} matrix={props.corner3.mat} ori={props.corner3.ori} />
      <Corner x={-5} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} color3={"#ffa500"} matrix={props.corner4.mat} ori={props.corner4.ori} />
      <Corner x={-5} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} color3={"#ffa500"} matrix={props.corner5.mat} ori={props.corner5.ori} />
      <Corner x={5} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} color3={"#ff0000"} matrix={props.corner6.mat} ori={props.corner6.ori} />
      <Corner x={5} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} color3={"#ff0000"} matrix={props.corner7.mat} ori={props.corner7.ori} />

      <Edge x={0} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} matrix={props.edge0.mat} ori={props.edge0.ori} />
      <Edge x={-5} y={5} z={0} color1={"#ffffff"} color2={"#ffa500"} matrix={props.edge1.mat} ori={props.edge1.ori} />
      <Edge x={0} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} matrix={props.edge2.mat} ori={props.edge2.ori} />
      <Edge x={5} y={5} z={0} color1={"#ffffff"} color2={"#ff0000"} matrix={props.edge3.mat} ori={props.edge3.ori} />
      <Edge x={0} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} matrix={props.edge4.mat} ori={props.edge4.ori} />
      <Edge x={-5} y={-5} z={0} color1={"#ffff00"} color2={"#ffa500"} matrix={props.edge5.mat} ori={props.edge5.ori} />
      <Edge x={0} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} matrix={props.edge6.mat} ori={props.edge6.ori} />
      <Edge x={5} y={-5} z={0} color1={"#ffff00"} color2={"#ff0000"} matrix={props.edge7.mat} ori={props.edge7.ori} />
      <Edge x={5} y={0} z={5} color1={"#00ff00"} color2={"#ff0000"} matrix={props.edge8.mat} ori={props.edge8.ori} />
      <Edge x={-5} y={0} z={5} color1={"#00ff00"} color2={"#ffa500"} matrix={props.edge9.mat} ori={props.edge9.ori} />
      <Edge x={-5} y={0} z={-5} color1={"#0000ff"} color2={"#ffa500"} matrix={props.edge10.mat} ori={props.edge10.ori} />
      <Edge x={5} y={0} z={-5} color1={"#0000ff"} color2={"#ff0000"} matrix={props.edge11.mat} ori={props.edge11.ori} />
    </group>
  )
}
