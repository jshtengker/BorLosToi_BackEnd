const express = require('express')
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "server is running",
    })
})

app.listen(port, () =>
    console.log(`server running at http://localhost:${port}`)
);