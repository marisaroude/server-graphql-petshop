module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define(
    'persona',
    {
      id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      correo_electronico: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      domicilio: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      fecha_baja: {
        type: DataTypes.DATE,
        defaultValue: null, 
      },
    },
    {
      tableName: 'persona',
      timestamps: false,
    },
  )
  return Persona
}
