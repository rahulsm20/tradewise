import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import prisma from "../prisma/client";
import { infuraProxy } from "./controllers/user";
import router from "./routes";

const app = express();
require("dotenv").config;

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  tokenSigningAlg: "RS256",
});

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "", "https ://tradewise.vercel.app"],
    credentials: true,
  })
);

app.post("/eth", infuraProxy);
app.use(jwtCheck);

app.use(
  "/",
  async (req, res, next) => {
    if (!req.auth) {
      res.redirect(process.env.CLIENT_URL || "");
    } else {
      const userExists = await prisma.user.findUnique({
        where: { userId: req.auth.payload.sub },
      });
      if (!userExists) {
        await prisma.user.create({
          data: {
            userId: req.auth.payload.sub,
          },
        });
      }
      next();
    }
  },
  router
);

app.listen(3000, () => console.log(`Listening on port 3000`));
