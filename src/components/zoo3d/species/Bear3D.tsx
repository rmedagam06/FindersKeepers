import type { ThreeElements } from '@react-three/fiber'
import { Legs } from './Legs'

export function Bear3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0, 0.76, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.19, 1.0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0.19, 1.0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.19, 1.01, 0.02]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0.19, 1.01, 0.02]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0, 0.68, 0.24]} scale={[1, 0.7, 0.6]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <mesh position={[-0.08, 0.78, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.08, 0.78, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.68, 0.32]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <Legs color="#FFFED6" />
    </group>
  )
}
