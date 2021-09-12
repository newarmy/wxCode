function setRequestHeader(openId) {
    return {
      'X-WX-OPENID': openId
     }
}
function checkEmptyString(content) {
  if (content === undefined || content === null || (typeof content === 'string' && content.length === 0)) {
      return true;
  }
  return false;
}

module.exports = {
  setRequestHeader,
  checkEmptyString
}
