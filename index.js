const express = require("express");
const app = express();
const port = 3000;
const pool = require('./config')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

function createContacts(body) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "contacts" (first_name, last_name, phone_number, email) VALUES ($1, $2, $3, $4);`;
        

        pool
        .query(query, Object.values(body))
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

app.post('/', function(req, res) {
    createContacts(req.body)
    .then(data => {
        res.status(201).json({
            data,
            message: 'succes create contacts',
        })
    })
    .catch(err => {
        res.status(500).json({
            err,
            message: 'error create contacts',
        })
    })
    //({
    //     first_name: "Abdul",
    //     last_name: "Hadi",
    //     phone_number: "082377771505",
    //     email: "abdulhadibwd@altterra.id"
    // });
})

function getAllContacts() {
    return new Promise((resolve) => {
        const query = `SELECT * FROM "contacts" ORDER BY id`

        pool
            .query(query)
            .then((data) => {
                resolve(data.rows);
            })
            .catch((err) => {
                reject(err);
            })
    })
    
}

app.get("/", function(req, res) {
    getAllContacts()
    .then(data => {
        res.status(200).json({
            data,
            message: 'success get all contacts data',
        })
    })
    .catch(err => {
        res.status(500).json({
            err,
            message: 'failed to get all contacts data',
        })
    })
})

function updateContacts(params, body) {
    return new Promise((resolve, reject) => {
        const { first_name, last_name, phone_number, email } = body;

        const query = `UPDATE "contacts"
        SET
            first_name = $2,
            last_name = $3,
            phone_number = $4,
            email = $5
        WHERE
            id = $1;`;

        const values = [+params, first_name, last_name, phone_number, email];

        pool
        .query(query, values)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

app.put('/:id', function(req,res) {
    const id = req.params.id;

    updateContacts(id, req.body)
    .then((data) => {
        res.status(200).json({
            data,
            message: 'success update contacts',
        })
    })
})

function deleteContacts(params) {
    return new Promise((resolve) => {
        const query = `DELETE FROM "contacts" WHERE id = $1`

        pool.query(query, [params])
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err);
        });
    });
}

app.delete('/:id', function(req, res) {
    const id = req.params.id;

    deleteContacts()
    .then(data => {
        res.status(200).json({
            data,
            message: 'success delete contacts',
        })
    })
    .catch((err) => {
        res.status(500).json({
            err,
            message: 'Failed to delete contacts',
        })
    })
})

// const pool = new Pool({
//     user: 'postgres',
//     password: 'postgres',
//     database: 'mvc',
//     host: 'localhost',
//     port: 5050
// })


// app.get("/", function (req, res) {
//     res.send("Hello World from Hadi!");
// });

app.listen(port, function () {
  console.log("Server running on port:", port);
});


