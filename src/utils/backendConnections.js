// const homeURL='http://192.168.0.101:4000'
// const tomURL = 'http://192.168.1.52:4000'

export const postToDatabase = async (data, collection) => {
  const body = JSON.stringify(data);
  return fetch(`http://192.168.0.103:4000/${collection}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("something went wrong", err));
};

export const getFromDatabase = async (collection, searchTerm) => {
  return fetch(
    `http://192.168.0.103:4000/${collection}?searchTerm=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log("something went wrong", err));
};
