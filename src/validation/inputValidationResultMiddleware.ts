import { validationResult, ValidationError, FieldValidationError } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { HTTPStatusCode } from '../utils/statusCodes'
import { FieldError } from '../utils/errorType'
 
const formatErrors = (error: ValidationError): FieldError => {
    
    const expressError = error as unknown as FieldValidationError
    
    return { 
        message: expressError.msg, 
        field: expressError.path 
    }

}
 
export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true })
 
  if (errors.length) {
    res.status(HTTPStatusCode.BAD_REQUEST).json({ errorsMessages: errors })
    return
  }
 
  next()
}