//aca va la logica de negocio
// validaciones etc
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Promocion } = require('../models')

//lamar los modelos aca en  los controllers

// funciones
//getpromocion

async function getPromocion() {
  return await Promocion.findAll()
}

async function createPromocion({
    id_promocion,
    valor,
    porcentaje,
    fecha_inicio,
    fecha_fin,
    activo,
    id_ps,
}) {
  try {
    if (
      !id_promocion ||
      !valor ||
      !porcentaje ||
      !fecha_inicio ||
      !fecha_fin ||
      !activo ||
      !id_ps
    ) {
      throw new Error(
        'Id, cost, percentage, start date, end date, state and product are required',
      )
    }

    const promocion = await Promocion.create({
      id_promocion,
      valor,
      porcentaje,
      fecha_inicio,
      fecha_fin,
      activo,
      id_ps,
    })

    return promocion
  } catch (error) {
    throw new Error(`Error creating the promotion: ${error.message}`)
  }
}

async function cancelPromocion({ id_promocion }) {
  try {
    if (!id_promocion) {
      throw new Error('promotion is required')
    }

    const promocion = await Promocion.findByPk(id_persona)
    if (!promocion) throw new Error('Promotion not found')

    promocion.activo = false
    await promocion.save()

    return promocion
  } catch (error) {
    throw new Error(`Error cancelling the promotion: ${error.message}`)
  }
}
async function updatePromocion({ id_promocion, input }) {
  try {
    console.log('{ id_promocion, input }', { id_promocion, input })
    if (!id_promocion) {
      throw new Error('promotion is required')
    }

    const promocion = await Promocion.findByPk(id_promocion)
    if (!promocion) {
      throw new Error('Promotion not found')
    }
    //
    // Filtrar valores undefined para evitar sobrescribir con null
    const dataToUpdate = omitBy(input, isUndefined)

    await Promocion.update(dataToUpdate, {
      where: { id_promocion },
    })

    return { ...promocion.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the promotion: ${error.message}`)
  }
}

module.exports = { getPromocion, createPromocion, cancelPromocion, updatePromocion }
