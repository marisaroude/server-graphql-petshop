//aca va la logica de negocio
// validaciones etc
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Persona } = require('../models')

//lamar los modelos aca en  los controllers

// funciones
//getpersona

async function getPersonas() {
  return await Persona.findAll()
}

async function createPersona({
  dni,
  nombre,
  apellido,
  telefono,
  correo_electronico,
  domicilio,
  tipo,
}) {
  try {
    if (
      !dni ||
      !nombre ||
      !apellido ||
      !telefono ||
      !correo_electronico ||
      !domicilio
    ) {
      throw new Error(
        'DNI, name, last name, phone, email and address are required',
      )
    }

    const persona = await Persona.create({
      dni,
      nombre,
      apellido,
      telefono,
      correo_electronico,
      domicilio,
      tipo,
    })

    return persona
  } catch (error) {
    throw new Error(`Error creating the person: ${error.message}`)
  }
}

async function cancelPersona({ id_persona }) {
  try {
    if (!id_persona) {
      throw new Error('ID person is required')
    }

    const persona = await Persona.findByPk(id_persona)
    if (!persona) throw new Error('Person not found')

    persona.fecha_baja = new Date()
    await persona.save()

    return {
      ...persona.toJSON(),
      fecha_baja: persona.fecha_baja.toISOString(),
    }
  } catch (error) {
    throw new Error(`Error cancelling the person: ${error.message}`)
  }
}
async function updatePersona({ id_persona, input }) {
  try {
    console.log('{ id_persona, input }', { id_persona, input })
    if (!id_persona) {
      throw new Error('ID person is required')
    }

    const persona = await Persona.findByPk(id_persona)
    if (!persona) {
      throw new Error('Person not found')
    }
    //
    // Filtrar valores undefined para evitar sobrescribir con null
    const dataToUpdate = omitBy(input, isUndefined)

    await Persona.update(dataToUpdate, {
      where: { id_persona },
    })

    return { ...persona.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the person: ${error.message}`)
  }
}

module.exports = { getPersonas, createPersona, cancelPersona, updatePersona }
