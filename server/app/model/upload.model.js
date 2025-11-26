export default (sequelize, Sequelize) => {
    const upload = sequelize.define(
        "uploads", // table name in lowercase is recommended
        {
            filename: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
            timestamps: true, // adds createdAt and updatedAt
            tableName: "uploads", // explicitly set table name
        }
    );

    return upload;
};
