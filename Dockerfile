FROM cypress/included:14.0.1

RUN mkdir /qaauto_cypress

WORKDIR /qaauto_cypress

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "cypress:runhw19"]