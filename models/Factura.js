module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define(
      'factura',
      {
        id_factura: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        id_pago: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'pago',
            key: 'id_pago',
          },
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        total: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        tableName: 'factura',
        timestamps: false,
      }
    );
  
    return Factura;
  };
  