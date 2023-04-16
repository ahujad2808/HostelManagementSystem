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
require("dotenv").config()
// const app=require('express')
// app.use(express.static("pages"))
// const app = express();

const app = express()
app.use(express.json())

app.use(express.static("client"))


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

//payment wala kam
const stripe = require("stripe")("sk_test_51MxVBqSHElEAUnMvIOqMrQgmf2eN72uwBxeDFuqCwMNOSdA1nhulMvw5RLuNjnJHqqtvDaBO5oE1xbTKoMHe7qUX00fulFG3U7")

const storeItems = new Map([
  [1, { priceInInr: 5000000, name: "Hostel Fees" }],
  [2, { priceInInr: 2000000, name: "Mess Fees" }],
])


app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInInr,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `http://localhost:3000/success.html`,
        cancel_url: `http://localhost:3000/cancel.html`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

app.listen(port, () => console.log(`Server running on port ${port}`));






module.exports = { app };