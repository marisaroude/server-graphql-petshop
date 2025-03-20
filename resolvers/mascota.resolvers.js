const {
    getMascotas,
    createMascota,
    cancelMascota,
  } = require('../controllers/mascota.controller');
  
  const mascotaResolvers = {
    Query: {
      mascotas: async () => await getMascotas(),
    },
    Mutation: {
      createMascota: async (_, args) => await createMascota(args),
      cancelMascota: async (_, { id_mascota }) => await cancelMascota({ id_mascota }),
    },

  };
  
  module.exports = mascotaResolvers;