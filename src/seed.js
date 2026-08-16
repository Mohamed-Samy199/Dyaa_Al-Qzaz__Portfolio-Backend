import "dotenv/config";
import { connectDB } from "./db/connection.db.js";
import User from "./models/User.model.js";

const seedAdmin = async () => {
  await connectDB();

  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (exists) {
    console.log("⚠️  Admin already exists.");
    process.exit(0);
  }

  await User.create({
    name: "Dyaa Al-Qzaz",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log("✅ Admin created successfully.");
  process.exit(0);
};

seedAdmin();