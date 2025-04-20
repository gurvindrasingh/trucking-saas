#Auth Service
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .


# Add wait-for-it script
#COPY scripts/wait-for-it.sh /usr/src/app/wait-for-it.sh
#RUN chmod +x /usr/src/app/wait-for-it.sh

# Wait for the DB to be ready before running migrations and seeding
#RUN ./scripts/wait-for-it.sh auth-db-container:5432 -- npm run prisma:migrate
#RUN ./scripts/wait-for-it.sh auth-db-container:5432 -- npm run prisma:generate
#RUN ./scripts/wait-for-it.sh auth-db-container:5432 -- npm run prisma:seed

#RUN npm run prisma:migrate
RUN npm run prisma:generate
#RUN npm run prisma:seed

CMD ["npm", "run", "debug"]