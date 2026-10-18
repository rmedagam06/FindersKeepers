import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Bear3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <CuteCreature bodyColor="#F8F4C9" />
      <mesh position={[-0.33, 0.93, 0.0]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#F8F4C9" />
      </mesh>
      <mesh position={[0.33, 0.93, 0.0]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#F8F4C9" />
      </mesh>
      <mesh position={[-0.33, 0.93, 0.03]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0.33, 0.93, 0.03]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0, 0.46, 0.42]} scale={[0.9, 0.7, 0.55]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
    </group>
  )
}
