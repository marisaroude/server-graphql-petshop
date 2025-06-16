module.exports = (sequelize, DataTypes) => {
  const DetalleFactura = sequelize.define(
    'Detallefactura',
    {
      id_df: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      id_ps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'producto_servicio',
          key: 'id_PS',
        },
        onDelete: 'CASCADE',
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'factura',
          key: 'id_factura',
        },
        onDelete: 'CASCADE',
      },
      fecha_servicio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'detalle_factura',
      timestamps: false,
    },
  )

  return DetalleFactura
}
