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

After starting the app on port (4000 as default) you can openocker
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
or

  users tests: npm run test test/users.e2e.spec.ts
  artists tests: npm run test test/artists.e2e.spec.ts
  tracks tests: npm run test test/tracks.e2e.spec.ts
  albums tests: npm run test test/albums.e2e.spec.ts
  favorites tests: npm run test test/favorites.e2e.spec.ts

```


 <!-- part2

**recreate containers**
   prebuild
   npx prisma generate
   docker images
   docker-compose up -d

  npm uninstall @prisma/client
 npm install @prisma/client(prisma generate)
  npx prisma migrate dev --name init

 **check**
  - docker-compose logs api
  - docker-compose logs postgres

 docker-compose -f docker-compose.prod.yml up --build
docker-compose -f docker-compose.yml up --build  -->



...
...


**delete containers**
 - docker-compose down

**ontainerization, Docker**

checout to *docker_db*
  Create a .env file and copy the data from .env.example
  _run_  npm install
  _run_  prebuild
  _run_  docker-compose up --build
  _run_  npx prisma migrate dev --name init
  _run_  docker:scan api
  _run_  docker:scan postgres



'''
```

To run only one of all test suites

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
