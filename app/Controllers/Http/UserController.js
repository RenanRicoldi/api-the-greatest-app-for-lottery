'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Mail = use('Mail')
const Env = use('Env')

const { v4: uuidv4 } = require('uuid')

class UserController {
    async store({ request }) {
        const data = request.only(['name', 'email', 'password'])

        const trx = await Database.beginTransaction()

        let user

        try {
            const verified_token = uuidv4()
            user = await User.create({ ...data, id: uuidv4(), verified_token }, trx)

            await Mail.send('emails.verify', { name: data.name, link: `${Env.get('APP_URL')}/user/verify/${verified_token}` }, (message) => {
                message
                    .to(data.email)
                    .from('renan.ricoldi@luby.software','Renan Ricoldi | Luby Software Your Way')
                    .subject('Welcome to The Greatest App for Lottery')
            })

        } catch(error) {
            throw new Error('Failed to create User.')
        }
        await trx.commit()

        return user
    }
}

module.exports = UserController
