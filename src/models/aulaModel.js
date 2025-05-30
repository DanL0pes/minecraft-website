var database = require("../database/config");

function retornar(idCurso, idAula) {
    console.log("ACESSEI O RESPOSTA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT id, 
            nome, 
            descricao, 
            duracao, 
            conteudo 
        FROM aula
        WHERE id = ${idAula} AND fk_curso = ${idCurso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { retornar };