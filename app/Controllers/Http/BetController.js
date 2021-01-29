'use strict'

const { v4: uuidv4 } = require('uuid')

const Type = use('App/Models/Type')
const Bet = use('App/Models/Bet')

class BetController {

    async index ({ auth }) {
        try {
            const bets = await Bet
                .query()
                .with('type')
                .where('user_id', auth.user.id)
                .fetch()

            return bets
        } catch(error) {
            console.log(error)
            throw new Error('Error finding bets for this user.')
        }

    }

    async store ({ request, auth }) {
        const { numbers, type } = request.all()

        try {
            const { id: typeId } = await Type.findByOrFail('type', type)

            const bet = await Bet.create({
                id: uuidv4(),
                numbers,
                type_id: typeId,
                user_id: auth.user.id

            })

            return bet
        } catch(error) {
            throw new Error('Error creating bet.')
        }
    }
}

module.exports = BetController
