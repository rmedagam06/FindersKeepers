import type { ThreeElements } from '@react-three/fiber'
import { Legs } from './Legs'

export function Otter3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.3, 0]} scale={[1, 0.9, 1.3]}>
        <sphereGeometry args={[0.36, 16, 16]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.3, 0.1]} scale={[0.7, 0.7, 0.9]}>
        <sphereGeometry args={[0.3, 14, 14]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0, 0.66, 0.08]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.64, 0.24]} scale={[1, 0.85, 0.8]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.14, 0.86, 0.04]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0.14, 0.86, 0.04]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[-0.08, 0.68, 0.18]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.08, 0.68, 0.18]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.62, 0.3]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.18, -0.34]} rotation={[0.3, 0, 0]} scale={[0.6, 0.3, 1]}>
        <boxGeometry args={[0.2, 0.2, 0.5]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.28, 0.08]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 12]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <Legs color="#7078A4" />
    </group>
  )
}
