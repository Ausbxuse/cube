import { useState, useEffect, useRef, useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import Cube3D from '../components/Cube'
import utilStyles from '../styles/utils.module.css'
import * as THREE from 'three'
import next from 'next'

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

  const initialCenters = [
    { mat: mMat0, id: 0, pos: 0 },
    { mat: mMat1, id: 1, pos: 1 },
    { mat: mMat2, id: 2, pos: 2 },
    { mat: mMat3, id: 3, pos: 3 },
    { mat: mMat4, id: 4, pos: 4 },
    { mat: mMat5, id: 5, pos: 5 }
  ]

  const initialCorners = [
    { mat: cMat0, ori: 0, id: 0, pos: 0 },
    { mat: cMat1, ori: 0, id: 1, pos: 1 },
    { mat: cMat2, ori: 0, id: 2, pos: 2 },
    { mat: cMat3, ori: 0, id: 3, pos: 3 },
    { mat: cMat4, ori: 0, id: 4, pos: 4 },
    { mat: cMat5, ori: 0, id: 5, pos: 5 },
    { mat: cMat6, ori: 0, id: 6, pos: 6 },
    { mat: cMat7, ori: 0, id: 7, pos: 7 }
  ]

  const initialEdges = [
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

  const move_map = {
    "U": [[0, 1, 2, 3], [0, 1, 2, 3], "y", "negative", 0, false],
    "U'": [[0, 1, 2, 3], [0, 1, 2, 3], "y", "positive", 0, false],
    "D": [[4, 5, 6, 7], [4, 5, 6, 7], "y", "positive", 1, false],
    "D'": [[4, 5, 6, 7], [4, 5, 6, 7], "y", "negative", 1, false],
    "R": [[3, 2, 6, 7], [3, 11, 7, 8], "x", "negative", 5, false],
    "R'": [[3, 2, 6, 7], [3, 11, 7, 8], "x", "positive", 5, false],
    "L": [[4, 0, 1, 5], [1, 10, 5, 9], "x", "positive", 3, false],
    "L'": [[4, 0, 1, 5], [1, 10, 5, 9], "x", "negative", 3, false],
    "F": [[0, 3, 7, 4], [0, 8, 4, 9], "z", "negative", 2, false],
    "F'": [[0, 3, 7, 4], [0, 8, 4, 9], "z", "positive", 2, false],
    "B": [[1, 2, 6, 5], [2, 11, 6, 10], "z", "positive", 4, true],
    "B'": [[1, 2, 6, 5], [2, 11, 6, 10], "z", "negative", 4, true],
  }


  const [centers, setCenters] = useState(initialCenters)
  const [corners, setCorners] = useState(initialCorners)
  const [edges, setEdges] = useState(initialEdges)

  var varCorners = corners, varEdges = edges, varCenters = centers

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function centerArraySwap(centers, pieces_idx, direction) {
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

    return nextCenters
  }

  function edgeArraySwap(edges, pieces_idx, direction) {
    const nextEdges = edges.map((edge) => {
      if (direction === "negative") {
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
      } else if (direction === "positive") {
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
    return nextEdges

  }

  function cornerArraySwap(corners, pieces_idx, direction) {
    const nextCorners = corners.map((corner) => {
      if (direction === "negative") {
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
      } else if (direction === "positive") {
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

    return nextCorners
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
      varCenters = nextCenters
    }
  }

  function orientCorners(corners, idx, direction) {
    const nextCorners = corners.map((corner) => {
      if (direction === "positive") {
        if (corner.pos == idx) {
          return {
            ...corner,
            ori: mod((corner.ori + 1), 3)
          }
        } else return corner;
      } else {
        if (corner.pos == idx) {
          return {
            ...corner,
            ori: mod((corner.ori - 1), 3)
          }
        } else return corner;
      }
    })
    return nextCorners
  }

  function orientEdges(edges, idx, direction) {
    const nextEdges = edges.map((edge) => {
      if (direction === "positive") {
        if (edge.pos == idx) {
          return {
            ...edge,
            ori: mod((edge.ori + 1), 2)
          }
        } else return edge;
      } else {
        if (edge.pos == idx) {
          return {
            ...edge,
            ori: mod((edge.ori - 1), 2)
          }
        } else return edge;
      }
    })
    return nextEdges
  }

  function move(mVarCorners, mVarEdges, corners_id, edges_id, axis, direction, center_id, is_b, yes_mat = true) {
    if (direction === "positive") {
      const angle = Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {

        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatY)
            rotate3Dpieces("edges", edges_id[i], rMatY)
          }
          rotate3Dpieces("centers", center_id, rMatY)

        }

        // oris remain unchanged
      } else if (axis === "x") {
        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatX)
            rotate3Dpieces("edges", edges_id[i], rMatX)
          }
          rotate3Dpieces("centers", center_id, rMatX)
        }
        // set oris
        mVarCorners = orientCorners(mVarCorners, corners_id[0], "positive")
        mVarCorners = orientCorners(mVarCorners, corners_id[2], "positive")
        mVarCorners = orientCorners(mVarCorners, corners_id[1], "negative")
        mVarCorners = orientCorners(mVarCorners, corners_id[3], "negative")


      } else if (axis === "z") {
        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatZ)
            rotate3Dpieces("edges", edges_id[i], rMatZ)
          }
          rotate3Dpieces("centers", center_id, rMatZ)
        }
        if (!is_b) {
          mVarCorners = orientCorners(mVarCorners, corners_id[0], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[2], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[1], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[3], "negative")

          mVarEdges = orientEdges(mVarEdges, edges_id[0], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[2], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[1], "positive")
          mVarEdges = orientEdges(mVarEdges, edges_id[3], "positive")
        } else {
          mVarCorners = orientCorners(mVarCorners, corners_id[0], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[2], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[1], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[3], "positive")

          mVarEdges = orientEdges(mVarEdges, edges_id[0], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[2], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[1], "positive")
          mVarEdges = orientEdges(mVarEdges, edges_id[3], "positive")
        }

      }
    } else if (direction === "negative") {
      const angle = - Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {
        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatY)
            rotate3Dpieces("edges", edges_id[i], rMatY)
          }
          rotate3Dpieces("centers", center_id, rMatY)
        }

      } else if (axis === "x") {
        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatX)
            rotate3Dpieces("edges", edges_id[i], rMatX)
          }

          rotate3Dpieces("centers", center_id, rMatX)
        }
        mVarCorners = orientCorners(mVarCorners, corners_id[0], "positive")
        mVarCorners = orientCorners(mVarCorners, corners_id[2], "positive")
        mVarCorners = orientCorners(mVarCorners, corners_id[1], "negative")
        mVarCorners = orientCorners(mVarCorners, corners_id[3], "negative")
      } else if (axis === "z") {
        if (yes_mat) {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatZ)
            rotate3Dpieces("edges", edges_id[i], rMatZ)
          }
          rotate3Dpieces("centers", center_id, rMatZ)
        }
        if (!is_b) {
          mVarCorners = orientCorners(mVarCorners, corners_id[0], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[2], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[1], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[3], "negative")

          mVarEdges = orientEdges(mVarEdges, edges_id[0], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[2], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[1], "positive")
          mVarEdges = orientEdges(mVarEdges, edges_id[3], "positive")
        } else {
          mVarCorners = orientCorners(mVarCorners, corners_id[0], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[2], "negative")
          mVarCorners = orientCorners(mVarCorners, corners_id[1], "positive")
          mVarCorners = orientCorners(mVarCorners, corners_id[3], "positive")

          mVarEdges = orientEdges(mVarEdges, edges_id[0], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[2], "negative")
          mVarEdges = orientEdges(mVarEdges, edges_id[1], "positive")
          mVarEdges = orientEdges(mVarEdges, edges_id[3], "positive")
        }
      }
    }

    mVarCorners = cornerArraySwap(mVarCorners, corners_id, direction)
    mVarEdges = edgeArraySwap(mVarEdges, edges_id, direction)
    return [mVarCorners, mVarEdges]
  }

  // None 3D move. Returns a list of corners and a list of TODO:edges
  // TODO: parameter add the corners object (in [{pos: 0, ori: 1}, {pos: 1, ori: 1} format)
  // TODO: map each move with corresponding pieces id

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

      varCorners = cornerArraySwap(varCorners, [0, 1, 2, 3], "negative")
      varCorners = cornerArraySwap(varCorners, [4, 5, 6, 7], "negative")

      varEdges = edgeArraySwap(varEdges, [0, 1, 2, 3], "negative")
      varEdges = edgeArraySwap(varEdges, [4, 5, 6, 7], "negative")
      varEdges = edgeArraySwap(varEdges, [8, 9, 10, 11], "negative")

      var pieces = [2, 3, 4, 5]
      varCenters = centerArraySwap(varCenters, pieces, "positive")

    } else if (axis === "x") {

    }
  }

  function U(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["U"], yes_mat)
  }

  function Up(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["U'"], yes_mat)
  }

  function D(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["D"], yes_mat)
  }

  function Dp(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["D'"], yes_mat)
  }

  function R(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["R"], yes_mat)
  }

  function Rp(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["R'"], yes_mat)
  }

  function F(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["F"], yes_mat)
  }

  function Fp(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["F'"], yes_mat)
  }

  function B(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["B"], yes_mat)
  }

  function Bp(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["B'"], yes_mat)
  }

  function L(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["L"], yes_mat)
  }

  function Lp(cube, yes_mat = true) {
    return move(cube[0], cube[1], ...move_map["L'"], yes_mat)
  }

  function Reset() {
    setCenters(initialCenters)
    setCorners(initialCorners)
    setEdges(initialEdges)
    setMovesString("Moves: ")
  }

  function animate() {
    setCenters(varCenters)
    setCorners(varCorners)
    setEdges(varEdges)
  }


  function clonePieces(pieces) {
    var res = []
    for (let map of pieces) {
      let clone = {}
      for (let key in map) {
        clone[key] = map[key]
      }
      res.push(clone)
    }
    return res
  }

  function piece_equal(cube1, cube2) {
    for (let map_id in cube1[0]) {
      for (let key in cube1[0][map_id]) {
        if (key == "id" || key == "pos") {
          if (cube2 === undefined) {
            return false
          } else if (cube1[0][map_id][key] !== cube2[0][map_id][key]) {
            return false
          }
        }
      }
    }

    return true
  }

  // returns the one-step-away neighbors using B, D, or L move
  function neighbors(cube) {
    return [B(cube, false), D(cube, false), L(cube, false)]
  }

  function eNeighbors(cube) {
    return [B(cube, false), D(cube, false), L(cube, false), R(cube, false)]
  }

  // Return the setup moves required to the intended location using only {B,D,L}. 
  // piece1 and 2 are both a pair of numbers. First one indicates the target location, second indicates target orientation

  function match_2pos(cube, id1, id2, target_pos1, target_pos2) {
    var actual1_id = -2, actual2_id = -2
    cube[0].map((corner) => {
      if (corner.pos == target_pos1) {
        actual1_id = corner.id
      } else if (corner.pos == target_pos2) {
        actual2_id = corner.id
      }
      return corner;
    })

    // console.log(id1, id2, actual1_id, actual2_id)
    return (id1 === actual1_id && id2 === actual2_id)
  }

  function eMatch_2pos(cube, id1, id2, target_pos1, target_pos2) {
    var actual1_id = -2, actual2_id = -2
    cube[1].map((edge) => {
      if (edge.pos == target_pos1) {
        actual1_id = edge.id
      } else if (edge.pos == target_pos2) {
        actual2_id = edge.id
      }
      return edge;
    })

    // console.log(id1, id2, actual1_id, actual2_id)
    return (id1 === actual1_id && id2 === actual2_id)
  }

  function eBFS(cube, current_pos1, current_pos2, target_pos1, target_pos2) {
    var pos1_id = -1, pos2_id = -1
    cube[1].map((corner) => {
      if (corner.pos == current_pos1) {
        pos1_id = corner.id
      } else if (corner.pos == current_pos2) {
        pos2_id = corner.id
      }
      return corner;
    })

    var frontier = []
    var parents = new Map()
    var visited = new Map()


    // console.log("#############DEBUG###############")
    frontier.push(cube)

    var loop_n = 0

    while (frontier.length != 0 && loop_n < 1000) {
      loop_n++
      var cube_curr = frontier.shift()

      if (visited.get(cube_curr) === undefined) { // If there is no parent, it means that it is either root or unexplored
        visited.set(cube_curr, true)
        for (var v of eNeighbors(cube_curr)) {
          // console.log("a neighbor", v)
          frontier.push(v)
          parents.set(v, cube_curr)
          if (eMatch_2pos(v, pos1_id, pos2_id, target_pos1, target_pos2)) {
            var moves = []

            while (parents.get(v) !== undefined && v !== undefined) {
              if (piece_equal(L(parents.get(v), false), v)) {
                moves.unshift("L")
              } else if (piece_equal(B(parents.get(v), false), v)) {
                moves.unshift("B")
              } else if (piece_equal(D(parents.get(v), false), v)) {
                moves.unshift("D")
              } else if (piece_equal(R(parents.get(v), false), v)) {
                moves.unshift("R")
              }

              v = parents.get(v)
            }

            return moves
          }
        }
      }
    }
    return []
  }
  // TODO: handle already solved state
  function BFS(cube, current_pos1, current_pos2, target_pos1, target_pos2) {
    var pos1_id = -1, pos2_id = -1
    cube[0].map((corner) => {
      if (corner.pos == current_pos1) {
        pos1_id = corner.id
      } else if (corner.pos == current_pos2) {
        pos2_id = corner.id
      }
      return corner;
    })

    var frontier = []
    var parents = new Map()
    var visited = new Map()


    // console.log("#############DEBUG###############")
    frontier.push(cube)

    var loop_n = 0

    while (frontier.length != 0 && loop_n < 1000) {
      loop_n++
      var cube_curr = frontier.shift()

      if (visited.get(cube_curr) === undefined) { // If there is no parent, it means that it is either root or unexplored
        visited.set(cube_curr, true)
        for (var v of neighbors(cube_curr)) {
          // console.log("a neighbor", v)
          frontier.push(v)
          parents.set(v, cube_curr)
          if (match_2pos(v, pos1_id, pos2_id, target_pos1, target_pos2)) {
            var moves = []

            while (parents.get(v) !== undefined && v !== undefined) {
              if (piece_equal(L(parents.get(v), false), v)) {
                moves.unshift("L")
              } else if (piece_equal(B(parents.get(v), false), v)) {
                moves.unshift("B")
              } else if (piece_equal(D(parents.get(v), false), v)) {
                moves.unshift("D")
              }
              v = parents.get(v)
            }

            return moves
          }
        }
      }
    }
    return []
  }

  function genCornerState(cube) {
    var corner_state = [0, 0, 0, 2, 0, 0, 0, 0] // 0: unsolved 1:solved -1:borrowed 2: buffer

    cube[0].map((corner) => {
      if (corner.pos === corner.id) {
        corner_state[corner.id] = 1
      }
    })

    return corner_state
  }

  function genEdgeState(cube) {
    var edge_state = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 0: unsolved 1:solved -1:borrowed 2: buffer

    cube[1].map((edge) => {
      if (edge.pos === edge.id) {
        edge_state[edge.id] = 1
      }
    })

    return edge_state
  }

  // returns the next explorable piece id. return -1 if all explored and/or borrowed
  function exploreNext(piece_state) {

    for (var i = 0; i < 8; i++) {
      if (piece_state[i] === 0) {
        return i
      }
    }

    return -1
  }

  function pos2idori(pieces, pos) {
    var id = -1
    var ori = -1
    pieces.map((piece) => {
      if (piece.pos === pos) {
        id = piece.id
        ori = piece.ori
      }
    })

    return [id, ori]
  }

  function id2pos(pieces, id) {
    var retval = -1
    pieces.map((piece) => {
      if (piece.id === id) {
        retval = piece.pos
      }
    })

    return retval
  }

  function checkSolved(piece_state) {
    for (var i = 0; i < piece_state.length; i++) {
      if (piece_state[i] === 0 || piece_state[i] === -1) {
        return false
      }
    }
    return true
  }

  function genEdgeBlindMoves(cube, moves, edge_state, cnt) {
    // var edge_state = [0,0,0,0,0,0,0,0] // 0: unsolved 1:solved -1:borrowed
    console.log("iteration: ", cnt)

    console.log(edge_state)
    if (checkSolved(edge_state)) {
      return moves
    }

    if (moves.length === 0) { // start from the buffer
      cube[1].map((edge) => {
        if (edge.pos === 1) {
          if (edge.id !== 1) {
            if (edge.ori === 0) {
              moves.push({ pos: edge.id, ori: mod(edge.ori, 2) })
            } else if (edge.ori === 1) {
              moves.push({ pos: edge.id, ori: mod(edge.ori + 1, 2) })
            }
            edge_state[edge.id] = 1
          } else { // when the buffer is already solved
            next_to_explore = exploreNext(edge_state) // don't borrow edge.pos itself
            edge_state[next_to_explore] = -1 // borrow this new piece
            var [_, new_ori] = pos2idori(cube[1], next_to_explore)
            if (new_ori === 0) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori, 2) })
            } else if (new_ori === 1) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori + 1, 2) })
            }
          }
        }
        return edge
      })
    }

    var next_to_explore = exploreNext(edge_state)
    if (cnt < 30) {
      var found = false
      cube[1].map((edge) => {
        if (edge.pos === moves[moves.length - 1].pos && !found) {
          found = true
          if (edge.id !== 1) { // not buffer
            if (edge_state[edge.id] === -1 || edge_state[edge.id] === 2 || edge_state[edge.id] === 0) { // if the pointed edge is borrowed, meaning we have returned it
              edge_state[edge.id] = 1

              if (edge.ori === 0) {
                moves.push({ pos: edge.id, ori: mod(edge.ori + moves[moves.length - 1].ori, 2) })
              } else if (edge.ori === 1) {
                moves.push({ pos: edge.id, ori: mod(edge.ori + moves[moves.length - 1].ori + 1, 2) })
              }
            } else if (edge_state[edge.id] === 0) {
              edge_state[edge.id] = 1

              if (edge.ori === 0) {
                moves.push({ pos: edge.id, ori: mod(edge.ori + moves[moves.length - 1].ori, 2) })
              } else if (edge.ori === 1) {
                moves.push({ pos: edge.id, ori: mod(edge.ori + moves[moves.length - 1].ori + 1, 2) })
              }
            } else if (edge_state[edge.id] === 1 || edge_state[edge.id] === 2) { // TODO:why does 2 not handle pointed buffer case?
              next_to_explore = exploreNext(edge_state) // don't borrow edge.pos itself

              edge_state[next_to_explore] = -1 // borrow this new piece
              var [_, new_ori] = pos2idori(cube[1], next_to_explore)
              if (new_ori === 0) {
                moves.push({ pos: next_to_explore, ori: mod(new_ori + moves[moves.length - 1].ori, 2) })
              } else if (new_ori === 1) {
                moves.push({ pos: next_to_explore, ori: mod(new_ori + moves[moves.length - 1].ori + 1, 2) })
              }
            }

          } else {
            next_to_explore = exploreNext(edge_state) // don't borrow edge.pos itself

            edge_state[next_to_explore] = -1 // borrow this new piece
            var [_, new_ori] = pos2idori(cube[1], next_to_explore)
            if (new_ori === 0) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori, 2) })
            } else if (new_ori === 1) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori + 1, 2) })
            }
          }
        }
        return edge
      })
      return genBlindMoves(cube, moves, edge_state, ++cnt)
    } else {
      return moves
    }
  }
  // TODO: for edges too
  function genBlindMoves(cube, moves, corner_state, cnt) {
    // var corner_state = [0,0,0,0,0,0,0,0] // 0: unsolved 1:solved -1:borrowed
    console.log("iteration: ", cnt)

    console.log(corner_state)
    if (checkSolved(corner_state)) {
      return moves
    }

    if (moves.length === 0) { // start from the buffer
      cube[0].map((corner) => {
        if (corner.pos === 3) {
          if (corner.id !== 3) {
            if (corner.ori === 0) {
              moves.push({ pos: corner.id, ori: mod(corner.ori, 3) })
            } else if (corner.ori === 1) {
              moves.push({ pos: corner.id, ori: mod(corner.ori + 1, 3) })
            } else if (corner.ori === 2) {
              moves.push({ pos: corner.id, ori: mod(corner.ori - 1, 3) })
            }
            corner_state[corner.id] = 1
          } else { // when the buffer is already solved
            next_to_explore = exploreNext(corner_state) // don't borrow corner.pos itself
            corner_state[next_to_explore] = -1 // borrow this new piece
            var [_, new_ori] = pos2idori(cube[0], next_to_explore)
            if (new_ori === 0) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori, 3) })
            } else if (new_ori === 1) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori + 1, 3) })
            } else if (new_ori === 2) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori - 1, 3) })
            }
          }
        }
        return corner
      })
    }

    var next_to_explore = exploreNext(corner_state)
    if (cnt < 15) {
      var found = false
      cube[0].map((corner) => {
        if (corner.pos === moves[moves.length - 1].pos && !found) {
          found = true
          if (corner.id !== 3) {
            if (corner_state[corner.id] === -1 || corner_state[corner.id] === 2 || corner_state[corner.id] === 0) { // if the pointed corner is borrowed, meaning we have returned it
              corner_state[corner.id] = 1

              if (corner.ori === 0) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori, 3) })
              } else if (corner.ori === 1) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori + 1, 3) })
              } else if (corner.ori === 2) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori - 1, 3) })
              }
            } else if (corner_state[corner.id] === 0) {
              corner_state[corner.id] = 1

              if (corner.ori === 0) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori, 3) })
              } else if (corner.ori === 1) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori + 1, 3) })
              } else if (corner.ori === 2) {
                moves.push({ pos: corner.id, ori: mod(corner.ori + moves[moves.length - 1].ori - 1, 3) })
              }
            } else if (corner_state[corner.id] === 1 || corner_state[corner.id] === 2) { // TODO:why does 2 not handle pointed buffer case?
              next_to_explore = exploreNext(corner_state) // don't borrow corner.pos itself

              corner_state[next_to_explore] = -1 // borrow this new piece
              var [_, new_ori] = pos2idori(cube[0], next_to_explore)
              if (new_ori === 0) {
                moves.push({ pos: next_to_explore, ori: mod(new_ori + moves[moves.length - 1].ori, 3) })
              } else if (new_ori === 1) {
                moves.push({ pos: next_to_explore, ori: mod(new_ori + moves[moves.length - 1].ori + 1, 3) })
              } else if (new_ori === 2) {
                moves.push({ pos: next_to_explore, ori: mod(new_ori + moves[moves.length - 1].ori - 1, 3) })
              }
            }

          } else {
            next_to_explore = exploreNext(corner_state) // don't borrow corner.pos itself

            corner_state[next_to_explore] = -1 // borrow this new piece
            var [_, new_ori] = pos2idori(cube[0], next_to_explore)
            if (new_ori === 0) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori, 3) })
            } else if (new_ori === 1) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori + 1, 3) })
            } else if (new_ori === 2) {
              moves.push({ pos: next_to_explore, ori: mod(new_ori - 1, 3) })
            }

          }
        }
        return corner
      })
      return genBlindMoves(cube, moves, corner_state, ++cnt)
    } else {
      return moves
    }
  }

  function oriAtE13(blind_move1, blind_move2, moves) {
    const target_pos1 = blind_move1.pos
    const target_pos2 = blind_move2.pos

    var tmpCorners = clonePieces(varCorners)
    var tmpEdges = clonePieces(varEdges)
    var tmpCube = [tmpCorners, tmpEdges]

    var ori_ori1, ori_ori2, new_ori1, new_ori2
    tmpEdges.map((edge) => {
      if (edge.pos === target_pos1) {
        ori_ori1 = edge.ori
      } else if (edge.pos === target_pos2) {
        ori_ori2 = edge.ori
      }
    })

    for (var i = 0; i < moves.length; i++) {
      tmpCube = move(tmpCorners, tmpEdges, ...move_map[moves[i]], false)
      tmpCorners = tmpCube[0]
      tmpEdges = tmpCube[1]
    }

    tmpEdges.map((edge) => {
      if (edge.pos === 1) {
        new_ori1 = edge.ori
      } else if (edge.pos === 3) {
        new_ori2 = edge.ori
      }
    })

    var diff_ori1 = mod(new_ori1 - ori_ori1, 2);
    var diff_ori2 = mod(new_ori2 - ori_ori2, 2);

    var oriAtE1 = mod(blind_move1.ori + diff_ori1, 2)
    var oriAtE3 = mod(blind_move2.ori + diff_ori2, 2)

    // const pair = [oriAtC1, oriAtC2]

    return oriAtE1 * 10 + oriAtE3;
  }
  // Returns the pointed oris at pos 1 and pos 2
  function oriAtC12(blind_move1, blind_move2, moves) {
    const target_pos1 = blind_move1.pos
    const target_pos2 = blind_move2.pos

    var tmpCorners = clonePieces(varCorners)
    var tmpEdges = clonePieces(varEdges)
    var tmpCube = [tmpCorners, tmpEdges]

    var ori_ori1, ori_ori2, new_ori1, new_ori2
    tmpCorners.map((corner) => {
      if (corner.pos === target_pos1) {
        ori_ori1 = corner.ori
      } else if (corner.pos === target_pos2) {
        ori_ori2 = corner.ori
      }
    })

    for (var i = 0; i < moves.length; i++) {
      tmpCube = move(tmpCorners, tmpEdges, ...move_map[moves[i]], false)
      tmpCorners = tmpCube[0]
      tmpEdges = tmpCube[1]
    }

    tmpCorners.map((corner) => {
      if (corner.pos === 1) {
        new_ori1 = corner.ori
      } else if (corner.pos === 2) {
        new_ori2 = corner.ori
      }
    })

    var diff_ori1 = mod(new_ori1 - ori_ori1, 3);
    var diff_ori2 = mod(new_ori2 - ori_ori2, 3);

    var oriAtC1 = mod(blind_move1.ori + diff_ori1, 3)
    var oriAtC2 = mod(blind_move2.ori + diff_ori2, 3)

    // const pair = [oriAtC1, oriAtC2]

    return oriAtC1 * 10 + oriAtC2;
  }

  const undo_moves = {
    "R": "R'",
    "R'": "R",
    "U": "U'",
    "U'": "U",
    "L": "L'",
    "L'": "L",
    "D": "D'",
    "D'": "D",
    "B": "B'",
    "B'": "B",
    "F": "F'",
    "F'": "F",
  }
  // return the undone setup moves
  function undo(moves) {
    var reversedMoves = []
    for (var i = moves.length - 1; i >= 0; i--) {
      reversedMoves.push(undo_moves[moves[i]])
    }
    return reversedMoves
  }

  // basic commutator algs for corners at pos 1 and 2. Commute from pos 1 to pos 2.
  const corner_algs = {
    0: ["R'", "F", "R'", "B", "B", "R", "F'", "R'", "B", "B", "R", "R",], // ori: 0 to 0
    1: ["R'", "D'", "U", "U", "R'", "D", "R", "U", "U", "R'", "D'", "R", "D", "R",], // ori: 0 to 1
    2: ["B", "D", "D", "U", "U", "R'", "D'", "R", "U", "U", "R'", "D", "R", "D", "D", "B'",], // ori: 0 to 2
    10: ["B'", "R'", "F'", "R", "B", "R'", "F", "R",], // ori: 1 to 0
    11: ["R'", "F'", "L", "F", "R", "F'", "L'", "F",], // ori: 1 to 1
    12: ["L", "L", "B", "U", "U", "R'", "D", "R", "U", "U", "R'", "D'", "R", "B'", "L", "L",], // ori: 1 to 2
    20: ["R'", "U", "U", "R'", "D'", "R", "U", "U", "R'", "D", "R", "R",], // ori: 2 to 0
    21: ["U'", "L'", "U", "R", "U'", "L", "U", "R'",], // ori: 2 to 1
    22: ["F", "F", "U", "U", "R'", "D", "R", "U'", "R'", "D'", "R", "U'", "F", "F",], // ori: 2 to 2
  }

  const edge_algs = {
    0: ["R", "R", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'",], // ori: 0 to 0
    10: ["U'", "L", "F", "R'", "F'", "R", "L'", "U", "R", "U'", "R'", "U"], // ori: 1 to 0
    1: ["U", "L'", "U'", "L", "U", "L", "R'", "F'", "L'", "F", "R", "U'"], // ori: 0 to 1
    11: ["R", "L'", "B", "R'", "L", "U", "U", "R", "L'", "B'", "R'", "L"], // ori: 1 to 1
  }

  // takes a string, moves, and execute the corresponding moves 
  function execute(moves) {
    function mv() {
      const next_move = moves.shift()
      var cube = move(varCorners, varEdges, ...move_map[next_move])
      console.log("next move:", next_move)

      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      return execute(moves)
    }

    if (moves.length > 0) {
      setTimeout(mv, 50)
    }

    return mv
  }

  function solve_corners() {
    var corner_state = genCornerState([varCorners, varEdges])
    var blind_moves = genBlindMoves([varCorners, varEdges], [], corner_state, 0) // list of pairs. First element being the target pos (aka id) and second the pointed_ori
    if (blind_moves.length % 2 === 0) { // No parity
      var total_moves = []
      for (var i = 0; i < blind_moves.length; i += 2) {
        var setup_moves = BFS([varCorners, varEdges], blind_moves[i].pos, blind_moves[i + 1].pos, 1, 2)
        console.log("setup moves:", setup_moves)

        const c12ori = oriAtC12(blind_moves[i], blind_moves[i + 1], setup_moves)
        console.log("digit", c12ori)
        // console.log("second digit:", c12ori[1])
        // console.log("operation: ", c12ori[0] * 10 + c12ori[1])
        // console.log("c12ori:", c12ori[0] * 10 + c12ori[1])

        console.log("undo setup moves:", undo(setup_moves))
        total_moves = total_moves.concat(setup_moves, corner_algs[c12ori], undo(setup_moves))
      }
      console.log("Entire moves:", total_moves)
      execute(total_moves)
    } else { // parity
      var total_moves = []
      for (var i = 0; i < blind_moves.length - 1; i += 2) {
        console.log("@@#############@@")
        var setup_moves = BFS([varCorners, varEdges], blind_moves[i].pos, blind_moves[i + 1].pos, 1, 2)
        console.log("setup moves:", setup_moves)

        const c12ori = oriAtC12(blind_moves[i], blind_moves[i + 1], setup_moves)
        console.log("digit", c12ori)
        // console.log("second digit:", c12ori[1])
        // console.log("operation: ", c12ori[0] * 10 + c12ori[1])
        // console.log("c12ori:", c12ori[0] * 10 + c12ori[1])

        console.log("undo setup moves:", undo(setup_moves))
        total_moves = total_moves.concat(setup_moves, corner_algs[c12ori], undo(setup_moves))
      }
      console.log("Entire moves:", total_moves)
      execute(total_moves)

    }
  }

  function solve_edges() {
    var edge_state = genEdgeState([varCorners, varEdges])
    var blind_moves = genEdgeBlindMoves([varCorners, varEdges], [], edge_state, 0) // list of pairs. First element being the target pos (aka id) and second the pointed_ori
    if (blind_moves.length % 2 === 0) { // No parity
      var total_moves = []
      for (var i = 0; i < blind_moves.length; i += 2) {
        var setup_moves = eBFS([varCorners, varEdges], blind_moves[i].pos, blind_moves[i + 1].pos, 1, 2)
        console.log("setup moves:", setup_moves)

        const e13ori = oriAtE13(blind_moves[i], blind_moves[i + 1], setup_moves)
        console.log("digit", e13ori)
        // console.log("second digit:", c12ori[1])
        // console.log("operation: ", c12ori[0] * 10 + c12ori[1])
        // console.log("c12ori:", c12ori[0] * 10 + c12ori[1])

        console.log("undo setup moves:", undo(setup_moves))
        total_moves = total_moves.concat(setup_moves, edge_algs[e13ori], undo(setup_moves))
      }
      console.log("Entire moves:", total_moves)
      execute(total_moves)
    } else { // parity
      var total_moves = []
      for (var i = 0; i < blind_moves.length - 1; i += 2) {
        console.log("@@#############@@")
        var setup_moves = eBFS([varCorners, varEdges], blind_moves[i].pos, blind_moves[i + 1].pos, 1, 2)
        console.log("setup moves:", setup_moves)

        const e13ori = oriAtE13(blind_moves[i], blind_moves[i + 1], setup_moves)
        console.log("digit", e13ori)
        // console.log("second digit:", c12ori[1])
        // console.log("operation: ", c12ori[0] * 10 + c12ori[1])
        // console.log("c12ori:", c12ori[0] * 10 + c12ori[1])

        console.log("undo setup moves:", undo(setup_moves))
        total_moves = total_moves.concat(setup_moves, edge_algs[e13ori], undo(setup_moves))
      }
      console.log("Entire moves:", total_moves)
      execute(total_moves)

    }

  }

  function scramble(length = 20) {
    const moves = [
      "R", "R'", "U", "U'", "F", "F'", "D", "D'", "B", "B'", "L", "L'"
    ]
    var res = []

    for (var i = 0; i < length; i++) {
      res.push(moves[Math.floor(Math.random() * moves.length)])
    }
    return res
  }


  // handle keys
  function keyDownHandler(event) {
    if (event.code === "KeyF") {
      var cube = Up([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "U' ")
    }
    else if (event.code === "KeyJ") {
      const cube = U([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "U ")
    } else if (event.code === "KeyK") {
      const cube = R([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "R ")
    } else if (event.code === "KeyL") {
      const cube = Rp([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "R' ")
    } else if (event.code === "KeyA") {
      const cube = D([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "D ")
    } else if (event.code === "Semicolon") {
      const cube = Dp([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "D' ")
    } else if (event.code === "KeyM") {
      const cube = F([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "F ")
    } else if (event.code === "KeyV") {
      const cube = Fp([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "F' ")
    } else if (event.code === "KeyB") {
      const cube = B([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "B ")
    } else if (event.code === "KeyN") {
      const cube = Bp([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "B' ")
    } else if (event.code === "KeyS") {
      const cube = L([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "L ")
    } else if (event.code === "KeyD") {
      const cube = Lp([varCorners, varEdges])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      setMovesString((movesString) => movesString += "L' ")
    } else if (event.code === "Tab") {
      event.preventDefault()
      event.stopPropagation()
      Reset()
    } else if (event.code === "KeyX") {
      rotate("y")
      animate()
      setMovesString((movesString) => movesString += "y ")
    } else if (event.code === "KeyP") {
      const mvs = BFS([varCorners, varEdges], 7, 0, 1, 2)
      event.preventDefault()
      event.stopPropagation()
      execute(mvs)
    } else if (event.code === "KeyO") {
      var corner_state = genCornerState([varCorners, varEdges])
      var blindmoves = genBlindMoves([varCorners, varEdges], [], corner_state, 0)
      console.log("blindmoves:", blindmoves)
    } else if (event.code === "KeyE") {
      var edge_state = genEdgeState([varCorners, varEdges])
      var blindmoves = genEdgeBlindMoves([varCorners, varEdges], [], edge_state, 0)
      console.log("blindmoves:", blindmoves)
    } else if (event.code === "KeyI") {
      const mvs = scramble()
      execute(mvs)
      console.log("scramble: ", mvs)
      // console.log(varCorners)
    } else if (event.code === "KeyY") {
      execute([].concat(corner_algs[22], corner_algs[22]))
      // console.log(varCorners)
    } else if (event.code === "KeyT") {
      solve_corners()
      // console.log(varCorners)
    } else if (event.code === "KeyR") {
      solve_edges()
      // console.log(varCorners)
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
        <Cube3D
          centers={centers}
          corners={corners}
          edges={edges}
        ></Cube3D>
      </Canvas>
    </div>
  )
}
