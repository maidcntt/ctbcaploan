const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { admin, userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { logOne, logTwo, insertLogs } = require('../fixtures/log.fixture');

setupTestDB();

describe('Log routes', () => {
  describe('GET /v1/logs', () => {
    beforeEach(async () => {
      await insertUsers([admin]);
    });

    test('should return 200 and apply the default query options', async () => {
      await insertLogs([logOne, logTwo]);

      const res = await request(app)
        .get('/v1/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        rows: expect.any(Array),
        count: 2
      });
      expect(res.body.rows).toHaveLength(2);
      expect(res.body.rows[0]).toEqual({
        id: logOne.id,
        name: logOne.name
      });
    });

    test('should return 401 if access token is missing', async () => {
      await insertLogs([logOne, logTwo]);

      await request(app).get('/v1/logs').send().expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 402 if a non-admin is trying to access all logs', async () => {
      await insertUsers([userOne]);
      await insertLogs([logOne, logTwo]);

      await request(app)
        .get('/v1/logs')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    test('should correctly apply filter on name field', async () => {
      await insertLogs([logOne, logTwo]);

      const res = await request(app)
        .get('/v1/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ name: logOne.name })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        rows: expect.any(Array),
        count: 1
      });
      expect(res.body.rows).toHaveLength(1);
      expect(res.body.rows[0].id).toBe(logOne.id);
    });

    test('should limit returned array if limit param is specified', async () => {
      await insertLogs([logOne, logTwo]);

      const res = await request(app)
        .get('/v1/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ limit: 2 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        rows: expect.any(Array),
        count: 2
      });
      expect(res.body.rows).toHaveLength(2);
      expect(res.body.rows[0].id).toBe(logOne.id);
      expect(res.body.rows[1].id).toBe(logTwo.id);
    });

    test('should return the correct page if page and limit params are specified', async () => {
      await insertLogs([logOne, logTwo]);

      const res = await request(app)
        .get('/v1/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ page: 2, limit: 1 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        rows: expect.any(Array),
        count: 2
      });
      expect(res.body.rows).toHaveLength(1);
      expect(res.body.rows[0].id).toBe(logTwo.id);
    });
  });
});
