import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import User from './models/User.js';

dotenv.config();

// Sample services data
const sampleServices = [
  {
    name: 'AC Installation',
    description: 'Professional installation of new air conditioning units with warranty',
    basePrice: 5000,
    duration: '2 hours',
    features: ['Free inspection', 'Installation', 'Testing', '1-year parts warranty']
  },
  {
    name: 'AC Repair',
    description: 'Expert repair service for all AC problems and issues',
    basePrice: 2000,
    duration: '1 hour',
    features: ['Diagnosis', 'Repair', 'Testing', 'Service guarantee']
  },
  {
    name: 'Gas Refill',
    description: 'Air conditioning gas refilling with pressure check',
    basePrice: 1500,
    duration: '30 mins',
    features: ['Quality gas', 'Pressure test', 'Leak check']
  },
  {
    name: 'AC Maintenance',
    description: 'Regular maintenance to keep your AC running smoothly',
    basePrice: 1000,
    duration: '1 hour',
    features: ['Filter cleaning', 'Coil inspection', 'Lubrication', '6-month warranty']
  },
  {
    name: 'AC Cleaning',
    description: 'Deep cleaning of AC unit for better efficiency',
    basePrice: 800,
    duration: '30 mins',
    features: ['Inside cleaning', 'Filter cleaning', 'Efficiency boost']
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@acservicing.com',
  password: 'admin123456',
  phone: '9999999999',
  role: 'admin'
};

// Sample regular user
const regularUser = {
  name: 'Demo User',
  email: 'user@example.com',
  password: 'user123456',
  phone: '1234567890',
  address: '123 Main Street',
  role: 'user'
};

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - commented out for safety)
    // await Service.deleteMany({});
    // await User.deleteMany({});

    // Check and create services
    console.log('🔄 Creating services...');
    for (const service of sampleServices) {
      const exists = await Service.findOne({ name: service.name });
      if (!exists) {
        await Service.create(service);
        console.log(`✅ Created service: ${service.name}`);
      } else {
        console.log(`⏭️  Service already exists: ${service.name}`);
      }
    }

    // Check and create admin user
    console.log('🔄 Creating admin user...');
    const adminExists = await User.findOne({ email: adminUser.email });
    if (!adminExists) {
      await User.create(adminUser);
      console.log(`✅ Created admin user`);
    } else {
      console.log(`⏭️  Admin user already exists`);
    }

    // Check and create regular user
    console.log('🔄 Creating demo user...');
    const userExists = await User.findOne({ email: regularUser.email });
    if (!userExists) {
      await User.create(regularUser);
      console.log(`✅ Created demo user`);
    } else {
      console.log(`⏭️  Demo user already exists`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('Admin - Email: admin@acservicing.com, Password: admin123456');
    console.log('User - Email: user@example.com, Password: user123456');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
