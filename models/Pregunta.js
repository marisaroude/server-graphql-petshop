module.exports = (sequelize, DataTypes) => {
    const Pregunta = sequelize.define(
      'Pregunta',
      {
        id_pregunta: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        estado: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        id_persona: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'persona',
            key: 'id_persona',
          },
          onDelete: 'CASCADE',
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
        tableName: 'pregunta',
        timestamps: false,
      },
    );
  
    return Pregunta;
  };