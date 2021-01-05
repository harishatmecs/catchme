module.exports = (sequelize, type) => {
    const Ticket = sequelize.define("ticket", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        accountId: {
            type: type.STRING,
            notEmpty: true
        },
        title: {
            type: type.TEXT,
            notEmpty: true
        },
        description: {
            type: type.TEXT,
            notEmpty: true
        },
        priority: {
            type: type.STRING,
            notEmpty: true
        },
        image: {
            type: type.TEXT,
            notEmpty: true
        },
        status: {
            type: type.STRING,
            defaultValue: "ACTIVE",
        }
    });

    return Ticket;
};
