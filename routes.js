module.exports = (app) => {
    const contacts = require("../controlllers/controller.js")
    var {outer} = require("express").Router()

    router.post("/", contacts.create)
    router.get("/", contacts.findAll)
    router.get("/", contacts.findOne)
    router.put("/", contacts.update)
    router.delete("/", contacts.delete)
    router.delete("/", contacts.deleteAll)

    app.use("/api/contacts", router)
}