var database = require("../database/config");

function listar(fkPergunta) {
    console.log("ACESSEI O RESPOSTA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT u.foto,
            u.nome,
            r.descricao
        FROM resposta r
        INNER JOIN usuario u ON u.id = r.fkusuario
        WHERE fkpergunta = ${fkPergunta};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comentar(descricao, idUsuario, idPergunta, fkUsuario) {
    console.log("ACESSEI O PERGUyNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function perguntar():");
    
    var instrucaoSql = `
        INSERT INTO resposta(fkpergunta, id, fkusuario, usuario, descricao)
            SELECT ${idPergunta}, IFNULL(inserir_resposta.novo_id, 1), ${fkUsuario}, ${idUsuario}, '${descricao}'
            FROM (
                SELECT MAX(id) + 1 AS novo_id FROM resposta WHERE fkpergunta = ${idPergunta}
            ) AS inserir_resposta;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {listar, comentar};