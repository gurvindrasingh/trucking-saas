import request from 'supertest';
import { app, startApolloServer } from '../app';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

beforeAll(async () => {
  await startApolloServer();
});

// Utility: generate JWT
const generateToken = (userId: string) => {
  return jwt.sign({id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

describe('GraphQL - UserService - myProfile & profile', () => {

  it('should return my profile when authenticated', async () => {
    const token = generateToken('26a17ba6-80b0-4366-9692-42b7b11b63bb');

    const res = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          query {
            myProfile {
              userId
              name
            }
          }
        `,
      });

    console.log("Profile data555", res.body.errors);

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.myProfile).toMatchObject({
      userId: '26a17ba6-80b0-4366-9692-42b7b11b63bb',
      name: expect.any(String),
    });
  });

  it('should return null for myProfile if not authenticated', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            myProfile {
              userId
              name
            }
          }
        `,
      });

    expect(res.body.data.myProfile).toBeNull();
  });

  it('should return null for myProfile if token is invalid', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Authorization', 'Bearer invalid.token.here')
      .send({
        query: `
          query {
            myProfile {
              userId
              name
            }
          }
        `,
      });

    expect(res.body.data.myProfile).toBeNull();
  });

  it('should return user profile for valid ID', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            profile(userId: "26a17ba6-80b0-4366-9692-42b7b11b63bb") {
              userId
              name
            }
          }
        `,
      });
    if (res.body.errors) {
      console.error('GraphQL Errors:', res.body.errors);
    }
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.profile).toMatchObject({
      userId: '26a17ba6-80b0-4366-9692-42b7b11b63bb',
      name: expect.any(String),
    });
  });

  it('should return null for invalid user ID', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            profile(userId: "nonexistent-user") {
              userId
              name
            }
          }
        `,
      });

    expect(res.body.data.profile).toBeNull();
  });

});
