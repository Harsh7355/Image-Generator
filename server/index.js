require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const authrouter = require('./router/auth-router');
const servicerouter = require('./router/service-router');
const contactrouter = require('./router/contact-router');
const adminrouter = require('./router/admin-router');

const server = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Middlewares
server.use(cors(corsOptions));
server.use(express.json());

// Routes
server.use('/api/auth', authrouter);
server.use('/api/form', contactrouter);
server.use('/api/data', servicerouter);
server.use('/api/admin', adminrouter);

// ✅ Direct MongoDB connection here
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully');

    // Start server after DB is connected
    server.listen(8080, () => {
      console.log('Server is started on port 8080');
    });
  })
  .catch((error) => {
    console.log('Database is not connected');
    console.error(error);
  });
