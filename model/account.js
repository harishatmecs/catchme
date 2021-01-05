module.exports = (sequelize, type) => {
    const Account = sequelize.define("account", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        apikey: {
            type: type.STRING,
            notEmpty: true
        },
        Name: {
            type: type.STRING,
            notEmpty: true
        },
        status: {
            type: type.STRING,
            defaultValue: "ACTIVE",
        }
    });

    return Account;
};
