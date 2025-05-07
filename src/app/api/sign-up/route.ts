import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const {username,password,email} = await request.json();
    
  } catch (error) {
    console.error("Error in registering user: ", error);
    return Response.json(
      {
        success: false,
        message: "Error in registering user",
      },
      {
        status: 500,
      }
    );
  }
}
