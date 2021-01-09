const database = require('../database/connection')

async function getUsuario(usuario_id) {
    const sql = `SELECT * FROM usuario WHERE id = ${usuario_id}`;

    try {
        const rows = await database.query(sql)

        return rows[0][0]
    } catch (error) {
        console.log(error.sqlMessage)
        throw error
    }
}

async function geraMovimentacao(usuario_id, valor, tipo_movimento, codigo = null) {
    const sql =
        `INSERT INTO movimentacao (
            valor,
            tipo_movimento,
            usuario_id,
            data,
            observacao
        ) VALUES (
            ${valor},
            '${tipo_movimento}',
            ${usuario_id},
            now(),
            ${codigo == null ? null : `"${codigo}"`}
        );`


    try {
        const rows = await database.query(sql)
    } catch (error) {
        console.log(error.sqlMessage)
        throw e
    }
}

class BankController {
    async deposita(request, response) {
        const { usuario_id, valor } = request.body

        if (usuario_id == undefined || valor == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        const sql = `UPDATE usuario SET saldo = (saldo + ${valor}) WHERE id = ${usuario_id}`

        try {
            await database.execute(sql)
            await geraMovimentacao(usuario_id, valor, 'DEPOSITO')

            response.status(200)
            response.json({ message: 'Depositado com sucesso!' })
        } catch (error) {
            response.json({ message: error.sqlMessage })
        }

    }

    async saque(request, response) {
        const { usuario_id, valor } = request.body

        if (usuario_id == undefined || valor == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        var usuario = {}
        try {
            usuario = await getUsuario(usuario_id)
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
            return
        }

        if (usuario.saldo - valor <= 0) {
            response.status(400)
            response.json({ message: 'Saldo inválido' })
            return
        }

        const sql = `UPDATE usuario SET saldo = (saldo - ${valor}) WHERE id = ${usuario_id}`
        try {
            await database.execute(sql)
            await geraMovimentacao(usuario_id, valor, 'SAQUE')

            response.status(200)
            response.json({ message: 'Saque realizado com sucesso' })
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async pagamento(request, response) {
        const { usuario_id, valor, codigo } = request.body

        if (usuario_id == undefined || valor == undefined || codigo == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        var usuario = {}
        try {
            usuario = await getUsuario(usuario_id)
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
            return
        }

        if (usuario.saldo - valor <= 0) {
            response.status(400)
            response.json({ message: 'Saldo inválido' })
            return
        }

        const sql = `UPDATE usuario SET saldo = (saldo - ${valor}) WHERE id = ${usuario_id}`
        try {
            await database.execute(sql)
            await geraMovimentacao(usuario_id, valor, 'PAGAMENTO', `Código do boleto: ${codigo}`)

            response.status(200)
            response.json({ message: 'Pagamento realizado com sucesso' })
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async transferencia(request, response) {
        const { usuario_id, valor } = request.body

        if (usuario_id == undefined || valor == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        var usuario = {}
        try {
            usuario = await getUsuario(usuario_id)
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
            return
        }

        if (usuario.saldo - valor <= 0) {
            response.status(400)
            response.json({ message: 'Saldo inválido' })
            return
        }

        const sql = `UPDATE usuario SET saldo = (saldo - ${valor}) WHERE id = ${usuario_id}`
        try {
            await database.execute(sql)
            await geraMovimentacao(usuario_id, valor, 'TRANSFERENCIA')

            response.status(200)
            response.json({ message: 'Transferência realizada com sucesso' })
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async info(request, response) {
        if (request.query.usuario_id == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        try {
            const sql = `SELECT * FROM usuario WHERE id = ${request.query.usuario_id}`

            const rows = await database.query(sql)

            response.status(200)
            response.json(rows[0][0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }

    async movimento(request, response) {
        if (request.query.usuario_id == undefined) {
            response.status(400)
            response.json({ message: "Houve um erro ao receber os valores" })
            return
        }

        try {
            const sql = `SELECT * FROM movimentacao WHERE usuario_id = ${request.query.usuario_id}`

            const rows = await database.query(sql)

            response.status(200)
            response.json(rows[0])
        } catch (error) {
            response.status(400)
            response.json({ message: error.sqlMessage })
        }
    }
}

module.exports = new BankController()