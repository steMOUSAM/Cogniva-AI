import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req){
    const wh=new Webhook(process.env.SIGNING_SECRET)
    const heaaderPayload = await headers()
    const svixHeaders = {
        "svix-id": heaaderPayload.get("svix-id"),
        "svix-timestamp": heaaderPayload.get("svix-timestamp"),
        "svix-signature": heaaderPayload.get("svix-signature"),
    };

    //get the payload and verify it
    const payload = await req.json();
    const body = JSON.stringify(patload);
    const{ data, type} = wh.verify(body,svixHeaders)

    //prepare the user data to be saved in the database
    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_addresses,
        name: `${data.forst_name} ${data.last_name}`,
        image: data.image_url,
    };
 
    await connectDB();

    switch(type){
        case 'user.created':
             await User.create(userData)
             break;

        case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData)
                break;

         case 'user.deteled':
                 await User.findByIdAndDelete(data.id)
                break;

                default:
                    break;

    }

    return NextResponse.json({message: "Event received"});
}