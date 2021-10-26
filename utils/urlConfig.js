let host = 'https://ocr-server-1332883-1307883808.ap-shanghai.run.tcloudbase.com';
//let testHost = "https://ocr-server-1213654-1307253443.ap-shanghai.run.tcloudbase.com";
module.exports = {
  proxyLoginUrl: host + '/proxy/login',
  createAccountUrl:  host + '/proxy/create',
  createActiveCodeUrl:  host + '/proxy/authcode/{{proxyId}}',
  getRestNumUrl:  host + '/user/rest',
  activeCodeUrl:  host + '/user/active',
  getOpenIdUrl:  host + '/user/login',
  proxyActiveCodeUrl: host + '/proxy/charge/{{proxyId}}',
  setLabelUrl: host + '/proxy/setlabel/{{labelId}}',
  getLabelUrl:  host + '/proxy/label/{{labelId}}',
  imageAnalysisUrl: host + '/analysis'
};