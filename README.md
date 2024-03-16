# Home Library Service

```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
part 1
  users tests: npm run test test/users.e2e.spec.ts
  artists tests: npm run test test/artists.e2e.spec.ts
  tracks tests: npm run test test/tracks.e2e.spec.ts
  albums tests: npm run test test/albums.e2e.spec.ts
  favorites tests: npm run test test/favorites.e2e.spec.ts

```
part2
# RUN npm install rimraf -g
# RUN npm install -g @nestjs/cli
docker-compose build
docker-compose up

PORT=4000(4001)
PROD_PORT=5432  in .env (.emv.example)

<!--  plus prod : -->
docker build -t nestjs-docker .
docker run nestjs-docker
docker build -t nestjs-docker .
docker run -p 4000:4000 nestjs-docker
docker run -p 3000:4000 nestjs-docker

docker build -t nestjs-prod -f Dockerfile.prod .
docker run -p 4000:4000 nestjs-prod

docker-compose up --build
docker-compose -f docker-compose.prod.yml up --build
docker-compose -f docker-compose.yml up --build


To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
