'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

Route.post('users', 'UserController.store').validator('User')
Route.get('users/verify/:token', 'UserController.verify')
Route.post('sessions', 'SessionController.store')

Route.post('password-reset', 'ForgotPasswordController.store')
Route.put('password-reset', 'ForgotPasswordController.update')

Route.get('types', 'TypeController.index')

Route.post('bets', 'BetController.store').middleware('auth').validator('Bet')
Route.get('bets', 'BetController.index').middleware('auth')
