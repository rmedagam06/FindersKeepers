import type { ThreeElements } from '@react-three/fiber'

export function Owl3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0, 0.5, 0.26]} scale={[1, 1.1, 0.7]}>
        <sphereGeometry args={[0.26, 14, 14]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <mesh position={[-0.11, 0.56, 0.42]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0.11, 0.56, 0.42]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.11, 0.56, 0.48]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.11, 0.56, 0.48]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0, 0.46, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.04, 0.09, 8]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
      <mesh position={[-0.35, 0.36, 0]} rotation={[0, 0, 0.5]} scale={[0.5, 1, 0.3]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0.35, 0.36, 0]} rotation={[0, 0, -0.5]} scale={[0.5, 1, 0.3]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[-0.1, 0.03, 0.1]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
      <mesh position={[0.1, 0.03, 0.1]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
    </group>
  )
}
