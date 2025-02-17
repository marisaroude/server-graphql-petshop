module.exports = (sequelize, DataTypes) => {
  const Respuesta = sequelize.define(
    'respuesta',
    {
      id_respuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_preguntas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'preguntas',
          key: 'id_preguntas',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'respuesta',
      timestamps: false,
    },
  )

  return Respuesta
}
