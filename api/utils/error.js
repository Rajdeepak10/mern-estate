export const errorHandler = (statusCode,message)=>{
    // we are creating a error by js error constructor
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
}