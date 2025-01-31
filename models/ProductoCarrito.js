module.exports = (sequelize, DataTypes) => {
  const ProductoCarrito = sequelize.define(
    'producto_carrito',
    {
      id_pc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_ps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'producto_servicio',
          key: 'id_ps',
        },
      },
      id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carrito',
          key: 'id_carrito',
        },
      },
    },
    {
      tableName: 'producto_carrito',
      timestamps: false,
    },
  )

  return ProductoCarrito
}
