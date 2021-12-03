const fastify = require('fastify')();
const path = require('path');
const { PORT } = require('./common/config');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
})

fastify.register(require('./resources/users/user.router'));
fastify.register(require('./resources/boards/board.router'));
fastify.register(require('./resources/tasks/task.router'));

// TODO: https://discord.com/channels/755676888680366081/755860337059823667/915298425002684417 обнови темплейт
// https://stackoverflow.com/questions/56577184/github-pull-changes-from-a-template-repository

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// fastify.register(require('fastify-swagger'), {
//   mode: 'static',
//   specification: {
//     path: '../doc/api.yaml',
//     baseDir: '/path/to/external/spec/files/location',
//   },
// })

// fastify.ready(err => {
//   if (err) throw err
//   fastify.swagger()
// })

// app.use(express.json());
// app.get
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

// app.use('/users', userRouter);

// module.exports = app;


