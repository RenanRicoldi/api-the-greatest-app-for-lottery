'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
    up () {
        this.create('bets', (table) => {
            table.uuid('id').primary()
            table.string('numbers').notNullable()
            table
                .integer('type_id')
                .unsigned()
                .references('id')
                .inTable('types')
            table
                .uuid('user_id')
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('SET NULL')
            table.timestamps()
        })
    }

    down () {
        this.drop('bets')
    }
}

module.exports = BetSchema
