module.exports = (sequelize, DataTypes) => {
  const IngresoProducto = sequelize.define(
    'ingreso_producto',
    {
      id_ip: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'proveedor',
          key: 'id_proveedor',
        },
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
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
    },
    {
      tableName: 'ingreso_producto',
      timestamps: false,
    },
  )

  return IngresoProducto
}
