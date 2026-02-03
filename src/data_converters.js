export const parseRequest = (request) => {
  const [requestLine] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  return { method, path, protocol };
};

const createResponseHeaders = (headers) => {
  return Object.entries(headers).map((header) => header.join(": "))
    .join("\r\n");
};

const createResponseLine = (protocol, statusCode, statusDesc) =>
  `${protocol} ${statusCode} ${statusDesc}`;

export const formatResponse = (response, request) => {
  const { statusCode, statusDesc, header, content } = { ...response };
  const responseLine = createResponseLine(
    request.protocol,
    statusCode,
    statusDesc,
  );
  const headers = createResponseHeaders(header);
  return [responseLine, headers, "", content].join("\r\n");
};
