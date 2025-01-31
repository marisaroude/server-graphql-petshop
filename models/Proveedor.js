module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define(
    'proveedor',
    {
      id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      cuit: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'proveedor',
      timestamps: false,
    },
  )

  return Proveedor
}
