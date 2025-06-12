import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors"

const app = express();
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:9090",
    credentials: true,
  })
);


// // Role-specific routes
// app.use('/api/mentor', mentorRoutes);
// app.use('/api/mentee', menteeRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/mentorCoordinator', mentorCoordinatorRoutes);
// app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
