export const postToDatabase = async (data, collection) => {
  const body = JSON.stringify(data);

  return fetch(`http://192.168.1.52:4000/${collection}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("we went wrong", err));
};
