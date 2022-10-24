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
      <Center x={0} y={5} z={0} color={"#ffffff"} matrix={props.centers[0].mat} />
      <Center x={0} y={-5} z={0} color={"#ffff00"} matrix={props.centers[1].mat} />
      <Center x={0} y={0} z={5} color={"#00ff00"} matrix={props.centers[2].mat} />
      <Center x={-5} y={0} z={0} color={"#ffa500"} matrix={props.centers[3].mat} />
      <Center x={0} y={0} z={-5} color={"#0000ff"} matrix={props.centers[4].mat} />
      <Center x={5} y={0} z={0} color={"#ff0000"} matrix={props.centers[5].mat} />

      <Corner x={-5} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} color3={"#ffa500"} matrix={props.corners[0].mat} ori={props.corners[0].ori} />
      <Corner x={-5} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} color3={"#ffa500"} matrix={props.corners[1].mat} ori={props.corners[1].ori} />
      <Corner x={5} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} color3={"#ff0000"} matrix={props.corners[2].mat} ori={props.corners[2].ori} />
      <Corner x={5} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} color3={"#ff0000"} matrix={props.corners[3].mat} ori={props.corners[3].ori} />
      <Corner x={-5} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} color3={"#ffa500"} matrix={props.corners[4].mat} ori={props.corners[4].ori} />
      <Corner x={-5} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} color3={"#ffa500"} matrix={props.corners[5].mat} ori={props.corners[5].ori} />
      <Corner x={5} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} color3={"#ff0000"} matrix={props.corners[6].mat} ori={props.corners[6].ori} />
      <Corner x={5} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} color3={"#ff0000"} matrix={props.corners[7].mat} ori={props.corners[7].ori} />

      <Edge x={0} y={5} z={5} color1={"#ffffff"} color2={"#00ff00"} matrix={props.edges[0].mat} ori={props.edges[0].ori} />
      <Edge x={-5} y={5} z={0} color1={"#ffffff"} color2={"#ffa500"} matrix={props.edges[1].mat} ori={props.edges[1].ori} />
      <Edge x={0} y={5} z={-5} color1={"#ffffff"} color2={"#0000ff"} matrix={props.edges[2].mat} ori={props.edges[2].ori} />
      <Edge x={5} y={5} z={0} color1={"#ffffff"} color2={"#ff0000"} matrix={props.edges[3].mat} ori={props.edges[3].ori} />
      <Edge x={0} y={-5} z={5} color1={"#ffff00"} color2={"#00ff00"} matrix={props.edges[4].mat} ori={props.edges[4].ori} />
      <Edge x={-5} y={-5} z={0} color1={"#ffff00"} color2={"#ffa500"} matrix={props.edges[5].mat} ori={props.edges[5].ori} />
      <Edge x={0} y={-5} z={-5} color1={"#ffff00"} color2={"#0000ff"} matrix={props.edges[6].mat} ori={props.edges[6].ori} />
      <Edge x={5} y={-5} z={0} color1={"#ffff00"} color2={"#ff0000"} matrix={props.edges[7].mat} ori={props.edges[7].ori} />
      <Edge x={5} y={0} z={5} color1={"#00ff00"} color2={"#ff0000"} matrix={props.edges[8].mat} ori={props.edges[8].ori} />
      <Edge x={-5} y={0} z={5} color1={"#00ff00"} color2={"#ffa500"} matrix={props.edges[9].mat} ori={props.edges[9].ori} />
      <Edge x={-5} y={0} z={-5} color1={"#0000ff"} color2={"#ffa500"} matrix={props.edges[10].mat} ori={props.edges[10].ori} />
      <Edge x={5} y={0} z={-5} color1={"#0000ff"} color2={"#ff0000"} matrix={props.edges[11].mat} ori={props.edges[11].ori} />
    </group>
  )
}
