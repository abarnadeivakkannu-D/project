export default (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    company_id: {
      type: DataTypes.INTEGER, // Use DataTypes.INTEGER
      allowNull: false,
      references: { // lowercase
        model: 'company', // table name (not model variable)
        key: 'company_id' // referenced column
      }
    }
  }, {
    tableName: 'users', 
    timestamps: false
  });
};
