import type { Payload } from '../../types/Payload'

interface Validateable {
  validate(payload: Payload | undefined): boolean
}

export default Validateable
