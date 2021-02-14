import express from "express";
import detect from "detect-port-alt";

const router = express.Router();

router.get("/api/status", async (_, res) => {
  const VillageStatus = await check_port(14400);
  const GameStatus = await check_port(14500);
  const status = {
    VillageStatus,
    GameStatus,
  };
  res.json(status);
});

async function check_port(port: number) {
  return detect(port)
    .then((_port: number) => {
      if (port === _port) {
        return "Offline";
      }
      return "Online";
    })
    .catch((err: Error) => {
      console.log(`Unexpected error : ${err}`);
      return "Error";
    });
}

module.exports = router;
