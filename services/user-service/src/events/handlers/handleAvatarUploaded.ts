import { updateProfileAvatar } from '../../services/profileService';

interface EventBridgeEvent {
  detail: {
    userId: string;
    avatarUrl: string;
  };
  [key: string]: any;
}

export const handleAvatarUploaded = async (event: EventBridgeEvent) => {
  const { userId, avatarUrl } = event.detail;

  await updateProfileAvatar(userId, avatarUrl);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Avatar updated successfully' }),
  };
};
