import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../../../lib/actions/user.action";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;
      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        image: image_url,
        about: "Hello, I'm new here!",
      });
      console.log("User created", mongoUser);
      return NextResponse.json({
        message: "OK",
        user: mongoUser,
      });
    } else if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;
      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username!,
          email: email_addresses[0].email_address,
          image: image_url,
        },
        path: `/profile/${id}`,
      });
      console.log("User Updated", mongoUser);
      return NextResponse.json({
        message: "OK",
        user: mongoUser,
      });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const delUser = await deleteUser({
        clerkId: id!,
      });

      return NextResponse.json({
        message: "User Deleted",
        user: delUser,
      });
    }

    // Default response for unhandled event types
    return NextResponse.json({
      message: "Webhook received",
      eventType: eventType,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
