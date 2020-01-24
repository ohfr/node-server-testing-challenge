const express = require("express");

const server = express();

const db = require("./Animals/animals-model");

const port = process.env.port || 5000;

server.use(express.json());

server.get("/", (req, res, next) => {
    try {
        res.json({message: "Welcome to our API !"});
    } catch(err) {
        next(err);
    }
});

server.get("/all", async (req, res, next) => {
    try {
        res.json(await db.find());
    } catch(err) {
        next(err);
    }
})

server.get("/:id", async (req, res, next) => {
    try {
        res.json(await db.findById(req.params.id));
    } catch(err) {
        next(err);
    }
})

server.post("/", async (req, res, next) => {
    try {
        res.status(201).json(await db.add(req.body));
    } catch(err) {
        next(err);
    }
})

server.delete("/:id", async (req, res, next) => {
    try {
        await db.remove(req.params.id)
        res.status(204).json({message: "Successfully deleted"});
    } catch(err) {
        next(err);
    }
})

server.put("/:id", async (req, res, next) => {
    try {
        res.json(await db.update(req.params.id, req.body));
    } catch(err) {
        next(err);
    }
})

server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({message: "Something went wrong"});
});

if (!module.parent) {
    server.listen(port, () => {
        console.log(`\n *** Server running on port:${port} *** \n`);
    });
}

module.exports = server;