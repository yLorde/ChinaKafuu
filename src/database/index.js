const mongoose = require('mongoose')
const c = require('colors')
const auth = require('../dados/auth')

module.exports = {
    start () {
        try {
            mongoose.connect(auth.mongoose)

            console.log(c.red
(`
##############################################################
##                     Banco De Dados                       ##
##                    Status: Conectado                     ##
##############################################################`))

        } catch (err) {
            console.log(c.red(`[DATABASE] [ERRO] - ${err}`))
        }
    }
}