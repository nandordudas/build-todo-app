import type Validateable from '../Contracts/Validateable'

abstract class Validator implements Validateable {
  public validate = (): void => {
    throw new Error('Method not implemented.')
  }

  public isValid = (): boolean => {
    throw new Error('Method not implemented.')
  }
}

export default Validator
