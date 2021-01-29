'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {
    type() {
        return this.belongsTo('App/Models/Type')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Bet
