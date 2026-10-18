import type { ThreeElements } from '@react-three/fiber'
import { Legs } from './Legs'

export function Fox3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.3, -0.18]} scale={[1, 1, 1.3]}>
        <coneGeometry args={[0.2, 0.42, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.66, 0.2]} scale={[0.85, 0.8, 1]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.15, 0.95, 0]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.1, 0.22, 8]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0.15, 0.95, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.1, 0.22, 8]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[-0.09, 0.72, 0.16]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.09, 0.72, 0.16]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.63, 0.32]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <Legs color="#7078A4" />
    </group>
  )
}
