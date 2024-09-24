import sdk, { ClientEvent } from "matrix-js-sdk";

export const roomInfo: {
  rooms: sdk.Room[];
} = { rooms: [] };

const matrixClient = sdk.createClient({
  baseUrl: "http://10.202.20.237:8008/",
  // accessToken: "syt_amhzb244MTk_nzOHOuXqGZqvLLwHXHIp_3M4Vmn",
  // userId: "@jhson819:matrix.org",
});

matrixClient.once(ClientEvent.Sync, (state, prevState, res) => {
  // console.log("state: ", state);
  // console.log("prevState: ", prevState);
  // console.log("res: ", res);
});

matrixClient.on(ClientEvent.Room, function () {
  // const roomList = matrixClient.getRooms();
  // console.log("roomList: ", roomList);
});

export default matrixClient;
