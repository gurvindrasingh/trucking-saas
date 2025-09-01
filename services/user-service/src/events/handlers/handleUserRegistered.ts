import { createProfileOnUserRegistered } from '../../services/profileService';

interface EventBridgeEvent {
  detail: {
    id: string;
    name: string;
    phone: string;
    bio: string;
  };
  [key: string]: any;
}

export const handleUserRegistered = async (event: EventBridgeEvent) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const { id, name, phone, bio } = event.detail;

  await createProfileOnUserRegistered( id, name, phone, bio );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Profile created successfully' }),
  };
};