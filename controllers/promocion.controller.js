//aca va la logica de negocio
// validaciones etc
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined
const { Op } = require('sequelize') //op es para operadores logicos

const { Promocion, ProductoServicio } = require('../models')
const { formatDate } = require('../handlers/date.handler')

//lamar los modelos aca en  los controllers

// funciones
//getpromocion
const checkDateOverlap = async (id_ps, newStart, newEnd, excludeId = null) => {
  const overlappingPromos = await Promocion.findAll({
    where: {
      id_ps,
      [Op.and]: [
        { fecha_inicio: { [Op.lte]: newEnd } }, //op.lte es menor o igual que
        { fecha_fin: { [Op.gte]: newStart } }, //op.gte es mayor o igual que
      ],
      ...(excludeId && { id_promocion: { [Op.ne]: excludeId } }), //usamos el exclude en el update, para no comparar la promo consigo misma
    },
  })

  if (overlappingPromos.length > 0) {
    throw new Error(
      'Ya existe una promoción para este producto en el rango de fechas seleccionado.',
    )
  }
}

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
        'El precio del producto es menor al valor de la promoción.',
      )
    }

    const formattedStartDate = formatDate(fecha_inicio)
    const formattedEndDate = formatDate(fecha_fin)

    // Validar solapamiento de fechas
    await checkDateOverlap(id_ps, formattedStartDate, formattedEndDate)

    const promocion = await Promocion.create({
      valor,
      fecha_inicio: formattedStartDate,
      fecha_fin: formattedEndDate,
      activo,
      id_ps,
    })

    return promocion
  } catch (error) {
    throw new Error(`${error.message}`)
  }
}

async function cancelPromocion({ id_promocion }) {
  try {
    if (!id_promocion) {
      throw new Error('promotion is required')
    }

    const promocion = await Promocion.findByPk(id_promocion)
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
    if (!id_promocion) {
      throw new Error('promotion is required')
    }

    const promocion = await Promocion.findByPk(id_promocion)
    if (!promocion) {
      throw new Error('Promotion not found')
    }

    const product = await ProductoServicio.findByPk(input.id_ps)

    if (product.precio < input.valor) {
      throw new Error(
        'El precio del producto es menor al valor de la promoción.',
      )
    }

    const formattedStartDate = formatDate(
      input.fecha_inicio || promocion.fecha_inicio,
    )

    const formattedEndDate = formatDate(input.fecha_fin || promocion.fecha_fin)

    const id_ps = input.id_ps || promocion.id_ps

    // Validar solapamiento de fechas excluyendo la promo actual
    await checkDateOverlap(
      id_ps,
      formattedStartDate,
      formattedEndDate,
      id_promocion,
    )

    const dataToUpdate = omitBy(input, isUndefined)

    await Promocion.update(dataToUpdate, {
      where: { id_promocion },
    })

    return { ...promocion.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`${error.message}`)
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
