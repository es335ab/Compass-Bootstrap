function getUrlVars(url) {

  /*
  * 【インターフェース】
  *  getUrlVars は必ず引数として window.location.href を渡す。
  *  現状のURLクエリパラメータをJavaScriptリテラルのオブジェクトで返す
  */


  var vars = {};
  var m = url.match(/\?(.*)$/);
  var queries, i, count, query;

  if (m) {
    queries = m[1].split('&');

    for (i = 0, count = queries.length; i < count; i++) {
      query = queries[i].split('=');
      vars[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
    }
  }

  return vars;
}

module.exports = getUrlVars;