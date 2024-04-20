// apiRequest.js

let API_URL = `http://localhost:3333/api`;



export class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const apiRequest = async (method, path, body = null) => {
  const URL = API_URL+path;
  const options = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  };


  const res = await fetch(URL, options);
  const resData = await res.json();

  if (res.status !== 200) {
    throw new HTTPError(res.status, resData.error || "Unknown error");
  }

  return resData;
};

export  {API_URL, apiRequest};
