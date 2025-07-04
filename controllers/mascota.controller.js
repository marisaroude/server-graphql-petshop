const { omitBy, isUndefined } = require('lodash')

const { Mascota } = require('../models')
const { formatDate } = require('../handlers/date.handler')

async function getMascotas() {
  return await Mascota.findAll()
}

async function getMascotaById({ id_mascota }) {
  if (!id_mascota) {
    throw new Error('ID mascota is required')
  }

  const mascota = await Mascota.findOne({
    where: { id_mascota: id_mascota },
  })

  if (!mascota) {
    throw new Error(`Mascota with id_mascota ${id_mascota} not found`)
  }

  return mascota
}

// Crear una nueva mascota
async function createMascota({
  id_persona,
  nombre,
  tipo,
  raza,
  descripcion,
  image,
}) {
  try {
    // nose si el id de la persona tiene q ir obligatorio
    if (!id_persona || !nombre || !tipo || !descripcion) {
      throw new Error('ID persona, nombre, tipo y descripción son requeridos')
    }

    const mascota = await Mascota.create({
      id_persona,
      nombre,
      tipo,
      raza,
      descripcion,
      image,
    })

    return mascota
  } catch (error) {
    throw new Error(`Error creando la mascota: ${error.message}`)
  }
}

// Cancelar una mascota (dar de baja)
async function cancelMascota({ id_mascota }) {
  try {
    if (!id_mascota) {
      throw new Error('ID de la mascota es requerido')
    }

    const mascota = await Mascota.findByPk(id_mascota)
    if (!mascota) throw new Error('Mascota no encontrada')

    const today = new Date()
    const formattedDate = formatDate(today)
    mascota.fecha_baja = formattedDate

    await mascota.save()

    return {
      ...mascota.toJSON(),
      fecha_baja: formattedDate,
    }
  } catch (error) {
    throw new Error(`Error cancelando la mascota: ${error.message}`)
  }
}

async function updateMascota({ id_mascota, input }) {
  try {
    if (!id_mascota) {
      throw new Error('ID mascota is required')
    }

    const mascota = await Mascota.findByPk(id_mascota)
    if (!mascota) {
      throw new Error('Mascota not found')
    }
    //
    const dataToUpdate = omitBy(input, isUndefined)

    await Mascota.update(dataToUpdate, {
      where: { id_mascota },
    })

    return { ...mascota.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the mascota: ${error.message}`)
  }
}

module.exports = {
  getMascotas,
  getMascotaById,
  createMascota,
  cancelMascota,
  updateMascota,
}
