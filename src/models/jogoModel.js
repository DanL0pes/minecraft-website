var database = require("../database/config");

function retornar(data) {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT jogo.id,
            c.pos,
            item.nome
        FROM jogo
        INNER JOIN crafting c ON c.id = jogo.fk_crafting_id
            INNER JOIN item ON item.id = c.fk_item
        WHERE dt_jogo = '2025-06-03';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ranking() {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT u.nome,
            u.foto,
            sum(uj.acerto) qtde_acertos
        FROM usuario_jogo uj
        INNER JOIN usuario u ON uj.fk_usuario = u.id
        GROUP BY u.nome, u.foto
        ORDER BY sum(uj.acerto) desc
        LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function estatistica(idUsuario) {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT sum(uj.acerto) qtde_acertos,
            count(*) total_tentativas
        FROM usuario_jogo uj
        WHERE uj.fk_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tentativas(idUsuario, idJogo) {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT uj.tentativa,
            acerto
        FROM usuario_jogo uj
        WHERE uj.fk_usuario = ${idUsuario} AND uj.fk_jogo = ${idJogo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tentar(idUsuario, idJogo, correto) {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        INSERT into usuario_jogo
            SELECT ${idUsuario}, ${idJogo}, IFNULL(inserir_tentativa.novo_id, 1), ${correto}
            FROM (
                SELECT MAX(tentativa) + 1 AS novo_id FROM usuario_jogo WHERE fk_usuario = ${idUsuario} AND fk_jogo = ${idJogo}
            ) AS inserir_tentativa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarJogos(idUsuario) {
    console.log("ACESSEI O JOGO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT count(distinct fk_jogo) qtde_jogos FROM usuario_jogo
        WHERE fk_usuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = { retornar, ranking, estatistica, tentativas, tentar, listarJogos };