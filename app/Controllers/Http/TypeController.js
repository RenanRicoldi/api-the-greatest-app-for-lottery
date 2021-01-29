'use strict'

const Type = use('App/Models/Type')

class TypeController {
    async index() {
        const types = await Type.all()

        return { types }
    }
}

module.exports = TypeController
