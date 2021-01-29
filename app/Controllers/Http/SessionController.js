'use strict'

const User = use('App/Models/User')
class SessionController {
    async store({ request, auth }) {
        const { email, password } = request.all()

        let user

        try {
            user = await User.findByOrFail('email', email)
        } catch(error) {
            throw new Error('User not found with provided e-mail.')
        }

        if(!user.verified)
            throw new Error('User not verified. Please check your e-mail!')

        try {
            const token = await auth.attempt(email, password)

            return token
        } catch(error) {
            throw new Error('Wrong password.')
        }
    }
}

module.exports = SessionController
