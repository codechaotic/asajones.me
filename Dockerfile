FROM tutum.co/codechaotic/node

ADD dist/ /app
WORKDIR /app
CMD ["--harmony", "app.js"]

RUN npm install
