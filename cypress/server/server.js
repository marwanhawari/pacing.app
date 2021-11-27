const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.static("src"));

const server = app.listen(PORT, () =>
    console.log(`Started server on http://localhost:${PORT}/`)
);

app.get("/close", (req, res) => {
    res.send("Closing..");
    server.close();
    process.exit(0);
});
