var database = require("../database/config")

function listar() {
    console.log("ACESSEI O PERUNTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultar(): ")
    var instrucaoSql = `
        SELECT 
            u.foto, 
            u.nome, 
            p.titulo,
            p.descricao, 
            p.data_post,
            TIMESTAMPDIFF(minute,p.data_post,CURRENT_TIMESTAMP) AS minutos_desde_postagem
        FROM pergunta p
        INNER JOIN usuario u ON u.id = p.fkusuario
        WHERE estado = 'ativo'
        ORDER BY p.data_post DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O PERGUyNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function perguntar():");
    
    var instrucaoSql = `
        INSERT INTO pergunta(id, fkusuario, titulo, descricao)
            SELECT pergunta_anterior.novo_id, ${idUsuario}, '${titulo}', '${descricao}'
            FROM (
                SELECT MAX(id) + 1 AS novo_id FROM pergunta WHERE fkusuario = 1
            ) AS pergunta_anterior;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novaDescricao, idUsuario, idPergunta) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE pergunta SET descricao = '${novaDescricao}' WHERE id = ${idPergunta} and fkusuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function arquivar(idPergunta, idUsuario) {
    console.log("ACESSEI O PERGUNTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        UPDATE pergunta SET estado = 'arquivado' WHERE id = ${idPergunta} AND fkusuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    publicar,
    editar,
    arquivar,
};