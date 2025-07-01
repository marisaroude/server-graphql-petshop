const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Persona } = require('../models')
const { formatDate } = require('../handlers/date.handler')

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
  console.log('id persona', id_persona)
  try {
    if (!id_persona) {
      throw new Error('ID person is required')
    }

    const persona = await Persona.findByPk(id_persona)
    if (!persona) throw new Error('Person not found')

    const today = new Date()
    const formattedDate = formatDate(today)
    persona.fecha_baja = formattedDate

    await persona.save()

    return {
      ...persona.toJSON(),
      fecha_baja: formattedDate,
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

    // Clonamos el input
    const inputCopy = { ...input }

    // Si viene fecha_baja, la formateamos
    if (inputCopy.fecha_baja) {
      inputCopy.fecha_baja = formatDate(inputCopy.fecha_baja)
    }

    // Filtrar valores undefined
    const dataToUpdate = omitBy(inputCopy, isUndefined)

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

async function registerPersona({ id_persona }) {
  console.log('id persona', id_persona)
  try {
    if (!id_persona) {
      throw new Error('ID person is required')
    }

    const persona = await Persona.findByPk(id_persona)
    if (!persona) throw new Error('Person not found')

    persona.fecha_baja = null

    await persona.save()

    return {
      ...persona.toJSON(),
      fecha_baja: null,
    }
  } catch (error) {
    throw new Error(`Error registering the person: ${error.message}`)
  }
}

module.exports = {
  getPersonas,
  getPersonByEmail,
  createPersona,
  cancelPersona,
  updatePersona,
  getMascotasByIDPersona,
  getPersonById,
  registerPersona,
}
