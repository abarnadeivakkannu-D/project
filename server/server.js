import express from 'express';
import cors from 'cors';
import routes from './app/route/index.js';
import db from './app/config/db.config.js';

const app = express();

app.use(express.json({
  limit: '524288000'
}));
app.use(express.urlencoded({
  extended: true
}));

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

global.__basedir = process.cwd();

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log(' Database connected successfully.');

    // Add this line to automatically create tables if they do NOT exist
    await db.sequelize.sync(); // or db.sequelize.sync({ force: false })

    console.log(" All models synchronized (tables created).");
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
})();

routes(app);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running at: http://localhost:${PORT}`);
});
