//aca va la logica de negocio
// validaciones etc
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Promocion, ProductoServicio } = require('../models')

//lamar los modelos aca en  los controllers

// funciones
//getpromocion

async function getPromocion() {
  return await Promocion.findAll()
}

async function createPromocion({
  valor,
  fecha_inicio,
  fecha_fin,
  activo,
  id_ps,
}) {
  try {
    if (!valor || !fecha_inicio || !fecha_fin || !activo || !id_ps) {
      throw new Error(
        'cost, start date, end date, state and id product are required',
      )
    }
    const product = await ProductoServicio.findByPk(id_ps)

    if (product.precio < valor) {
      throw new Error(
        'El precio del producto es menor al valor de la promocion.',
      )
    }

    const promocion = await Promocion.create({
      valor,
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
    const product = await ProductoServicio.findByPk(input.id_ps)

    if (product.precio < input.valor) {
      throw new Error(
        'El precio del producto es menor al valor de la promocion.',
      )
    }
    if (!id_promocion) {
      throw new Error('promotion is required')
    }

    const promocion = await Promocion.findByPk(id_promocion)
    if (!promocion) {
      throw new Error('Promotion not found')
    }

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

async function getPromocionById({ id_promocion }) {
  if (!id_promocion) {
    throw new Error('ID is required')
  }

  const promocion = await Promocion.findByPk(id_promocion)

  if (!promocion) {
    throw new Error(`Promocion with id ${id_promocion} not found`)
  }

  return promocion
}
module.exports = {
  getPromocion,
  createPromocion,
  cancelPromocion,
  updatePromocion,
  getPromocionById,
}
