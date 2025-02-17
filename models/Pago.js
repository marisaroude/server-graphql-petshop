module.exports = (sequelize, DataTypes) => {
    const Pago = sequelize.define(
      'pago',
      {
        id_pago: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        id_carrito: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'carrito',
            key: 'id_carrito',
          },
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        monto: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        tableName: 'pago',
        timestamps: false,
      }
    );
  
    return Pago;
  };
  