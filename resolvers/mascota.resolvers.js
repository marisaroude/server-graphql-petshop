const {
  getMascotas,
  createMascota,
  cancelMascota,
  updateMascota,
  getMascotaById,
} = require('../controllers/mascota.controller')

const mascotaResolvers = {
  Query: {
    mascotas: async () => await getMascotas(),
    mascotaById: async (_, id_mascota) => await getMascotaById(id_mascota),
  },
  Mutation: {
    createMascota: async (_, args) => await createMascota(args),
    cancelMascota: async (_, { id_mascota }) =>
      await cancelMascota({ id_mascota }),
    updateMascota: async (_, args) => await updateMascota(args),
  },
}

module.exports = mascotaResolvers
