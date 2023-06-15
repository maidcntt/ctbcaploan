const faker = require('faker');
const { Log } = require('../../../src/models');

describe('Log model', () => {
  describe('Log validation', () => {
    let newLog;
    beforeEach(() => {
      newLog = {
        name: faker.random.word(),
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    test('should correctly validate a valid log', async () => {
      await expect(new Log(newLog).validate()).resolves.not.toThrow();
    });
  });
});
