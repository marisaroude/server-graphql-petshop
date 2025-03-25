const {
  getMascotas,
  createMascota,
  cancelMascota,
  updateMascota,
} = require('../controllers/mascota.controller')

const mascotaResolvers = {
  Query: {
    mascotas: async () => await getMascotas(),
  },
  Mutation: {
    createMascota: async (_, args) => await createMascota(args),
    cancelMascota: async (_, { id_mascota }) =>
      await cancelMascota({ id_mascota }),
    updateMascota: async (_, args) => await updateMascota(args),
  },
}

module.exports = mascotaResolvers
