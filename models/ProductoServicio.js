module.exports = (sequelize, DataTypes) => {
  const ProductoServicio = sequelize.define(
    'producto_servicio',
    {
      id_ps: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      categoria: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'producto_servicio',
      timestamps: false,
    },
  )

  return ProductoServicio
}
