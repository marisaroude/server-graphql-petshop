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
        id_pregunta: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'pregunta',
            key: 'id_pregunta',
          },
          onDelete: 'CASCADE',
        },
      },
      {
        tableName: 'respuesta',
        timestamps: false,
      }
    );
  
    return Respuesta;
  };
  