import { body } from "express-validator";

const nameValidation = 
    body('name')
    .isString().withMessage('Name must be a string')
    .trim()
    .notEmpty().withMessage('Name should not be empty string')
    .isLength({max: 15}).withMessage('Name length must not be greater than 15')

const descValidation = 
    body('description')
    .isString().withMessage('Description must be a string')
    .trim()
    .isLength({max: 500}).withMessage('Description length must not be greater than 500')

const urlValidation = 
    body('websiteUrl')
    .isString().withMessage('Website URL must be a string')
    .trim()
    .isLength({max: 100}).withMessage('Website URL length must not be greater than 100')
    .isURL().withMessage('Website URL must be a valid URL')

export const blogDtoValidationMiddleware = [
    nameValidation,
    descValidation,
    urlValidation
]