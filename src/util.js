export function setSessionData(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}

export function getSessionData(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

export function removeSessionData(name) {
  sessionStorage.removeItem(name);
}

export function setUserData(data) {
  setSessionData("user", data)
}

export function getUserData() {
  return JSON.parse(sessionStorage.getItem("user"));
}

export function clearUserData() {
  removeSessionData("user");
}

export function getUserId() {
  const userData = getUserData();
  return userData?.objectId;
}

export function getUserToken() {
  const userData = getUserData();
  return userData?.sessionToken;
}

export function isOwner(ownerId) {
  const currentUser = getUserId();
  return currentUser == ownerId;
}

export function createSubmitHandler(callback) {
  return function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = [...formData.entries()].map(([k, v]) => [k, v.toString().trim()]);
    callback(Object.fromEntries(entries), e.target);
  };
}

/**
 * Creates pointer for given class and for certain object
 * @param {string} className - the class in back4App to which the pointer points
 * @param {string} refferencedObjectId - the refferenced objects's ID
 * @returns 
 */
export function pointer(className, refferencedObjectId) {
  return { "__type": "Pointer", "className": className, "objectId": refferencedObjectId }
}

export function findEmptyQuestion(question) {
  return question.text == "" || question.answers.includes(null) || question.correctIndex == - 1;
}

/**
 * Parses given query into object with keys and values
 * @param {string} query 
 * @returns {Object}
 */
export function parseQuery(query) {
  if (!query) {
      return null;
  }

  return Object.fromEntries(query
      .split('&')
      .map(prop => prop.split('=')));
}
