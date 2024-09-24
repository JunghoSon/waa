const express = require("express");
const app = express();
const sdk = require("matrix-js-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const matrixClient = sdk.createClient({
  baseUrl: "http://10.202.20.237:8008/",
  // accessToken: "TU9lN1oqsqt_tZNgdbnzCxfNMJrgAnlNRNGEvBamgOc",
  // userId: "@jhson:10.202.20.237",
});

matrixClient.once(sdk.ClientEvent.Sync, (state, prevState, res) => {
  console.log("state: ", state);
  console.log("prevState: ", prevState);
  console.log("res: ", res);
});

matrixClient.on(sdk.ClientEvent.Room, function () {
  // const roomList = matrixClient.getRooms();
  // console.log("roomList: ", roomList);
});
app.post("/login", async (req, res) => {
  try {
    await matrixClient.login("m.login.password", {
      user: req.body.id,
      password: req.body.password,
    });

    const token = matrixClient.getAccessToken();
    matrixClient.startClient();
    res.json({ status: "success", token });
  } catch (err) {
    res.json({ status: "failed", message: err });
  }
});

app.get("/logout", async (req, res) => {
  await matrixClient.logout(true);

  res.json({ status: "success" });
});

app.post("/createRoom", async (req, res) => {
  const { name, invite } = req.body;
  const data = await matrixClient.createRoom({
    name,
    is_direct: true,
    invite,
  });

  res.json({ data });
});

app.get("/getUsers", async (req, res) => {
  const data = await matrixClient.getUsers();
  console.log(data);
  data.forEach((user) => {
    console.log(user);
  });

  res.json({ data });
});

app.get("/getRooms", async (req, res) => {
  const data = await matrixClient.getRooms();

  data.forEach((room) => {
    console.log("room: ", room);
    var members = room.getJoinedMembers();
    members.forEach((member) => {
      console.log(member.name);
    });
  });

  const rooms = data?.map((room) => {
    return { roomId: room.roomId, name: room.name };
  });

  console.log("rooms: ", rooms);

  res.json({ rooms });
});

app.listen(7001, () => {
  console.log("Server is started on 7001");
});
