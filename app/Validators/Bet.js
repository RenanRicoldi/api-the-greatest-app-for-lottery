'use strict'

class Bet {
    get validateAll () {
        return true
    }

    get rules () {
        return {
            'numbers': 'required|string',
            'type': 'required|string'
        }
    }

    get messages () {
        return {
            'numbers.required': 'You must provide the numbers',
            'numbers.string': 'The numbers must be a string',
            'type.required': 'You must provide a type',
            'type.string': 'The type must be a string'
        }
    }
}

module.exports = Bet
