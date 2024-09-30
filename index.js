const express = require('express')
const app = express()
const cors = require("cors")
const port = 3000
// const pool = require("./db")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())




app.get("/users", async (req, res) => {
    try {
        // const allUsers = await pool.query("SELECT * FROM test1");
        const allUsers = await prisma.test1.findMany(); 
        res.status(200).json({
            data: allUsers,
        })
        // res.status(200).json(allUsers)
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
    
})

app.get("/users/:id", async (req, res) => {
    const idUsers = req.params.id;
    try {
        // const allUsers = await pool.query(`SELECT * FROM test1 WHERE user_id = ${idUsers}`);
        const allUsers = await prisma.test1.findUnique({
            where: {
                user_id: parseInt(idUsers)
            }
        });
        if (!allUsers){
            return res.status(404).json({
                status: "error",
                message: "user not found",
            })
        } 
        res.status(200).json({
            status: "success",
            data: allUsers,
        })
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
    
})

app.listen(port, () =>
    console.log(`server running at http://localhost:${port}`)
);