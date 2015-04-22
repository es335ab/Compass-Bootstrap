var getUrlVars = require('../../assets/js/utils/getUrlVars');

describe('getUrlVarsSpec', function () {

  const URL = 'http://localhost:5001/';
  const QUERY = 'number=123&float=3.14&text=foo%20bar&%E6%97%A5%E6%9C%AC%E8%AA%9E=%E3%81%BB%E3%81%92&array[]=1&array[]=2&empty=';

  var testUrl;

  beforeEach(function() {
    testUrl = URL +'?'+ QUERY;
  });

  it('URL から Object を取得できるか', function() {
    expect(getUrlVars(URL)).toEqual({});
    expect(getUrlVars(testUrl)).toEqual({
      'number': '123',
      'float': '3.14',
      'text': 'foo bar',
      '日本語': 'ほげ',
      'array[]': '2',
      'empty': ''
    });
  });

  it('keyに対応するvalueが取得できるかどうか', function () {
    var urlVars = getUrlVars(testUrl);

    expect(urlVars.number).toBe('123');
    expect(urlVars.float).toBe('3.14');
    expect(urlVars['array[]']).toBe('2');
    expect(urlVars.empty).toBe('');
  });

  it('エンコードされたURL変数に対してkeyに対応するvalueが取得できるかどうか', function () {
    var urlVars = getUrlVars(testUrl);

    expect(urlVars.text).toBe('foo bar');
    expect(urlVars['日本語']).toBe('ほげ');
  });

});
