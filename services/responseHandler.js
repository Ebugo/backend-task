const responseHandler = (isValidForRule, message) => {
  let result = { message }
  result.status = isValidForRule === true ? 'success' : 'error';
  result.data = isValidForRule === true ? { isValidForRule } : null;

  return result;
};

module.exports = responseHandler;
