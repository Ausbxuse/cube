// import Piece from '../components/Piece'

// not in place can be static

class Corners {
  constructor() {
    this.move_map = {
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

    const cMat0 = new THREE.Matrix4()
    const cMat1 = new THREE.Matrix4()
    const cMat2 = new THREE.Matrix4()
    const cMat3 = new THREE.Matrix4()
    const cMat4 = new THREE.Matrix4()
    const cMat5 = new THREE.Matrix4()
    const cMat6 = new THREE.Matrix4()
    const cMat7 = new THREE.Matrix4()
    // this.corners = // varCorners
    this.corners = [
      { mat: cMat0, ori: 0, id: 0, pos: 0 },
      { mat: cMat1, ori: 0, id: 1, pos: 1 },
      { mat: cMat2, ori: 0, id: 2, pos: 2 },
      { mat: cMat3, ori: 0, id: 3, pos: 3 },
      { mat: cMat4, ori: 0, id: 4, pos: 4 },
      { mat: cMat5, ori: 0, id: 5, pos: 5 },
      { mat: cMat6, ori: 0, id: 6, pos: 6 },
      { mat: cMat7, ori: 0, id: 7, pos: 7 }
    ]
  }

  cornerArraySwap(pieces_idx, direction) {
    const nextCorners = this.corners.map((corner) => {
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
  }

  rotate3Dpieces(id, r_mat) {
    const nextCorners = this.corners.map((corner) => {
      if (corner.pos == id) {
        return {
          ...corner,
          mat: corner.mat.premultiply(r_mat)
        }
      } else return corner;
    })
    this.corners = nextCorners
  }

  orientCorners(idx, direction) {
    const nextCorners = this.corners.map((corner) => {
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
    this.corners = nextCorners
  }

  #move(corners_id, axis, direction, center_id, is_b, yes_mat = true) {
    if (direction === "positive") {
      const angle = Math.PI / 2  // clockwise 90 degrees
      const rMatX = new THREE.Matrix4().makeRotationX(angle)
      const rMatY = new THREE.Matrix4().makeRotationY(angle)
      const rMatZ = new THREE.Matrix4().makeRotationZ(angle)
      if (axis === "y") {

        if (yes_mat) {
          for (var i in corners_id) {
            this.rotate3Dpieces(corners_id[i], rMatY)
          }
        }

        // oris remain unchanged
      } else if (axis === "x") {
        if (yes_mat) {
          for (var i in corners_id) {
            this.rotate3Dpieces(corners_id[i], rMatX)
          }
        }
        // set oris
        this.orientCorners(corners_id[0], "positive")
        this.orientCorners(corners_id[2], "positive")
        this.orientCorners(corners_id[1], "negative")
        this.orientCorners(corners_id[3], "negative")


      } else if (axis === "z") {
        if (yes_mat) {
          for (var i in corners_id) {
            this.rotate3Dpieces("corners", corners_id[i], rMatZ)
          }
        }
        if (!is_b) {
          this.orientCorners(corners_id[0], "positive")
          this.orientCorners(corners_id[2], "positive")
          this.orientCorners(corners_id[1], "negative")
          this.orientCorners(corners_id[3], "negative")
        } else {
          this.orientCorners(corners_id[0], "negative")
          this.orientCorners(corners_id[2], "negative")
          this.orientCorners(corners_id[1], "positive")
          this.orientCorners(corners_id[3], "positive")
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
            this.rotate3Dpieces(corners_id[i], rMatY)
          }
        }

      } else if (axis === "x") {
        if (yes_mat) {
          for (var i in corners_id) {
            this.rotate3Dpieces(corners_id[i], rMatX)
          }
        }
        this.orientCorners(corners_id[0], "positive")
        this.orientCorners(corners_id[2], "positive")
        this.orientCorners(corners_id[1], "negative")
        this.orientCorners(corners_id[3], "negative")
      } else if (axis === "z") {
        if (yes_mat) {
          for (var i in corners_id) {
            this.rotate3Dpieces(corners_id[i], rMatZ)
          }
        }
        if (!is_b) {
          this.orientCorners(corners_id[0], "positive")
          this.orientCorners(corners_id[2], "positive")
          this.orientCorners(corners_id[1], "negative")
          this.orientCorners(corners_id[3], "negative")
        } else {
          this.orientCorners(corners_id[0], "negative")
          this.orientCorners(corners_id[2], "negative")
          this.orientCorners(corners_id[1], "positive")
          this.orientCorners(corners_id[3], "positive")
        }
      }
    }

    this.corners = cornerArraySwap(mVarCorners, corners_id, direction)
    return this.corners
  }

  U(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["U"], corners, yes_mat)
  }

  Up(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["U'"], corners, yes_mat)
  }

  D(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["D"], corners, yes_mat)
  }

  Dp(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["D'"], corners, yes_mat)
  }

  R(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["R"], corners, yes_mat)
  }

  Rp(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["R'"], corners, yes_mat)
  }

  F(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["F"], corners, yes_mat)
  }

  Fp(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["F'"], corners, yes_mat)
  }

  B(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["B"], corners, yes_mat)
  }

  Bp(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["B'"], corners, yes_mat)
  }

  L(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["L"], corners, yes_mat)
  }

  Lp(corners, yes_mat = true) {
    return this.move(corners, ...this.move_map["L'"], corners, yes_mat)
  }

  neighbors() {
    return [B(false), D(false), L(false)]
  }

  match_2pos(corners, id1, id2, target_pos1, target_pos2) {
    var actual1_id = -2, actual2_id = -2
    corners.map((corner) => {
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

  BFS(current_pos1, current_pos2, target_pos1, target_pos2) {
    var pos1_id = -1, pos2_id = -1
    this.corners.map((corner) => {
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
        for (var v of this.neighbors(cube_curr)) {
          // console.log("a neighbor", v)
          frontier.push(v)
          parents.set(v, cube_curr)
          if (this.match_2pos(v, pos1_id, pos2_id, target_pos1, target_pos2)) {
            var moves = []

            while (parents.get(v) !== undefined && v !== undefined) {
              if (this.cornerEqual(this.L(parents.get(v), false), v)) {
                moves.unshift("L")
              } else if (this.cornerEqual(this.B(parents.get(v), false), v)) {
                moves.unshift("B")
              } else if (this.cornerEqual(this.D(parents.get(v), false), v)) {
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

}

