const { Pregunta } = require("../models");

async function getPregunta() {
  return await Pregunta.findAll();
}

async function createPregunta({
  descripcion,
  estado = false,
  id_persona,
  id_ps,
}) {
  try {
    if (!descripcion || !id_persona || !id_ps) {
      throw new Error("description, state, person and product are required");
    }

    const pregunta = await Pregunta.create({
      descripcion,
      estado,
      id_persona,
      id_ps,
    });

    return pregunta;
  } catch (error) {
    throw new Error(`Error creating the Question: ${error.message}`);
  }
}

async function getPreguntasByProductId({ id_ps }) {
  console.log("id_ps", id_ps);
  try {
    const preguntas = await Pregunta.findAll({
      where: { id_ps: id_ps },
      // order: [['id_preguntas', 'DESC']], //se van a mostrar en orden desc
    });
    console.log("preguntas", preguntas);
    return preguntas;
  } catch (error) {
    throw new Error(`Error retrieving questions for product: ${error.message}`);
  }
}

module.exports = { getPregunta, createPregunta, getPreguntasByProductId };
