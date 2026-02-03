const createResponseContent = async (path) => {
  const content = await Deno.readTextFile(path);
  return `${content}`;
};

const desc = {
  "200": "OK",
  "404": "FILE NOT FOUND",
};

const createResponse = async (path, statusCode, contentType) => {
  const content = await createResponseContent(path);
  const response = {
    statusCode,
    statusDesc: desc[statusCode],
    content,
    header: { "Content-Length": content.length, "Content-type": contentType },
  };
  return response;
};

const filePaths = {
  "/": "./data/lang_wikipedia.html",
  "/lang_wikipedia.html": "./data/lang_wikipedia.html",
  "/lang_html.html": "./data/lang_html.html",
};

export const requestHandler = async (request) => {
  const path = filePaths[request.path] || "./data/not-found.html";
  const statusCode = filePaths[request.path] ? "200" : "404";
  return await createResponse(path, statusCode, "text/html");
};
