import { useState, useEffect, useRef, useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import Cube from '../components/Cube'
import utilStyles from '../styles/utils.module.css'
import * as THREE from 'three'

export default function Home() {

  const keyBoard = useRef()
  const [movesString, setMovesString] = useState("Moves: ")

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

  var initialCenters = [
    { mat: mMat0, id: 0, pos: 0 },
    { mat: mMat1, id: 1, pos: 1 },
    { mat: mMat2, id: 2, pos: 2 },
    { mat: mMat3, id: 3, pos: 3 },
    { mat: mMat4, id: 4, pos: 4 },
    { mat: mMat5, id: 5, pos: 5 }
  ]

  var initialCorners = [
    { mat: cMat0, ori: 0, id: 0, pos: 0 },
    { mat: cMat1, ori: 0, id: 1, pos: 1 },
    { mat: cMat2, ori: 0, id: 2, pos: 2 },
    { mat: cMat3, ori: 0, id: 3, pos: 3 },
    { mat: cMat4, ori: 0, id: 4, pos: 4 },
    { mat: cMat5, ori: 0, id: 5, pos: 5 },
    { mat: cMat6, ori: 0, id: 6, pos: 6 },
    { mat: cMat7, ori: 0, id: 7, pos: 7 }
  ]

  var initialEdges = [
    { mat: eMat0, ori: 0, id: 0, pos: 0 },
    { mat: eMat1, ori: 0, id: 1, pos: 1 },
    { mat: eMat2, ori: 0, id: 2, pos: 2 },
    { mat: eMat3, ori: 0, id: 3, pos: 3 },
    { mat: eMat4, ori: 0, id: 4, pos: 4 },
    { mat: eMat5, ori: 0, id: 5, pos: 5 },
    { mat: eMat6, ori: 0, id: 6, pos: 6 },
    { mat: eMat7, ori: 0, id: 7, pos: 7 },
    { mat: eMat8, ori: 0, id: 8, pos: 8 },
    { mat: eMat9, ori: 0, id: 9, pos: 9 },
    { mat: eMat10, ori: 0, id: 10, pos: 10 },
    { mat: eMat11, ori: 0, id: 11, pos: 11 }
  ]

  const [centers, setCenters] = useState(initialCenters)
  const [corners, setCorners] = useState(initialCorners)
  const [edges, setEdges] = useState(initialEdges)

  var varCorners = corners, varEdges = edges

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function arraySwap2(pieces_name, pieces_idx, direction) {
    if (pieces_name === "corners") {
      const nextCorners = varCorners.map((corner) => {
        if (direction === "positive") {
          if (corner.pos == pieces_idx[0]) {
            return {
              ...corner,
              pos: pieces_idx[1]
            }
          } else if (corner.pos == pieces_idx[1]) {
            return {
              ...corner,
              pos: pieces_idx[2]
            }
          } else if (corner.pos == pieces_idx[2]) {
            return {
              ...corner,
              pos: pieces_idx[3]
            }
          } else if (corner.pos == pieces_idx[3]) {
            return {
              ...corner,
              pos: pieces_idx[0]
            }
          } else return corner;
        } else if (direction === "negative") {
          if (corner.pos == pieces_idx[0]) {
            return {
              ...corner,
              pos: pieces_idx[3]
            }
          } else if (corner.pos == pieces_idx[1]) {
            return {
              ...corner,
              pos: pieces_idx[0]
            }
          } else if (corner.pos == pieces_idx[2]) {
            return {
              ...corner,
              pos: pieces_idx[1]
            }
          } else if (corner.pos == pieces_idx[3]) {
            return {
              ...corner,
              pos: pieces_idx[2]
            }
          } else return corner;
        }
      })

      // setCorners(nextCorners)
      varCorners = nextCorners

    } else if (pieces_name === "edges") {
      const nextEdges = varEdges.map((edge) => {
        if (direction === "positive") {
          if (edge.pos == pieces_idx[0]) {
            return {
              ...edge,
              pos: pieces_idx[1]
            }
          } else if (edge.pos == pieces_idx[1]) {
            return {
              ...edge,
              pos: pieces_idx[2]
            }
          } else if (edge.pos == pieces_idx[2]) {
            return {
              ...edge,
              pos: pieces_idx[3]
            }
          } else if (edge.pos == pieces_idx[3]) {
            return {
              ...edge,
              pos: pieces_idx[0]
            }
          } else return edge;
        } else if (direction === "negative") {
          if (edge.pos == pieces_idx[0]) {
            return {
              ...edge,
              pos: pieces_idx[3]
            }
          } else if (edge.pos == pieces_idx[1]) {
            return {
              ...edge,
              pos: pieces_idx[0]
            }
          } else if (edge.pos == pieces_idx[2]) {
            return {
              ...edge,
              pos: pieces_idx[1]
            }
          } else if (edge.pos == pieces_idx[3]) {
            return {
              ...edge,
              pos: pieces_idx[2]
            }
          } else return edge;
        }
      })
      varEdges = nextEdges
    } else if (pieces_name === "centers") {
      const nextCenters = centers.map((center) => {
        if (direction === "positive") {
          if (center.pos == pieces_idx[0]) {
            return {
              ...center,
              pos: pieces_idx[1]
            }
          } else if (center.pos == pieces_idx[1]) {
            return {
              ...center,
              pos: pieces_idx[2]
            }
          } else if (center.pos == pieces_idx[2]) {
            return {
              ...center,
              pos: pieces_idx[3]
            }
          } else if (center.pos == pieces_idx[3]) {
            return {
              ...center,
              pos: pieces_idx[0]
            }
          }

          else return center;
        } else if (direction === "negative") {
          // TODO: copy above and modify alittle
          if (center.pos == pieces_idx[i]) {
            return {
              ...center,
              pos: pieces_idx[mod((i - 1), 4)]
            }

          } else return center;
        }
      })

      setCenters(nextCenters)

    }
  }

  function rotateArrayPosition(pieces, isCorner, direction) {
    if (isCorner) {
      if (direction === "negative") {
        arraySwap2("corners", pieces, "positive")
      } else {  // when direction === "positive"
        arraySwap2("corners", pieces, "negative")
      }
    } else {
      if (direction === "negative") {
        arraySwap2("edges", pieces, "positive")
      } else {  // when direction === "positive"
        arraySwap2("edges", pieces, "negative")
      }
    }
  }

  function rotate3Dpieces(piece_group_name, id, r_mat) {
    if (piece_group_name === "corners") {
      const nextCorners = varCorners.map((corner) => {
        if (corner.pos == id) {
          return {
            ...corner,
            mat: corner.mat.premultiply(r_mat)
          }
        } else return corner;
      })
      varCorners = nextCorners
    } else if (piece_group_name === "edges") {
      const nextEdges = varEdges.map((edge) => {
        if (edge.pos == id) {
          return {
            ...edge,
            mat: edge.mat.premultiply(r_mat)
          }
        } else return edge;
      })
      varEdges = nextEdges
    } else if (piece_group_name === "centers") {
      const nextCenters = centers.map((center) => {
        if (center.pos == id) {
          return {
            ...center,
            mat: center.mat.premultiply(r_mat)
          }
        } else return center;
      })
      setCenters(nextCenters)
    }
  }

  function orientPieces(piece_group_name, id, direction) {
    if (piece_group_name === "corners") {
      const nextCorners = varCorners.map((corner) => {
        if (direction === "positive") {
          if (corner.pos == id) {
            return {
              ...corner,
              ori: mod((corner.ori + 1), 3)
            }
          } else return corner;
        } else {
          if (corner.pos == id) {
            return {
              ...corner,
              ori: mod((corner.ori - 1), 3)
            }
          } else return corner;
        }
      })
      varCorners = nextCorners
      // setCorners(nextCorners)
    } else if (piece_group_name === "edges") {
    }
  }

  function move(corners_id, edges_id, axis, direction, center_id) {
    if (direction === "positive") {
      const angle = Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {

        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatY)
          rotate3Dpieces("edges", edges_id[i], rMatY)
        }

        // oris remain unchanged
        rotate3Dpieces("centers", center_id, rMatY)
      } else if (axis === "x") {
        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatX)
          rotate3Dpieces("edges", edges_id[i], rMatX)
        }
        // set oris

        rotate3Dpieces("centers", center_id, rMatX)

      } else if (axis === "z") {
        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatZ)
          rotate3Dpieces("edges", edges_id[i], rMatZ)
        }

        rotate3Dpieces("centers", center_id, rMatZ)
      }
    } else if (direction === "negative") {
      const angle = - Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {
        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatY)
          rotate3Dpieces("edges", edges_id[i], rMatY)
        }

        rotate3Dpieces("centers", center_id, rMatY)
      } else if (axis === "x") {
        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatX)
          rotate3Dpieces("edges", edges_id[i], rMatX)
        }
        rotate3Dpieces("centers", center_id, rMatX)

        orientPieces("corners", corners_id[0], "positive")
        orientPieces("corners", corners_id[2], "positive")
        orientPieces("corners", corners_id[1], "negative")
        orientPieces("corners", corners_id[3], "negative")
      } else if (axis === "z") {
        for (var i in corners_id) {
          rotate3Dpieces("corners", corners_id[i], rMatZ)
          rotate3Dpieces("edges", edges_id[i], rMatZ)
        }
        rotate3Dpieces("centers", center_id, rMatZ)

        orientPieces("corners", corners_id[0], "positive")
        orientPieces("corners", corners_id[2], "positive")
        orientPieces("corners", corners_id[1], "negative")
        orientPieces("corners", corners_id[3], "negative")
      }
    }

    rotateArrayPosition(corners_id, true, direction)
    rotateArrayPosition(edges_id, false, direction)

    setCorners(varCorners)
    setEdges(varEdges)
    console.log(varCorners)
  }

  function rotate(axis, direction) {
    const angle = - Math.PI / 2  // clockwise 90 degrees
    const rMatX = new THREE.Matrix4().makeRotationX(angle)
    const rMatY = new THREE.Matrix4().makeRotationY(angle)
    const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
    if (axis === "y") {
      for (var i = 0; i < 8; i++) {
        rotate3Dpieces("corners", i, rMatY)
      }
      for (var i = 0; i < 12; i++) {
        rotate3Dpieces("edges", i, rMatY)
      }
      for (var i = 0; i < 6; i++) {
        rotate3Dpieces("centers", i, rMatY)
      }

      rotateArrayPosition([0, 1, 2, 3], true, "negative")
      rotateArrayPosition([4, 5, 6, 7], true, "negative")

      rotateArrayPosition([0, 1, 2, 3], false, "negative")
      rotateArrayPosition([4, 5, 6, 7], false, "negative")
      rotateArrayPosition([8, 9, 10, 11], false, "negative")
      var pieces = [2, 3, 4, 5]
      arraySwap2("centers", pieces, "positive")

    } else if (axis === "x") {

    }

    setCorners(varCorners)
    setEdges(varEdges)

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
    setCenters(initialCenters)
    setCorners(initialCorners)
    setEdges(initialEdges)
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
          centers={centers}
          corners={corners}
          edges={edges}
        ></Cube>
      </Canvas>
    </div>
  )
}
