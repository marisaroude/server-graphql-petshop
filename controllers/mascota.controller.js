const { omitBy, isUndefined } = require('lodash')

const { Mascota } = require('../models')

async function getMascotas() {
  return await Mascota.findAll()
}

// Crear una nueva mascota
async function createMascota({ id_persona, nombre, tipo, raza, descripcion }) {
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

    mascota.fecha_baja = new Date()
    await mascota.save()

    return {
      ...mascota.toJSON(),
      fecha_baja: mascota.fecha_baja.toISOString(),
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

module.exports = { getMascotas, createMascota, cancelMascota, updateMascota }
