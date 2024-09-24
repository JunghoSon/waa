import { NextRequest, NextResponse } from "next/server";
import matrixClient from "@/utils/matrix-connect";

export async function GET(req: NextRequest) {
  // console.log(matrixClient);
  try {
    const data = await matrixClient.getRooms();
    const rooms = data.map((room) => {
      console.log("roomId: ", room.roomId);
      return room.roomId;
    });
    console.log("rooms: ", rooms);
    return NextResponse.json({ rooms });
  } catch (err) {
    console.log("err: ", err);
  }
}
