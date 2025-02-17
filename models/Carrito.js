module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define(
    'carrito',
    {
      id_carrito: {
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
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'carrito',
      timestamps: false,
    },
  )

  return Carrito
}
