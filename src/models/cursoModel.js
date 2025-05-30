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
        SELECT u.id usuario_id,
            c.id curso_id,
            c.nome,
            c.tipo,
            count(a.id) qtde_aulas,
            count(u_c_a.fk_aula) aulas_feitas
        FROM usuario u
        JOIN usuario_curso uc ON u.id = uc.fk_usuario
        JOIN curso c ON c.id = uc.fk_curso
        JOIN aula a ON a.fk_curso = c.id
        LEFT JOIN usuario_curso_aula u_c_a ON u.id = u_c_a.fk_usuario AND u_c_a.fk_curso = c.id AND u_c_a.fk_aula = a.id
        WHERE u.id = ${idUsuario} AND uc.dt_conclusao IS NULL
        GROUP BY u.id, c.id, c.nome, c.tipo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {listar, listarUsuario};