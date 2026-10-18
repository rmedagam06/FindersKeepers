import type { ThreeElements } from '@react-three/fiber'
import { Legs } from './Legs'

export function Panda3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.18, 0.95, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.18, 0.95, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[-0.12, 0.74, 0.22]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.12, 0.74, 0.22]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.66, 0.28]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <Legs color="#FFFED6" />
    </group>
  )
}
