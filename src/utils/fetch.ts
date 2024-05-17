const dataFetcher = async ({ url, method = "GET", body, headers = {} }) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
  };
  if (body) {
    options["body"] = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export default dataFetcher;
