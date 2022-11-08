import { useState, useEffect, useRef, useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import Cube3D from '../components/Cube'
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

  var move_map = {
    "U": [[0, 1, 2, 3], [0, 1, 2, 3], "y", "negative", 0],
    "U'": [[0, 1, 2, 3], [0, 1, 2, 3], "y", "positive", 0],
    "D": [[4, 5, 6, 7], [4, 5, 6, 7], "y", "positive", 1],
    "D'": [[4, 5, 6, 7], [4, 5, 6, 7], "y", "negative", 1],
    "R": [[3, 2, 6, 7], [3, 11, 7, 8], "x", "negative", 5],
    "R'": [[3, 2, 6, 7], [3, 11, 7, 8], "x", "positive", 5],
    "F": [[0, 3, 7, 4], [0, 8, 4, 9], "z", "negative", 2],
    "F'": [[0, 3, 7, 4], [0, 8, 4, 9], "z", "positive", 2],
    "L": [[0, 1, 5, 4], [1, 10, 5, 9], "x", "positive", 3],
    "L'": [[4, 0, 1, 5], [1, 10, 5, 9], "x", "negative", 3],
    "B": [[1, 2, 6, 5], [11, 6, 10, 2], "z", "positive", 4],
    "B'": [[1, 2, 6, 5], [11, 6, 10, 2], "z", "negative", 4]
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

  function move(varCorners, varEdges, corners_id, edges_id, axis, direction, center_id, yes_mat = true) {
    if (yes_mat) {
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
          varCorners = orientCorners(varCorners, corners_id[0], "positive")
          varCorners = orientCorners(varCorners, corners_id[2], "positive")
          varCorners = orientCorners(varCorners, corners_id[1], "negative")
          varCorners = orientCorners(varCorners, corners_id[3], "negative")

          rotate3Dpieces("centers", center_id, rMatX)

        } else if (axis === "z") {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatZ)
            rotate3Dpieces("edges", edges_id[i], rMatZ)
          }
          varCorners = orientCorners(varCorners, corners_id[0], "positive")
          varCorners = orientCorners(varCorners, corners_id[2], "positive")
          varCorners = orientCorners(varCorners, corners_id[1], "negative")
          varCorners = orientCorners(varCorners, corners_id[3], "negative")

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

          varCorners = orientCorners(varCorners, corners_id[0], "positive")
          varCorners = orientCorners(varCorners, corners_id[2], "positive")
          varCorners = orientCorners(varCorners, corners_id[1], "negative")
          varCorners = orientCorners(varCorners, corners_id[3], "negative")
        } else if (axis === "z") {
          for (var i in corners_id) {
            rotate3Dpieces("corners", corners_id[i], rMatZ)
            rotate3Dpieces("edges", edges_id[i], rMatZ)
          }
          rotate3Dpieces("centers", center_id, rMatZ)

          varCorners = orientCorners(varCorners, corners_id[0], "positive")
          varCorners = orientCorners(varCorners, corners_id[2], "positive")
          varCorners = orientCorners(varCorners, corners_id[1], "negative")
          varCorners = orientCorners(varCorners, corners_id[3], "negative")
        }
      }
    }

    varCorners = cornerArraySwap(varCorners, corners_id, direction)
    varEdges = edgeArraySwap(varEdges, edges_id, direction)
    return [varCorners, varEdges]
  }

  // None 3D move. Returns a list of corners and a list of TODO:edges
  // TODO: parameter add the corners object (in [{pos: 0, ori: 1}, {pos: 1, ori: 1} format)
  // TODO: map each move with corresponding pieces id
  function ori_corners(mv, corners_sub) {
    var corners_id = move_map[mv][0]
    var direction = move_map[mv][3]
    var axis = move_map[mv][2]

    if (direction === "positive") {
      if (axis === "y") {
      } else if (axis === "x") {
        corners_sub = orientCorners(corners_sub, corners_id[0], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[2], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[1], "negative")
        corners_sub = orientCorners(corners_sub, corners_id[3], "negative")
      } else if (axis === "z") {
        corners_sub = orientCorners(corners_sub, corners_id[0], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[2], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[1], "negative")
        corners_sub = orientCorners(corners_sub, corners_id[3], "negative")
      }
    } else if (direction === "negative") {
      if (axis === "y") {
      } else if (axis === "x") {
        corners_sub = orientCorners(corners_sub, corners_id[0], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[2], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[1], "negative")
        corners_sub = orientCorners(corners_sub, corners_id[3], "negative")
      } else if (axis === "z") {
        corners_sub = orientCorners(corners_sub, corners_id[0], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[2], "positive")
        corners_sub = orientCorners(corners_sub, corners_id[1], "negative")
        corners_sub = orientCorners(corners_sub, corners_id[3], "negative")
      }
    }

    varCorners = cornerArraySwap(varCorners, corners_id, direction)

    return corners_sub
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

  function corner_equal(cube1, cube2) {
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
              if (corner_equal(L(parents.get(v), false), v)) {
                moves.unshift("L")
              } else if (corner_equal(B(parents.get(v), false), v)) {
                moves.unshift("B")
              } else if (corner_equal(D(parents.get(v), false), v)) {
                moves.unshift("D")
              }
              v = parents.get(v)
            }

            console.log(moves)
            return moves
          }
        }
      }
    }
    return []
  }

  // Returns the pointed oris at pos 1 and pos 2
  function oriAtC12(blind_moves, moves) {
    var tmpCorners = clone(varCorners)
    var ori_ori_1 = tmpCorners[blind_moves[0][0]]; // TODO: if index == blind_moves[i], the original orientation at blind_moves pos
    var ori_ori_2 = tmpCorners[blind_moves[1][0]]; // TODO: if index == blind_moves[i]

    var corner2 = ori_corners("R", tmpCorners)

    var diff_ori_1 = tmpCorners[blind_moves[0][0]] - ori_ori_1;
    var diff_ori_2 = tmpCorners[blind_moves[1][0]] - ori_ori_2;

    var oriAtC1 = blind_moves[0]
    var oriAtC2 = blind_moves[1]

    var pair = [0, 1]
    return pair;
  }

  // return the undone setup moves
  function undo(moves) {
    var reversedMoves
    return reversedMoves
  }

  // basic commutator algs for corners at pos 1 and 2. Commute from pos 1 to pos 2.
  var corner_algs = {
    0: "RUR'U'", // ori: 0 to 0
    1: "RUR'U'", // ori: 0 to 1
    2: "RUR'U'", // ori: 0 to 2
    10: "RUR'U'", // ori: 1 to 0
    11: "RUR'U'", // ori: 1 to 1
    12: "RUR'U'", // ori: 1 to 2
    20: "RUR'U'", // ori: 2 to 0
    21: "RUR'U'", // ori: 2 to 1
    22: "RUR'U'", // ori: 2 to 2
  }

  var edge_algs = [
    "RUR'U'", // ori: 0 to 0
    "RUR'U'", // ori: 0 to 1
    "RUR'U'", // ori: 1 to 0
    "RUR'U'", // ori: 1 to 1
  ]

  // takes a string, moves, and execute the corresponding moves I'm so good!!!!!!!!
  function execute(moves) {
    function mv() {
      var cube = move(varCorners, varEdges, ...move_map[moves.shift()])
      varCorners = cube[0]
      varEdges = cube[1]
      animate()
      execute(moves)
    }

    if (moves.length > 0) {
      setTimeout(mv, 1000)
    }

    return mv
  }

  function solve_corners() {
    // TODO: generate blind moves
    var blind_moves = [[7, 0], [4, 1]] // list of pairs. First element being the target pos (aka id) and second the pointed_ori
    if (blind_moves.length % 2 === 0) { // No parity
      for (var i = 0; i < blind_moves.length; i += 2) {
        var setup_moves = BFS(blind_moves[i][0], blind_moves[i + 1][0], 1, 2)
        execute(setup_moves) // TODO: execute this first, remember update the pointed_ori with ori_ori
        var pointed_ori_1 = varCorners[blind_moves[i]]
        var pointed_ori_2 = varCorners[blind_moves[i + 1]]
        execute(undo(setup_moves)) // TODO: execute this first, remember update the pointed_ori with ori_ori
      }
    }
  }

  function solve_edges() {

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
