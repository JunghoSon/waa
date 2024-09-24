import { NextRequest, NextResponse } from "next/server";
import matrixClient from "@/utils/matrix-connect";

export async function GET(req: NextRequest) {
  // console.log(matrixClient);
  try {
    await matrixClient.login("m.login.password", {
      user: "jhson",
      password: "WjdghThs0814!@",
    });

    matrixClient.startClient();

    return NextResponse.json({ text: "logged in!!!" });
  } catch (err) {
    console.log("err: ", err);
  }
}
