const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Persona } = require('../models')

async function getPersonas() {
  return await Persona.findAll()
}

async function getPersonByEmail({ email }) {
  if (!email) {
    throw new Error('Email is required')
  }

  const persona = await Persona.findOne({
    where: { correo_electronico: email },
  })

  if (!persona) {
    throw new Error(`Persona with email ${email} not found`)
  }

  return persona
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

async function getMascotasByIDPersona({ id_persona }) {
  const persona = await Persona.findByPk(id_persona)
  if (!persona) {
    throw new Error(`Persona with id ${id_persona} not found`)
  }
  return await persona.getMascotas()
}

async function getPersonById({ id_persona }) {
  if (!id_persona) {
    throw new Error('ID persona is required')
  }

  const persona = await Persona.findOne({
    where: { id_persona: id_persona },
  })

  if (!persona) {
    throw new Error(`Persona with id_persona ${id_persona} not found`)
  }

  return persona
}

module.exports = {
  getPersonas,
  getPersonByEmail,
  createPersona,
  cancelPersona,
  updatePersona,
  getMascotasByIDPersona,
  getPersonById,
}
