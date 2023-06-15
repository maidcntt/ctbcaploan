const faker = require('faker');
const { Token } = require('../../../src/models');
const { tokenTypes } = require('../../../src/config/tokens');

describe('Token model', () => {
  describe('Token validation', () => {
    let newToken;
    beforeEach(() => {
      newToken = {
        token: faker.datatype.uuid(),
        user_id: faker.datatype.number(),
        type: tokenTypes.ACCESS,
        expires: new Date(),
        blacklisted: faker.datatype.boolean(),
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    test('should correctly validate a valid token', async () => {
      await expect(new Token(newToken).validate()).resolves.not.toThrow();
    });
  });
});
