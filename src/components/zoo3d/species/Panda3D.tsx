import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Panda3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <CuteCreature bodyColor="#FFFED6" />
      <mesh position={[-0.33, 0.93, 0.0]}>
        <sphereGeometry args={[0.15, 14, 14]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.33, 0.93, 0.0]}>
        <sphereGeometry args={[0.15, 14, 14]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[-0.17, 0.58, 0.4]} rotation={[0, 0, 0.3]} scale={[0.75, 1, 0.5]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.17, 0.58, 0.4]} rotation={[0, 0, -0.3]} scale={[0.75, 1, 0.5]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
    </group>
  )
}
