const { Respuesta } = require("../models");

async function getRespuestas() {
  return await Respuesta.findAll();
}

async function createRespuesta({ descripcion, id_preguntas }) {
  if (!id_preguntas || !descripcion) {
    throw new Error("ID question and description is required");
  }

  const respuesta = await Respuesta.create({ id_preguntas, descripcion });
  return respuesta;
}

async function getRespuestasByPreguntaId({ id_pregunta }) {
  try {
    const respuesta = await Respuesta.findAll({
      where: { id_pregunta },
    });
    return respuesta;
  } catch (error) {
    throw new Error(`Error retrieving answers: ${error.message}`);
  }
}

module.exports = { getRespuestas, createRespuesta, getRespuestasByPreguntaId };
