import type { ComponentType } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Panda3D } from './Panda3D'
import { Bear3D } from './Bear3D'
import { Fox3D } from './Fox3D'
import { Owl3D } from './Owl3D'
import { Bunny3D } from './Bunny3D'
import { Otter3D } from './Otter3D'

export const SPECIES_3D: Record<string, ComponentType<ThreeElements['group']>> = {
  panda: Panda3D,
  bear: Bear3D,
  fox: Fox3D,
  owl: Owl3D,
  bunny: Bunny3D,
  otter: Otter3D,
}
