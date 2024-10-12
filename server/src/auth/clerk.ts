import { createClerkClient } from "@clerk/clerk-sdk-node";

const clerkClient = createClerkClient({
  secretKey: process.env.CLIENT_SECRET_KEY,
});

export const clientList = async () => {
  const users = await clerkClient.clients.getClientList();
  return users;
};
