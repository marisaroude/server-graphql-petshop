module.exports = (sequelize, DataTypes) => {
  const Mascota = sequelize.define(
    'mascota',
    {
      id_mascota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'persona',
          key: 'id_persona',
        },
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      raza: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      fecha_baja: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'mascota',
      timestamps: false,
    },
  )

  return Mascota
}
