const mysql = require("mysql2/promise");

const conn = mysql.createPool(process.env.CONNECTION_STRING);

// LOGS
async function deleteLog(id) {
  return await conn.query("DELETE FROM tb_logs where id=?;", [id]);
}

async function insertLog(logBody) {
  const sql =
    "INSERT INTO tb_logs(ID_RECEBIMENTO, ACAO, IDENTIFICADOR, TP_LOG, DATA_PROCESSAMENTO, MENSAGEM) VALUES(?, ?, ?, ?, ?, ?);";
  const values = [
    logBody.id_recebimento,
    logBody.acao,
    logBody.identificador,
    logBody.tp_log,
    logBody.data_processamento,
    logBody.mensagem,
  ];
  await conn.query(sql, values);
}

async function selectLog(filter) {
  const sql =
    "select mensagem, date_format(data_processamento, '%d/%m/%Y' ) as data_processamento, id_recebimento, identificador, acao, case tp_log when 0 then 'MSG' when 2 then 'INC' when 3 then 'ERR' end as status FROM tb_logs WHERE data_processamento=?";
  const res = await conn.query(sql, [filter]);
  return res[0];
}

async function selectLogMatricula(filter) {
  const sql =
    "select mensagem, date_format(data_processamento, '%d/%m/%Y' ) as data_processamento, id_recebimento, identificador, acao, case tp_log when 0 then 'MSG' when 2 then 'INC' when 3 then 'ERR' end as status FROM tb_logs WHERE identificador=?";
  const res = await conn.query(sql, [filter]);
  return res[0];
}

async function selectLogDataMatricula(dt, matricula) {
  const sql =
    "select mensagem, date_format(data_processamento, '%d/%m/%Y' ) as data_processamento, id_recebimento, identificador, acao, case tp_log when 0 then 'MSG' when 2 then 'INC' when 3 then 'ERR' end as status FROM tb_logs WHERE identificador=? and data_processamento=?";
  const res = await conn.query(sql, [matricula, dt]);
  return res[0];
}

// async function updateDocument(id, docBody) {
//   const sql =
//     "UPDATE tb_documentos SET situacao_id=?, status_id=?, data_situacao=? WHERE envelope_id=?";
//   const values = [
//     docBody.situacao_id,
//     docBody.status_id,
//     docBody.data_situacao,
//     id,
//   ];
//   await conn.query(sql, values);
// }

// DOCUMENTOS
async function selectDocument(filter) {
  const sql =
    "select nome, matricula, status, situacao, date_format(data_envio, '%d/%m/%Y' ) as data_envio, date_format(data_assinatura, '%d/%m/%Y' ) as data_assinatura, documento, id_recebimento, email, territorio, date_format(data_situacao, '%d/%m/%Y' ) as data_situacao, envelope_id, inconsistencia FROM vw_processo_status WHERE data_envio=?";
  const res = await conn.query(sql, [filter]);
  return res[0];
}

async function selectDocumentMatricula(filter) {
  const sql =
    "select nome, matricula, status, situacao, date_format(data_envio, '%d/%m/%Y' ) as data_envio, date_format(data_assinatura, '%d/%m/%Y' ) as data_assinatura, documento, id_recebimento, email, territorio, date_format(data_situacao, '%d/%m/%Y' ) as data_situacao, envelope_id, inconsistencia FROM vw_processo_status WHERE matricula=?";
  const res = await conn.query(sql, [filter]);
  return res[0];
}

async function selectDocumentDataMatricula(dt, matricula) {
  const sql =
    "select nome, matricula, status, situacao, date_format(data_envio, '%d/%m/%Y' ) as data_envio, date_format(data_assinatura, '%d/%m/%Y' ) as data_assinatura, documento, id_recebimento, email, territorio, date_format(data_situacao, '%d/%m/%Y' ) as data_situacao, envelope_id, inconsistencia FROM vw_processo_status WHERE matricula=? and data_envio=?";
  const res = await conn.query(sql, [matricula, dt]);
  return res[0];
}

//Usuario
async function selectUser(user, password) {
  const sql =
    "select id, nome, usuario, senha, perfil, emSessao FROM tb_usuarios WHERE usuario=? and senha=?";
  const res = await conn.query(sql, [user, password]);
  return res[0];
}

async function updateUserSession(tipo, id) {
  return await conn.query("update tb_usuarios set emSessao=? where id=?;", [
    tipo,
    id,
  ]);
}

module.exports = {
  selectLog,
  deleteLog,
  insertLog,
  selectLogMatricula,
  selectLogDataMatricula,
  selectDocument,
  selectDocumentMatricula,
  selectDocumentDataMatricula,
  selectUser,
  updateUserSession,
};
