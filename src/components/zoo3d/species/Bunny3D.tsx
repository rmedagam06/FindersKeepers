import type { ThreeElements } from '@react-three/fiber'
import { Legs } from './Legs'

export function Bunny3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.1, 1.0, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0.1, 1.0, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.1, 1.0, 0.03]} scale={[0.55, 0.85, 0.4]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#F292AA" opacity={0.6} transparent />
      </mesh>
      <mesh position={[0.1, 1.0, 0.03]} scale={[0.55, 0.85, 0.4]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#F292AA" opacity={0.6} transparent />
      </mesh>
      <mesh position={[-0.08, 0.64, 0.19]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.08, 0.64, 0.19]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.58, 0.24]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
      <Legs color="#FFFED6" />
    </group>
  )
}
