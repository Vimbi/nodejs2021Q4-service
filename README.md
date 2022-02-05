# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
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

## Run application with docker

```
docker compose up
```
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


# Fastify
|   |   |
| ------ | ------ |
| Test duration | 40 sec |
| Virtual Users created | 48 |
| Virtual Users completed	| 48 |
| http.request | 240 |
| http.codes.201 | 48 |
| http.responses | 240 |
| http.codes.200 | 192 |
| vusers.failed | 0 |
| vusers.completed | 48 |
| http.response_time: |   |
| min: | 2 |
| max: | 65 |
| median: | 5 |
| p95: | 59,7 |
| p99: | 61 |
| vusers.session_length: | |
| min: | 127,3 |
| max: | 170,4 |
| median: | 133 |
| p95: | 138,4 |
| p99: | 147 |

# Express
|   |   |
| ------ | ------ |
| Test duration | 30 sec |
| Virtual Users created | 24 |
| Virtual Users completed | 24 |
| http.requests | 120 |
| http.codes.201 | 24 |
| http.responses | 120 |
| http.codes.200 | 96 |
| vusers.failed | 0 |
| vusers.completed | 24 |
| http.response_time: | |
| min: | 2 |
| max: | 61 |
| median: | 5 |
| p95: | 58,6 |
| p99: | 58,6	|
| vusers.session_length: |   |
| min: | 126,7	|
| max: | 156,6	|
| median: | 130,3	|
| p95: | 135,7 |
| p99: | 135,7	|