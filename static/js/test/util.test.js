import Utils from '../util';

describe('JWT', () => {
  it('Should decode a token with unicode info', () => {
    const token = [
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.',
      'eyJpc3MiOiJhZXJvbGl0aC5vcmciLCJzdWIiOjEsInVzbiI6IkNcdTAwZTlzYXJEZWxTb2xhciIsImV4cCI6MTUxNzA2NDY0N30.',
      'FGEKHRnmdNZ7xAAzUkTiqL_OOQmreid49hc3-avpjGc',
    ].join('');

    expect(Utils.parseJWT(token)).toEqual({
      iss: 'aerolith.org',
      sub: 1,
      usn: 'CésarDelSolar',
      exp: 1517064647,
    });
  });
});
