'use strict'

const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

const User = use('App/Models/User')
const Database = use('Database')
const Mail = use('Mail')

class ForgotPasswordController {
    async store({ request }) {
        const { email, redirect_link } = request.all()
        const token = uuidv4()

        const trx = await Database.beginTransaction()

        try {
            const user = await User.findByOrFail('email', email, trx)

            user.reset_token = token
            user.reset_token_created_at = new Date()

            await Mail.send('emails.forgot_password', { name: user.name, link: `${redirect_link}?token=${token}` }, (message) => {
                message
                    .to(email)
                    .from('renan.ricoldi@luby.software','Renan Ricoldi | Luby Software Your Way')
                    .subject('Password reset requested')
            })

            await user.save(trx)
        } catch(error) {
            throw new Error('Error reseting user password.')
        }

        await trx.commit()

        return { success: { message: 'Reset e-mail sent' } }
    }

    async update({ request, response }) {
        try {
            const { token, password } = request.all()
            const user = await User.findByOrFail('reset_token', token)

            const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

            if(tokenExpired) {
                return response
                    .status(401)
                    .send({ error: { message: 'O token expirou.' } })
            }

            user.password = password
            user.reset_token = null
            user.reset_token_created_at = null

            await user.save()

        } catch(error) {
            throw new Error('Algo deu errado ao resetar sua senha.')
        }

        return { success: { message: 'User password reseted.' } }
    }
}

module.exports = ForgotPasswordController
