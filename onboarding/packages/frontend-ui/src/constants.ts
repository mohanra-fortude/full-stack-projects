const host = window.location.host;
//const localhost = host.replace(/[^A-Za-z]+/g, "");
const constants = {
  BASE_URL: `http://localhost:8080/api`, // use this for local development temporarily
  //BASE_URL: `/api`,
};
const constantsForFrontend = {
  BASE_URL: `http://localhost:8080/api`,
  //BASE_URL: `/api`,
};

const storage = "aws"; //change it to "local" if you want files to get stored in your machine

export { constants, storage, constantsForFrontend, host };
