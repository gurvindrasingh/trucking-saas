import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.AUTH_DOCKER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});