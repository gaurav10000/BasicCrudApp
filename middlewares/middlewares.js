// this is a middleware to check if all required fields are filled or not
exports.registerfieldChecker = (fields) => {
    const {name, email, password} = fields;
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

exports.loginfieldChecker = (fields) => {
    const {email, password} = fields;
  if (!email || !password) {
    return false;
  }
  return true;
};
