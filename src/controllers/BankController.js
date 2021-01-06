const database = require('../database/connection')

class BankController {
    deposita(request, response) {
        const {usuario_id, valor} = request.body

        if(usuario_id == undefined || valor == undefined) {
            response.json({message: "Houve um erro ao receber os valores"})
            return 
        }
         
        const sql = 
            `INSERT INTO movimentacao (
                valor,
                tipo_movimento,
                usuario_id,
                data
            ) VALUES (
                ${valor},
                'DEPÓSITO',
                ${usuario_id},
                now()
            );` 

        database.query(sql, (e, data) => {
            if(e) throw e

            response.json({message: 'Depositado com sucesso!'})
        })
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