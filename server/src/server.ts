import {
  clerkClient,
  ClerkExpressWithAuth,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import cors from "cors";
import express from "express";
import prisma from "../prisma/client";
import router from "./routes";
import { infuraProxy } from "./controllers/user";
const app = express();
require("dotenv").config;

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.post("/eth", infuraProxy);
app.use(
  "/",
  ClerkExpressWithAuth({
    onError: (error) => {
      console.error(error);
    },
  }),
  async (req, res, next) => {
    if (!req.auth.userId) {
      res.redirect(process.env.CLIENT_URL || "");
    } else {
      const user = await clerkClient.users.getUser(req.auth.userId);
      const userExists = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      });
      if (!userExists) {
        await prisma.user.create({
          data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
          },
        });
      }
      next();
    }
  },
  router
);

app.listen(3000, () => console.log("Listening on port 3000"));