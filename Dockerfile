FROM node:latest

COPY . /

RUN apt-get install tzdata
ENV TZ="Asia/Jakarta"

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]