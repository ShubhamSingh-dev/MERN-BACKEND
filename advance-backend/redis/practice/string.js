const client = require("./client");

async function init() {
  const data = await client.get("aimodel:2"); //await is imp as we are taking data from redis(different database)
  console.log(data);
}

init();
