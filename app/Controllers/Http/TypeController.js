'use strict'

const Database = use('Database')

class TypeController {
    async index() {
        const types = await Database.select('*').from('types')

        return { types }
    }
}

module.exports = TypeController
