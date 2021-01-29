'use strict'

class User {
    get validateAll () {
        return true
    }

    get rules () {
        return {
            name: 'required|string',
            email: 'required|email|unique:users',
            password: 'required|string'
        }
    }

    get messages () {
        return {
            'name.required': 'You must provide a name',
            'name.string': 'The name must be a string',
            'email.required': 'You must provide an email address.',
            'email.email': 'You must provide a valid email address.',
            'email.unique': 'This email is already registered.',
            'password.required': 'You must provide a password',
            'password.string': 'The password must be a string'
        }
    }
}

module.exports = User
