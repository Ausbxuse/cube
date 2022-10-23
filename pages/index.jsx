import { useState, useEffect, useRef, useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import Cube from '../components/Cube'
import utilStyles from '../styles/utils.module.css'
import * as THREE from 'three'

export default function Home() {

  const keyBoard = useRef()
  const [movesString, setMovesString] = useState("Moves: ")
  const [key, setKey] = useState("")

  const mMat0 = new THREE.Matrix4()
  const mMat1 = new THREE.Matrix4()
  const mMat2 = new THREE.Matrix4()
  const mMat3 = new THREE.Matrix4()
  const mMat4 = new THREE.Matrix4()
  const mMat5 = new THREE.Matrix4()

  const cMat0 = new THREE.Matrix4()
  const cMat1 = new THREE.Matrix4()
  const cMat2 = new THREE.Matrix4()
  const cMat3 = new THREE.Matrix4()
  const cMat4 = new THREE.Matrix4()
  const cMat5 = new THREE.Matrix4()
  const cMat6 = new THREE.Matrix4()
  const cMat7 = new THREE.Matrix4()

  const eMat0 = new THREE.Matrix4()
  const eMat1 = new THREE.Matrix4()
  const eMat2 = new THREE.Matrix4()
  const eMat3 = new THREE.Matrix4()
  const eMat4 = new THREE.Matrix4()
  const eMat5 = new THREE.Matrix4()
  const eMat6 = new THREE.Matrix4()
  const eMat7 = new THREE.Matrix4()
  const eMat8 = new THREE.Matrix4()
  const eMat9 = new THREE.Matrix4()
  const eMat10 = new THREE.Matrix4()
  const eMat11 = new THREE.Matrix4()

  function arraySwap(arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  };

  const [center0, setM0] = useState({ mat: mMat0, id: 0 }) // id indicates the correct location index
  const [center1, setM1] = useState({ mat: mMat1, id: 1 })
  const [center2, setM2] = useState({ mat: mMat2, id: 2 })
  const [center3, setM3] = useState({ mat: mMat3, id: 3 })
  const [center4, setM4] = useState({ mat: mMat4, id: 4 })
  const [center5, setM5] = useState({ mat: mMat5, id: 5 })

  const [corner0, setC0] = useState({ mat: cMat0, ori: 0, id: 0 })
  const [corner1, setC1] = useState({ mat: cMat1, ori: 0, id: 1 })
  const [corner2, setC2] = useState({ mat: cMat2, ori: 0, id: 2 })
  const [corner3, setC3] = useState({ mat: cMat3, ori: 0, id: 3 })
  const [corner4, setC4] = useState({ mat: cMat4, ori: 0, id: 4 })
  const [corner5, setC5] = useState({ mat: cMat5, ori: 0, id: 5 })
  const [corner6, setC6] = useState({ mat: cMat6, ori: 0, id: 6 })
  const [corner7, setC7] = useState({ mat: cMat7, ori: 0, id: 7 })

  const [edge0, setE0] = useState({ mat: eMat0, ori: 0, id: 0 })
  const [edge1, setE1] = useState({ mat: eMat1, ori: 0, id: 1 })
  const [edge2, setE2] = useState({ mat: eMat2, ori: 0, id: 2 })
  const [edge3, setE3] = useState({ mat: eMat3, ori: 0, id: 3 })
  const [edge4, setE4] = useState({ mat: eMat4, ori: 0, id: 4 })
  const [edge5, setE5] = useState({ mat: eMat5, ori: 0, id: 5 })
  const [edge6, setE6] = useState({ mat: eMat6, ori: 0, id: 6 })
  const [edge7, setE7] = useState({ mat: eMat7, ori: 0, id: 7 })
  const [edge8, setE8] = useState({ mat: eMat8, ori: 0, id: 8 })
  const [edge9, setE9] = useState({ mat: eMat9, ori: 0, id: 9 })
  const [edge10, setE10] = useState({ mat: eMat10, ori: 0, id: 10 })
  const [edge11, setE11] = useState({ mat: eMat11, ori: 0, id: 11 })

  // The order in the array matters. setterState so to correspond with the same piece.
  const [cornerState, setCornerState] = useState([corner0, corner1, corner2, corner3, corner4, corner5, corner6, corner7])
  const [cornerSetterState, setCornerSetterState] = useState([setC0, setC1, setC2, setC3, setC4, setC5, setC6, setC7])

  const [edgeState, setEdgeState] = useState([edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11])
  const [edgeSetterState, setEdgeSetterState] = useState([setE0, setE1, setE2, setE3, setE4, setE5, setE6, setE7, setE8, setE9, setE10, setE11])

  const [centerState, setCenterState] = useState([center0, center1, center2, center3, center4, center5])
  const [centerSetterState, setCenterSetterState] = useState([setM0, setM1, setM2, setM3, setM4, setM5])


  function rotatePosition(pieces, isCorner, direction) {
    if (isCorner) {
      if (direction === "negative") {
        for (var i = 0; i < 3; i++) {
          var tmpCornerState = cornerState
          arraySwap(tmpCornerState, pieces[i], pieces[3])
          setCornerState(tmpCornerState)

          var tmpCornerSetterState = cornerSetterState
          arraySwap(tmpCornerSetterState, pieces[i], pieces[3])
          setCornerSetterState(tmpCornerSetterState)
        }
      } else {  // when direction === "positive"
        for (var i = 2; i >= 0; i--) {
          var tmpCornerState = cornerState
          arraySwap(tmpCornerState, pieces[i], pieces[3])
          setCornerState(tmpCornerState)

          var tmpCornerSetterState = cornerSetterState
          arraySwap(tmpCornerSetterState, pieces[i], pieces[3])
          setCornerSetterState(tmpCornerSetterState)
        }
      }
    } else {
      if (direction === "negative") {
        for (var i = 0; i < 3; i++) {
          var tmpEdgeState = edgeState
          arraySwap(tmpEdgeState, pieces[i], pieces[3])
          setEdgeState(tmpEdgeState)

          var tmpEdgeSetterState = edgeSetterState
          arraySwap(tmpEdgeSetterState, pieces[i], pieces[3])
          setEdgeSetterState(tmpEdgeSetterState)

        }
      } else {  // when direction === "positive"
        for (var i = 2; i >= 0; i--) {
          var tmpEdgeState = edgeState
          arraySwap(tmpEdgeState, pieces[i], pieces[3])
          setEdgeState(tmpEdgeState)

          var tmpEdgeSetterState = edgeSetterState
          arraySwap(tmpEdgeSetterState, pieces[i], pieces[3])
          setEdgeSetterState(tmpEdgeSetterState)
        }
      }

    }
  }

  function move(corners, edges, axis, direction, center) {
    if (direction === "positive") {
      const angle = Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {

        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatY), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatY), ...edgeState[edges[i]] })
        }

        // oris remain unchanged

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatY), ...centerState[center] })
      } else if (axis === "x") {
        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatX), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatX), ...edgeState[edges[i]] })
        }
        // set oris
        cornerSetterState[corners[0]]({ ori: (cornerState[corners[0]].ori + 1) % 3, ...cornerState[corners[0]] })
        cornerSetterState[corners[2]]({ ori: (cornerState[corners[2]].ori + 1) % 3, ...cornerState[corners[2]] })
        cornerSetterState[corners[1]]({ ori: (cornerState[corners[1]].ori - 1) % 3, ...cornerState[corners[1]] })
        cornerSetterState[corners[3]]({ ori: (cornerState[corners[3]].ori - 1) % 3, ...cornerState[corners[3]] })

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatX), ...centerState[center] })

      } else if (axis === "z") {
        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatZ), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatZ), ...edgeState[edges[i]] })
        }

        cornerSetterState[corners[0]]({ ori: (cornerState[corners[0]].ori + 1) % 3, ...cornerState[corners[0]] })
        cornerSetterState[corners[2]]({ ori: (cornerState[corners[2]].ori + 1) % 3, ...cornerState[corners[2]] })
        cornerSetterState[corners[1]]({ ori: (cornerState[corners[1]].ori - 1) % 3, ...cornerState[corners[1]] })
        cornerSetterState[corners[3]]({ ori: (cornerState[corners[3]].ori - 1) % 3, ...cornerState[corners[3]] })

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatZ), ...centerState[center] })
      }
    } else if (direction === "negative") {
      const angle = - Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {
        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatY), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatY), ...edgeState[edges[i]] })
        }

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatY), ...centerState[center] })
      } else if (axis === "x") {
        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatX), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatX), ...edgeState[edges[i]] })
        }
        // console.log("Before: ")
        // console.log(cornerState)
        // setC3({ ...corner3, ori: (corner3.ori + 1) % 3 })
        // console.log("Result")
        // console.log(corner3)
        cornerSetterState[corners[0]](prevCornerState => ({ ori: (prevCornerState.ori - 1) % 3, ...prevCornerState }))
        cornerSetterState[corners[2]](prevCornerState => ({ ori: (prevCornerState.ori - 1) % 3, ...prevCornerState }))
        cornerSetterState[corners[1]](prevCornerState => ({ ori: (prevCornerState.ori - 1) % 3, ...prevCornerState }))
        cornerSetterState[corners[3]](prevCornerState => ({ ori: (prevCornerState.ori - 1) % 3, ...prevCornerState }))
        // cornerSetterState[corners[2]]({ ori: (cornerState[corners[2]].ori - 1) % 3, ...cornerState[corners[2]] })
        // cornerSetterState[corners[1]]({ ori: (cornerState[corners[1]].ori + 1) % 3, ...cornerState[corners[1]] })
        // cornerSetterState[corners[3]]({ ori: (cornerState[corners[3]].ori + 1) % 3, ...cornerState[corners[3]] })
        console.log("After: ")
        console.log(cornerState[corners[0]])

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatX), ...centerState[center] })
      } else if (axis === "z") {
        for (var i in corners) {
          cornerSetterState[corners[i]]({ mat: cornerState[corners[i]].mat.premultiply(rMatZ), ...cornerState[corners[i]] })
          edgeSetterState[edges[i]]({ mat: edgeState[edges[i]].mat.premultiply(rMatZ), ...edgeState[edges[i]] })
        }
        cornerSetterState[corners[0]]({ ori: (cornerState[corners[0]].ori - 1) % 3, ...cornerState[corners[0]] })
        cornerSetterState[corners[2]]({ ori: (cornerState[corners[2]].ori - 1) % 3, ...cornerState[corners[2]] })
        cornerSetterState[corners[1]]({ ori: (cornerState[corners[1]].ori + 1) % 3, ...cornerState[corners[1]] })
        cornerSetterState[corners[3]]({ ori: (cornerState[corners[3]].ori + 1) % 3, ...cornerState[corners[3]] })

        centerSetterState[center]({ mat: centerState[center].mat.premultiply(rMatZ), ...centerState[center] })
      }
    }

    rotatePosition(corners, true, direction)
    rotatePosition(edges, false, direction)

  }

  function rotate(axis, direction) {
    const angle = - Math.PI / 2  // clockwise 90 degrees
    const rMatX = new THREE.Matrix4().makeRotationX(angle)
    const rMatY = new THREE.Matrix4().makeRotationY(angle)
    const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
    if (axis === "y") {
      for (var i = 0; i < 8; i++) {
        cornerSetterState[i]({ mat: cornerState[i].mat.premultiply(rMatY), ...cornerState[i] })
      }
      for (var i = 0; i < 12; i++) {
        edgeSetterState[i]({ mat: edgeState[i].mat.premultiply(rMatY), ...edgeState[i] })
      }
      for (var i = 0; i < 6; i++) {
        centerSetterState[i]({ mat: centerState[i].mat.premultiply(rMatY), ...centerState[i] })
      }

      rotatePosition([0, 1, 2, 3], true, "negative")
      rotatePosition([0, 1, 2, 3], false, "negative")
      rotatePosition([4, 5, 6, 7], true, "negative")
      rotatePosition([4, 5, 6, 7], false, "negative")
      rotatePosition([8, 9, 10, 11], false, "negative")
      var pieces = [5, 4, 3, 2]
      for (var i = 2; i >= 0; i--) {
        var tmpCenterState = centerState
        arraySwap(tmpCenterState, pieces[i], pieces[3])
        setCenterState(tmpCenterState)

        var tmpCenterSetterState = centerSetterState
        arraySwap(tmpCenterSetterState, pieces[i], pieces[3])
        setCenterSetterState(tmpCenterSetterState)
      }

    } else if (axis === "x") {

    }

  }

  function U() {
    move([0, 1, 2, 3], [0, 1, 2, 3], "y", "negative", 0)
  }

  function Up() {
    move([0, 1, 2, 3], [0, 1, 2, 3], "y", "positive", 0)
  }

  function D() {
    move([4, 5, 6, 7], [4, 5, 6, 7], "y", "positive", 1)
  }

  function Dp() {
    move([4, 5, 6, 7], [4, 5, 6, 7], "y", "negative", 1)
  }

  function R() {
    move([3, 2, 6, 7], [3, 11, 7, 8], "x", "negative", 5)
  }
  function Rp() {
    move([3, 2, 6, 7], [3, 11, 7, 8], "x", "positive", 5)
  }
  function F() {
    move([0, 3, 7, 4], [0, 8, 4, 9], "z", "negative", 2)
  }
  function Fp() {
    move([0, 3, 7, 4], [0, 8, 4, 9], "z", "positive", 2)
  }

  function L() {
    move([0, 1, 5, 4], [1, 10, 5, 9], "x", "negative", 3)
  }

  function Lp() {
    move([4, 0, 1, 5], [1, 10, 5, 9], "x", "positive", 3)
  }

  function Reset() {

    for (var i = 0; i < 8; i++) {
      cornerSetterState[i]({ mat: cornerState[i].mat.identity(), ori: 1234, ...cornerState[i] })
    }
    for (var i = 0; i < 12; i++) {
      edgeSetterState[i]({ mat: edgeState[i].mat.identity(), ori: 0, ...edgeState[i] })
    }
    for (var i = 0; i < 6; i++) {
      centerSetterState[i]({ mat: centerState[i].mat.identity(), ...centerState[i] })
    }
    setCornerState([corner0, corner1, corner2, corner3, corner4, corner5, corner6, corner7])
    setCornerSetterState([setC0, setC1, setC2, setC3, setC4, setC5, setC6, setC7])

    setEdgeState([edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11])
    setEdgeSetterState([setE0, setE1, setE2, setE3, setE4, setE5, setE6, setE7, setE8, setE9, setE10, setE11])

    setCenterState([center0, center1, center2, center3, center4, center5])
    setCenterSetterState([setM0, setM1, setM2, setM3, setM4, setM5])

    setMovesString("Moves: ")
  }

  // handle keys
  function keyDownHandler(event) {
    if (event.code === "KeyF") {
      Up()
      setMovesString((movesString) => movesString += "U' ")
    }
    else if (event.code === "KeyJ") {
      U()
      setMovesString((movesString) => movesString += "U ")
    } else if (event.code === "KeyK") {
      R()
      setMovesString((movesString) => movesString += "R ")
    } else if (event.code === "KeyL") {
      Rp()
      setMovesString((movesString) => movesString += "R' ")
    } else if (event.code === "KeyA") {
      D()
      setMovesString((movesString) => movesString += "D ")
    } else if (event.code === "Semicolon") {
      Dp()
      setMovesString((movesString) => movesString += "D' ")
    } else if (event.code === "KeyM") {
      F()
      setMovesString((movesString) => movesString += "F ")
    } else if (event.code === "KeyV") {
      Fp()
      setMovesString((movesString) => movesString += "F' ")
    } else if (event.code === "KeyS") {
      Lp()
      setMovesString((movesString) => movesString += "L' ")
    } else if (event.code === "KeyD") {
      L()
      setMovesString((movesString) => movesString += "L ")
    } else if (event.code === "Tab") {
      event.preventDefault()
      event.stopPropagation()
      Reset()
    } else if (event.code === "KeyX") {
      rotate("y")
      setMovesString((movesString) => movesString += "y ")
    }

    // setKey(event.code)

  }

  useEffect(() => {
    keyBoard.current.focus()
  }, [])

  // handle keys
  return (
    <div ref={keyBoard} tabIndex={0} onKeyDown={(e) => keyDownHandler(e)} className={utilStyles.input}>
      <div className={utilStyles.movesStringWrap}>
        <div className={utilStyles.movesString}>
          {movesString}
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, 35], aspectRatio: 1 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} />
        <OrbitControls />
        <Cube
          center0={center0}
          center1={center1}
          center2={center2}
          center3={center3}
          center4={center4}
          center5={center5}

          corner0={corner0}
          corner1={corner1}
          corner2={corner2}
          corner3={corner3}
          corner4={corner4}
          corner5={corner5}
          corner6={corner6}
          corner7={corner7}

          edge0={edge0}
          edge1={edge1}
          edge2={edge2}
          edge3={edge3}
          edge4={edge4}
          edge5={edge5}
          edge6={edge6}
          edge7={edge7}
          edge8={edge8}
          edge9={edge9}
          edge10={edge10}
          edge11={edge11}
        ></Cube>
      </Canvas>
    </div>
  )
}
