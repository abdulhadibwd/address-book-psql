const db = require("../models");
const contacts = db.contacts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.first_name) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return
    }

    const body = {
        first_name: req.body.first_name,
        last_name: req.body.last_name ? req.body.last_name: null,
        phone_number: req.body.phone_number ? req.body.phone_number: null,
        email: req.body.email ? req.body.email: null,
    }

    contacts.create(body)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the contacts."
        })
    })
};

exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? {first_name: { [Op.ilike]: `%${first_name}`}} : null;

    contacts.exports({where: condition})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the contacts."
        })    
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    contacts.findByPK(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find contacts with id= ${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving contacts with id= ${id}.`,
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id;

    contacts.update(req.body, {
        where: { id: id },
    })
    .then((num) => {
        if (num == 1) {
            res.send({
                message: "contacts was updated successfully.",
            })
        } else {
            res.send({
                message: `Cannot update contacts with id= ${id}.`
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: `Error updating contacts with id= ${id}.`
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    contacts.destroy(req.body, {
        where: { id: id },
    })
    .then((num) => {
        if (num == 1) {
            res.send({
                message: "contacts was deleted successfully.",
            })
        } else {
            res.send({
                message: `Cannot delete contacts with id= ${id}.`
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: `Could not delete contacts with id= ${id}.`
        })
    })
}

exports.deleteAll = (req, res) => {
    contacts.destroy({
        where: {},
        truncate: false
    })
    .then((nums) => {
        res.send({
            message: `${nums} contacts were deleted successfully!`
        })
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while removing all contacts."
        })
    })
};