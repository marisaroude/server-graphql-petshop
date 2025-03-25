

const { Pregunta } = require('../models')

//lamar los modelos aca en  los controllers

// funciones
//getpregunta

async function getPregunta() {
  return await Pregunta.findAll()
}

async function createPregunta({
 id_pregunta,
 descripcion,
 estado,
 id_persona,
 id_ps,
}) {
  try {
    if (
      !id_pregunta ||
      !descripcion ||
      !estado ||
      !id_persona ||
      !id_ps
    ) {
      throw new Error(
        'Question, description, state, person and product are required',
      )
    }

    const pregunta = await Pregunta.create({
        id_pregunta,
        descripcion,
        estado,
        id_persona,
        id_ps,
    })

    return pregunta
  } catch (error) {
    throw new Error(`Error creating the Question: ${error.message}`)
  }
}

module.exports = { getPregunta, createPregunta }
