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


