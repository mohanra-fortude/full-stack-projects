function removeDoubleQuotes(str: string) {
  str = str.replace(/^"(.*)"$/, "$1");
  return str;
}
//get the user data stored in session, convert session variables of type string|null to string
function getUserData() {
  const firstName = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("firstName"))
  );
  const lastName = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("lastName"))
  );
  const lastLogin = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("lastLogin"))
  );
  const mobileNum = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("mobile"))
  );
  const role = removeDoubleQuotes(JSON.stringify(localStorage.getItem("role")));
  const email = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("userEmail"))
  );
  const userId = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("userId"))
  );
  const profilePicture = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("profilePicture"))
  );
  const firstTimeLogin = removeDoubleQuotes(
    JSON.stringify(localStorage.getItem("firstTimeLogin"))
  );
  return {
    firstName,
    lastName,
    lastLogin,
    mobileNum,
    role,
    email,
    userId,
    profilePicture,
    firstTimeLogin,
  };
}

export default getUserData;
