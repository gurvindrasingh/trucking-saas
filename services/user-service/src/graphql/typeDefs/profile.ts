import { gql } from 'apollo-server-express';

export const profileTypeDefs = gql`
  type Profile {
    id: String!
    userId: String!
    name: String
    phone: String
    avatar: String
    bio: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    profile(userId: String!): Profile
    myProfile: Profile
  }

  type Mutation {
    createOrUpdateProfile(name: String, phone: String, avatar: String, bio: String): Profile!
  }
`;
