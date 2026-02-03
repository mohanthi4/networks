const createResponseContent = async (path) => {
  const content = await Deno.readTextFile(path);
  return `${content}`;
};

const createSuccessResponse = async (path) => {
  const content = await createResponseContent(path);
  const response = {
    statusCode: "200",
    statusDesc: "OK",
    content,
    header: { "Content-Length": content.length, "Content-type": "text/html" },
  };
  return response;
};

const createFailureResponse = async () => {
  const content = await createResponseContent("./data/not-found.html");
  const response = {
    statusCode: "404",
    statusDesc: "FILE NOT FOUND",
    content,
    header: { "Content-Length": content.length, "Content-type": "text/html" },
  };
  return response;
};

const filePaths = {
  "/": "./data/lang_wikipedia.html",
  "/lang_wikipedia.html": "./data/lang_wikipedia.html",
  "/lang_html.html": "./data/lang_html.html",
};

export const requestHandler = async (request) => {
  const path = filePaths[request.path];
  switch (request.path) {
    case "/":
      return await createSuccessResponse(path);
    case "/lang_wikipedia.html":
      return await createSuccessResponse(path);
    case "/lang_html.html":
      return await createSuccessResponse(path);
    default:
      return await createFailureResponse();
  }
};
