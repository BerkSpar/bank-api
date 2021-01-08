const database = require('../database/connection')

class BankController {
    async deposita(request, response) {
        const { usuario_id, valor } = request.body

        if (usuario_id == undefined || valor == undefined) {
            response.json({ message: "Houve um erro ao receber os valores" })
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


        try {
            const rows = await database.query(sql)

            response.json({ message: 'Depositado com sucesso!' })
        } catch (error) {
            response.json({ message: error.sqlMessage })
        }

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

    async info(request, response) {
        if (request.query.usuario_id == undefined) {
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        try {
            const sql = `SELECT * FROM usuario WHERE id = ${request.query.usuario_id}`

            const rows = await database.query(sql)

            response.json(rows[0])
        } catch (error) {
            response.json({ message: error.sqlMessage })
        }
    }

    async movimento(request, response) {
        if (request.query.usuario_id == undefined) {
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        try {
            const sql = `SELECT * FROM movimentacaso WHERE usuario_id = ${request.query.usuario_id}`

            const rows = await database.query(sql)

            response.json(rows[0])
        } catch (error) {
            response.json({ message: error.sqlMessage })
        }
    }
}

module.exports = new BankController()