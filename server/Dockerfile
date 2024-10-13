FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate && npm run build

ENV PORT 3000

EXPOSE 3000

CMD ["npm","start"]