var database = require("../database/config");

function listar(pesquisa) {
    console.log("ACESSEI O RESPOSTA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT c.nome,
			c.tipo,
            COUNT(a.id) qtde_aulas,
            SUM(a.duracao) duracao
        FROM curso c
			INNER JOIN aula a on a.fk_curso = c.id
        WHERE c.nome LIKE '%${pesquisa}%'
        GROUP BY c.nome, c.tipo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuario(idUsuario) {
    console.log("ACESSEI O RESPOSTA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {listar, listarUsuario};