// const express = require('express');  // "type": "commonjs"
import express from "express";          // "type": "module"
import {MongoClient} from "mongodb";

const app = express();
const PORT = 4000;

const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL);   // -> dial
  // Top level await - A Await which is not inside the funtion is called as top level await.
await client.connect();                      // -> call
console.log("Mongo is connected !!!");

// Chat app code moved to bottom...

app.get("/", function (request, response){
  response.send("Hello World");
});

// const Queries = [
//   {
//     "username": "SamOne",
//     "Title": "Low Internet Speed",
//     "Type": "Techinical",
//     "QueryDiscription": "Work as been keep on intrupting, fix internet speed ASAP.",
//     "QueryNo": "1",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamTwo",
//     "Title": "Need to change the working Shift",
//     "Type": "NonTechinical",
//     "QueryDiscription": "Due to some helath related issues i want to change my shift from night to day shift.",
//     "QueryNo": "2",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamThree",
//     "Title": "Battery Problem",
//     "Type": "Techinical",
//     "QueryDiscription": "Laptop is facing power problem. It as to be stay on charging while it as been in use",
//     "QueryNo": "3",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamOne",
//     "Title": "Delay pickup by Cab",
//     "Type": "NonTechinical",
//     "QueryDiscription": "Got problem with cab pickup, can't able to reach office on time.",
//     "QueryNo": "4",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamTwo",
//     "Title": "OS need to be Installed",
//     "Type": "Techinical",
//     "QueryDiscription": "The OS that as been using will expire tomorrow, ReInstall the OS with any delay.",
//     "QueryNo": "5",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamThree",
//     "Title": "Team Collaboration ",
//     "Type": "NonTechinical",
//     "QueryDiscription": "As we started with a new project with already having a existing project at work, the man power seems to be limited to handle both the project. So assist more memebers to my team or provide team for collaboration or seperating the projecct with each time. Otherwise projet can be came to production in time.",
//     "QueryNo": "6",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamOne",
//     "Title": "Computer Malfunction",
//     "Type": "Techinical",
//     "QueryDiscription": "From day before yesterday facing issues while working with computer, the malfunction issue is significant and affects work flow. The prblem getting lot worst on today. Fix it as soon as possible",
//     "QueryNo": "7",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamTwo",
//     "Title": "Changing the cab pickup address",
//     "Type": "NonTechinical",
//     "QueryDiscription": "I am moving to new rent house so i want to change my cab location to my new place.",
//     "QueryNo": "8",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   },
//   {
//     "username": "SamThree",
//     "Title": "System is Slow",
//     "Type": "Techinical",
//     "QueryDiscription": "Kindly sort out the issue in my system of provide me good one. Which will helps to do work in time.",
//     "QueryNo": "9",
//     "Date": "01-09-2024",
//     "Time": "01:29:15"
//   }
// ];

app.get("/Queries", async function (request, response){
  const QueriesDetails = await client.db('HelpDesk').collection('Queries').find({}).toArray();
  console.log(QueriesDetails);
  response.send(QueriesDetails);
});

// app.get("/Queries/:username", async function (request, response){
//   const username = request.params.username;
//   console.log(username);
//   // const userDetails = Queries.filter((Qrs) => Qrs.username === username);
//   const QuserName = await client.db('HelpDesk').collection('Queries').find({ username: username }).toArray();
//   console.log(QuserName);
//   QuserName ? response.send(QuserName) : response.send({message : 'UserName not found'});
// });

// app.get("/Queries/:QueryNo", async function (request, response){
//   const QueryNo = request.params.QueryNo;
//   console.log(QueryNo);
//   const Qno = await client.db('HelpDesk').collection('Queries').findOne({QueryNo: QueryNo});
//   console.log(Qno);
//   Qno ? response.send(Qno) : response.send({message : 'QueryNo not found'});
// });

app.get("/Queries/:param", async function (request, response){
  const param = request.params.param;
  console.log(param);

  // In this code, isNaN(param) checks whether the parameter is a number. If it is a number, it is treated
  //   as a QueryNo; otherwise, it is treated as a username. This way, single route can be used to handle
  //   both cases dynamically. If the parameter is a QueryNo, it retrieves the single document, and if it's
  //   a username, it retrieves an array of documents.
  if (!isNaN(param)) {
    const Qno = await client.db('HelpDesk').collection('Queries').findOne({ QueryNo: param });
    Qno ? response.send(Qno) : response.status(404).send({ message: 'QueryNo not found' });
  } else {
    const QuserName = await client.db('HelpDesk').collection('Queries').find({ username: param }).toArray();
    QuserName.length > 0 ? response.send(QuserName) : response.status(404).send({ message: 'UserName not found' });
  }
});

app.post("/Queries", express.json(), async function (request,response){
  const Qdata = request.body;
  console.log(Qdata);
  //db.movies.insertMany(data)
  const result = await client.db("HelpDesk").collection("Queries").insertMany(Qdata);
  result ? response.send(result) : response.status(404).send({ message:'Data not found' });
  console.log(result);
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING IN: ${PORT}`)
});




// const http = require("http");
// const {Server} = require("socket.io");
// const cors = require("cors");

// Middleware,
// app.use(cors());         

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors:{
//     orgin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data);
//   });
// });