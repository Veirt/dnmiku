import detect from "detect-port";

const checkServerPort = (port: number): Promise<any> => {
  return new Promise((resolve) => {
    detect(port)
      .then((_port: number) => {
        if (port === _port) {
          resolve("Offline");
        } else {
          resolve("Online");
        }
      })
      .catch((err: Error) => {
        console.error(`Error when checking server port: ${err}`);
      });
  });
};

export default checkServerPort;