const { Respuesta } = require('../models')

async function getRespuestas() {
  return await Respuesta.findAll()
}

async function createRespuesta({ descripcion, id_preguntas }) {
  if (!id_preguntas || !descripcion) {
    throw new Error('ID question and description is required')
  }

  const respuesta = await Respuesta.create({ id_preguntas, descripcion })
  return respuesta
}

module.exports = { getRespuestas, createRespuesta }
