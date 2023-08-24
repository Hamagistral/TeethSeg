/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 teeth.gltf --transform 
Files: teeth.gltf [1.25MB] > teeth-transformed.glb [37.92KB] (97%)
*/

import { useGLTF } from '@react-three/drei';

export default function Teeths(props) {
  // const { nodes, materials } = useGLTF('/teeth-transformed.glb')
  const { nodes, materials } = useGLTF('/teethsObj.obj')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.model.geometry} material={materials['default']} />
    </group>
  )
}

useGLTF.preload('/teeth.gltf')
