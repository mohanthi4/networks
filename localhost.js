const decoder = new TextDecoder();
const encoder = new TextEncoder();

const createNotFoundResponse = () => `HTTP/1.1 401 Not-Found`;

const createFailResponse = () => {
  const content = Deno.readTextFileSync("./not-found.html");
  return [createNotFoundResponse(), "", createResponseContent(content)]
    .join("\r\n");
};

const createResponseLine = (protocol,statusCode) => `${protocol} ${statusCode} OK`;

const createResponseHeaders = (headers) => {
  return Object.entries(headers).map((header) => header.join(": "))
    .join("\r\n");
};

const createResponseContent = (path) => {
  const content = Deno.readTextFileSync(location);
  return `${content}`;
};

const createSuccessResponse = (location) => {
  const headers = {
    "Content-Type": "text/html",
    "Content-Length": location.length,
  };

  return [
    createResponseLine(),
    createResponseHeaders(headers),
    "",
    createResponseContent(content),
  ].join("\r\n");
};

const requestParse = async (conn) => {
  const buffer = new Uint8Array(1026);
  const bytes = await conn.read(buffer);
  const request = decoder.decode(buffer.slice(0, bytes));
  const [requestLine] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  return { method, path, protocol };
};

const filePath = {
  "/": "./lang_wikipedia.html",
  "/lang_wikipedia.html": "./lang_wikipedia.html",
  "/lang_html.html": "./lang_html.html",
  "/msg.js": "./msg.js",
};

const hanndleConn = async (conn) => {
  const request = await requestParse(conn);
  console.log(
    `Method : ${request.method} path : ${request.path} protocol : ${request.protocol}`,
  );
  let response = {};
  switch (request.path) {
    case "/":
      response.statusCode = "200";
      response.header["content-length"] = "123";
      response.body = 
  }
  // const response = !filePath[request.path]
  //   ? createFailResponse()
  //   : createSuccessResponse(filePath[request.path]);
  await conn.write(encoder.encode(response));
  await conn.close();
};

const connection = async () => {
  const listener = Deno.listen({
    port: 8000,
    transport: "tcp",
  });

  for await (const conn of listener) {
    console.log("connection established");
    hanndleConn(conn);
  }
};

connection();
