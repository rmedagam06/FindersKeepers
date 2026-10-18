import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { WanderingAnimal } from './WanderingAnimal'
import { getSpeciesById } from '@/data/species'
import type { AnimalInstance } from '@/types/models'

const YARD_BOUNDS = 4

interface ZooScene3DProps {
  animals: AnimalInstance[]
  readOnly?: boolean
  onRemove?: (animalId: string) => void
}

export function ZooScene3D({ animals, readOnly, onRemove }: ZooScene3DProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedAnimal = animals.find((animal) => animal.id === selectedId) ?? null
  const selectedSpecies = selectedAnimal ? getSpeciesById(selectedAnimal.speciesId) : undefined

  return (
    <>
      <Canvas camera={{ position: [0, 6, 7.5], fov: 50 }} className="zoo-canvas">
        <color attach="background" args={['#FFFED6']} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={false}>
          <circleGeometry args={[YARD_BOUNDS + 0.6, 32]} />
          <meshStandardMaterial color="#CEE2B1" />
        </mesh>

        <Suspense fallback={null}>
          {animals.map((animal) => {
            const species = getSpeciesById(animal.speciesId)
            if (!species) return null
            return (
              <WanderingAnimal
                key={animal.id}
                animal={animal}
                species={species}
                bounds={YARD_BOUNDS}
                readOnly={readOnly}
                onSelect={setSelectedId}
              />
            )
          })}
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>

      {selectedAnimal && selectedSpecies && (
        <Modal label={`${selectedSpecies.name} details`} onClose={() => setSelectedId(null)}>
          <h2 className="sheet-title">{selectedAnimal.nickname || selectedSpecies.name}</h2>
          <p className="auth-subtitle">Level {selectedAnimal.level}</p>
          <div className="auth-actions">
            {!readOnly && onRemove && (
              <Button
                variant="secondary"
                onClick={() => {
                  onRemove(selectedAnimal.id)
                  setSelectedId(null)
                }}
              >
                Remove from zoo
              </Button>
            )}
            <Button variant="secondary" onClick={() => setSelectedId(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export { YARD_BOUNDS }
