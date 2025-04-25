import { app, startApolloServer } from './app';

const PORT = process.env.DOCKER_PORT || 3001;
const LOCAL_PORT = process.env.HOST_PORT || 4001;

startApolloServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 User-service ready at http://localhost:${LOCAL_PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err);
  });