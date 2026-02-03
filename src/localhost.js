import { formatResponse, parseRequest } from "./data_converters.js";

const getRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1026);
  const bytes = await conn.read(buffer);
  return decoder.decode(buffer.slice(0, bytes));
};

const sendResponse = async (conn, response) => {
  const encoder = new TextEncoder();
  await conn.write(encoder.encode(response));
};

const handleConn = async (conn, requestHandler) => {
  const userRequest = await getRequest(conn);
  const request = parseRequest(userRequest);
  const response = await requestHandler(request);
  const finalResponse = formatResponse(response, request);
  await sendResponse(conn, finalResponse);
};

export const server = async (port, requestHandler) => {
  const listener = Deno.listen({ port });

  for await (const conn of listener) {
    console.log("connection established");
    handleConn(conn, requestHandler);
  }
};
