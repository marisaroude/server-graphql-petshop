const { Respuesta } = require('../models')

async function getRespuestas() {
  return await Respuesta.findAll()
  order: [['id_respuesta', 'DESC']] // Ordenar por ID desc
}

async function createRespuesta({ descripcion, id_preguntas }) {
  if (!id_preguntas || !descripcion) {
    throw new Error('ID question and description is required')
  }

  const respuesta = await Respuesta.create({ id_preguntas, descripcion })
  return respuesta
}

async function getAllRespuestas() {
  return await Respuesta.findAll()
}

async function getRespuestasByPreguntaId({ id_preguntas }) {
  try {
    const respuesta = await Respuesta.findAll({
      where: { id_preguntas },
    })
    return respuesta
  } catch (error) {
    throw new Error(`Error retrieving answers: ${error.message}`)
  }
}

module.exports = {
  getRespuestas,
  createRespuesta,
  getRespuestasByPreguntaId,
  getAllRespuestas,
}
