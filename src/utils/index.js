export const postToDatabase = async (data, collection) => {
  console.log(data, collection);
  const body = JSON.stringify(data);

  fetch(`http://192.168.0.101:4000/${collection}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.statusCode === 200) {
        console.log("happy :)");
      } else {
        console.log("bad :(");
      }
    })
    .catch((err) => console.log("we went wrong", err));
};
