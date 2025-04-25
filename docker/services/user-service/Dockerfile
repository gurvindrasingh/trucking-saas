FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

#RUN npm run prisma:migrate
RUN npm run prisma:generate
#RUN npm run prisma:seed

CMD ["npm", "run", "debug"]
#CMD ["npm", "run", "dev"]

EXPOSE 4001