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

function calendarioAulasFeitas(idUsuario) {
    console.log("ACESSEI O RESPOSTA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT
            DATE(u_c_a.dt_conclusao) date,
            COUNT(u_c_a.fk_aula) qtde_aulas
        FROM usuario u
        INNER JOIN usuario_curso_aula u_c_a on u.id = u_c_a.fk_usuario
        WHERE u.id = ${idUsuario}
        GROUP BY u.id, DATE(u_c_a.dt_conclusao);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { retornar, calendarioAulasFeitas };