// Mock the Prisma client before importing the actual app or other files
jest.mock('../prisma/client');

// Now import prisma to get the mocked version
import { prisma } from '../prisma/client';
import request from 'supertest';
import { app } from '../app';

describe('GraphQL - UserService - myProfile & profile', () => {
  it('should return my profile when authenticated', async () => {
    // Ensure findUnique is mocked
    (prisma.profile.findUnique as jest.Mock).mockResolvedValue({
      id: 'profile-id-123',
      userId: '26a17ba6-80b0-4366-9692-42b7b11b63bb',
      name: 'Mock User',
    });

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `query {
          myProfile {
            id
            userId
            name
          }
        }`,
      });

    expect(res.body.data.myProfile).toMatchObject({
      id: 'profile-id-123',
      userId: '26a17ba6-80b0-4366-9692-42b7b11b63bb',
      name: 'Mock User',
    });
  });
});
