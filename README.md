# Home Library Service

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
```
or:
  users tests: npm run test test/users.e2e.spec.ts
  artists tests: npm run test test/artists.e2e.spec.ts
  tracks tests: npm run test test/tracks.e2e.spec.ts
  albums tests: npm run test test/albums.e2e.spec.ts
  favorites tests: npm run test test/favorites.e2e.spec.ts



##  Containerization, Docker

switch to __docker_db__
  Create a .env file and copy the data from .env.example

   ```
     npm install
  ```
  ```
    prisma generate
    npx prisma migrate dev --name init
    docker-compose up --build
  ```
  ```
    npm run test
  ```

**scan**
```
    docker:scan api
```
```
    docker:scan postgres
```

**delete containers**
```
  docker-compose down
```

**migrate**
```
  npx prisma migrate dev --name init
```



### To run only one of all test suites
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
