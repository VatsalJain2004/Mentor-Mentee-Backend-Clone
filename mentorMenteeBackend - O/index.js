require('dotenv').config();
const express = require('express');
const mentorRoutes = require('./roles/mentor/routes');
const menteeRoutes = require('./roles/mentee/routes');
const adminRoutes = require('./roles/admin/routes');
const mentorCoordinatorRoutes = require('./roles/mentorCoordinator/routes');
const authRoutes = require('./roles/auth/routes');
const cors = require('cors');


const app = express();
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:9090",
    credentials: true,
  })
);


// Role-specific routes
app.use('/api/mentor', mentorRoutes);
app.use('/api/mentee', menteeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mentorCoordinator', mentorCoordinatorRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
