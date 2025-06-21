import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
