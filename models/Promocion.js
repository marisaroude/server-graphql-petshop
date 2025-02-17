module.exports = (sequelize, DataTypes) => {
  const Promocion = sequelize.define(
    'promocion',
    {
      id_promocion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfterFechaInicio(value) {
            if (this.fecha_inicio && value <= this.fecha_inicio) {
              throw new Error('La fecha_fin debe ser mayor que la fecha_inicio')
            }
          },
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: 'promocion',
      timestamps: false,
    },
  )

  return Promocion
}
