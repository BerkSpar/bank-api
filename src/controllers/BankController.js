const database = require('../database/connection')

class BankController {
    deposita(request, response) {
        response.send('Em implementação...')
    }

    saque(request, response) {
        response.send('Em implementação...')
    }

    pagamento(request, response) {
        response.send('Em implementação...')
    }

    transferencia(request, response) {
        response.send('Em implementação...')
    }

    info(request, response) {
        response.send('Em implementação...')
    }

    movimentacao(request, response) {
        response.send('Em implementação...')
    }
}

module.exports = new BankController()