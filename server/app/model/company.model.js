export default (sequelize, DataTypes) => {
    return sequelize.define('company', {
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_person: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile_number: DataTypes.STRING
    }, {
        tableName: 'company',
        timestamps: false
    });
};
