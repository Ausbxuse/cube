import Corner from '../components/Corner'

class Cube {
  constructor() {
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
  }
}
