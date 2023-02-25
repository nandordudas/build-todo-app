import Validator from './Validator'

class EnvValidator extends Validator {
  static readonly requiredEnvVariables = [
    'PROTOCOL',
    'HOST',
    'PORT',
    'PGUSER',
    'PGHOST',
    'PGDATABASE',
    'PGPASSWORD',
  ]

  public validate = () => {
    // TODO: set a deeper validation for env variables
    const missingOrInvalidVariables = EnvValidator.requiredEnvVariables
      .filter(variable => !EnvValidator.isExists(variable))

    if (missingOrInvalidVariables.length > 0)
      throw new Error(`The following env variables are missing or invalid: ${missingOrInvalidVariables.join(', ')}`)

    return true
  }

  public static isExists = (envVariable: string) => Boolean(process.env[envVariable]?.trim())

  public static parsePort = (port: string) => {
    const parsedPort = parseInt(port, 10)

    if (isNaN(parsedPort))
      return null

    return parsedPort
  }
}

export default EnvValidator
