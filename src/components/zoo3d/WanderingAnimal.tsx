import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SPECIES_3D } from './species'
import type { AnimalInstance, Species } from '@/types/models'

const WALK_SPEED = 0.6
const ARRIVE_DISTANCE = 0.15
const BOB_AMPLITUDE = 0.04
const BOB_SPEED = 6

function randomPointInBounds(bounds: number): THREE.Vector3 {
  return new THREE.Vector3((Math.random() * 2 - 1) * bounds, 0, (Math.random() * 2 - 1) * bounds)
}

export function WanderingAnimal({
  animal,
  species,
  bounds,
  readOnly,
  onSelect,
}: {
  animal: AnimalInstance
  species: Species
  bounds: number
  readOnly?: boolean
  onSelect?: (animalId: string) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRef = useRef<THREE.Vector3>(
    new THREE.Vector3(
      THREE.MathUtils.clamp(animal.zooPosition?.x ?? 0, -bounds, bounds),
      0,
      THREE.MathUtils.clamp(animal.zooPosition?.y ?? 0, -bounds, bounds),
    ),
  )
  const pauseUntilRef = useRef(0)
  const phaseOffset = useRef(Math.random() * Math.PI * 2).current
  const Species3D = SPECIES_3D[species.assetKey]

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const position = group.position
    const target = targetRef.current
    const distance = Math.hypot(target.x - position.x, target.z - position.z)

    if (distance < ARRIVE_DISTANCE) {
      if (state.clock.elapsedTime > pauseUntilRef.current) {
        targetRef.current = randomPointInBounds(bounds)
        pauseUntilRef.current = state.clock.elapsedTime + 2 + Math.random() * 3
      }
    } else {
      const step = Math.min(WALK_SPEED * delta, distance)
      position.x += ((target.x - position.x) / distance) * step
      position.z += ((target.z - position.z) / distance) * step
      const heading = Math.atan2(target.x - position.x, target.z - position.z)
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, heading, 6, delta)
    }

    group.position.y = Math.max(0, Math.sin(state.clock.elapsedTime * BOB_SPEED + phaseOffset)) * BOB_AMPLITUDE
  })

  if (!Species3D) return null

  const scale = animal.stage === 2 ? 1.25 : 1

  return (
    <group
      ref={groupRef}
      position={[animal.zooPosition?.x ?? 0, 0, animal.zooPosition?.y ?? 0]}
      onClick={(event) => {
        if (readOnly) return
        event.stopPropagation()
        onSelect?.(animal.id)
      }}
    >
      <Species3D scale={scale} />
    </group>
  )
}
