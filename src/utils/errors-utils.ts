import { FieldError } from "./errorType";

export const createErrorsMessages = (errors: FieldError[], ): { errorsMessages: FieldError[] } => {
    return { errorsMessages: errors }
}
