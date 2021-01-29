'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    async handle (error, { response }) {
        if(error.name === 'ValidationException') {
            return response.status(error.status).send({ error: { messages: error.messages } })
        }

        return response.status(400).send({ error: { message: error.message } })
    }

    async report (error) {
        console.log(error)
    }
}

module.exports = ExceptionHandler
