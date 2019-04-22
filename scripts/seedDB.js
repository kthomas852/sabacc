const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/sabacc"
);

const userSeed = [
  {
    name: "Jim Jones",
    password: "1234",
    email:"jjones@yahoo.com"
  },
  {
    name: "Jenna Jones",
    password: "1234",
    email:"jcjones@yahoo.com"
  },
  {
    name: "Mac Twan",
    password: "1234",
    email:"macy@yahoo.com"
  },
  {
    name: "Lacy Keen",
    password: "1234",
    email:"lac@yahoo.com"
  },
  {
    name: "Ken Tron",
    password: "1234",
    email:"kensy@yahoo.com"
  }
];

const top5Seed = [
  {
    name: "Ken Tron",
    score: "$758,000"
  },
  {
    name: "Mac Twan",
    score: "680,000"
  },
  {
    name: "Lacy Keen",
    score: "670,000"
  },
  {
    name: "Jim Jones",
    score: "540,000"
  },
  {
    name: "Lando Calrissian",
    score: "389,000"
  }
]

const tableSeed = {
  players: [],
  pot: 0,
  sabaccPot: 0,
  currentMaxBet: 0
}

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " User records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Top5
  .remove({})
  .then(() => db.Top5.collection.insertMany(top5Seed))
  .then(data => {
    console.log(data.result.n + " Top records inserted");
    process.exit(0);
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

db.Table
  .remove({})
  // .then(() => db.Table.collection.insertOne(tableSeed))
  // .then(data => {
  //   console.log(data.result.n + " Table records cleared and inserted");
  //   process.exit(0)
  // })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })