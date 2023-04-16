const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routers/api/users");
const students = require("./routers/api/student");
const room = require("./routers/api/room");
const staff = require("./routers/api/staff");
const attendence = require("./routers/api/attendence")
const path = require("path");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/student", students);
app.use("/api/room", room);
app.use("/api/staff", staff);
app.use("/api/attendence", attendence)

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app };