import { requestHandler } from "./src/handler.js";
import { server } from "./src/localhost.js";

const main = async () => {
  await server(8000, requestHandler);
};

main();
