module.exports = (sequelize, Sequelize) => {
    const contact = sequelize.define("contacts", {
        firts_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
    });

    return contact;
}

