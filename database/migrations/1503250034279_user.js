'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up () {
        this.create('users', (table) => {
            table.uuid('id').primary()
            table.string('name', 254).notNullable().unique()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.boolean('verified').defaultTo(false)
            table.uuid('verified_token')
            table.string('reset_token', 240)
            table.timestamp('reset_token_created_at')
            table.timestamps()
        })
    }

    down () {
        this.drop('users')
    }
}

module.exports = UserSchema
