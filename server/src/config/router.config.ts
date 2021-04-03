import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const routerConfig = (router: express.Router) => {
  router.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN
          : "http://localhost:3000",
      credentials: true,
    })
  );
  router.use(cookieParser());
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
};

export default routerConfig;
