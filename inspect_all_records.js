const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://infouddoktayon_db_user:MaNjNXXXwTJFpWfH@ecare.h6ei31n.mongodb.net/ecare?appName=ecare";

const BlogSchema = new mongoose.Schema({}, { strict: false });
const TeamSchema = new mongoose.Schema({}, { strict: false });
const TestimonialSchema = new mongoose.Schema({}, { strict: false });
const PortfolioSchema = new mongoose.Schema({}, { strict: false });

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const blogs = await Blog.find({});
    console.log(`\n--- ALL BLOGS (${blogs.length}) ---`);
    blogs.forEach(b => console.log(JSON.stringify(b, null, 2)));

    const team = await Team.find({});
    console.log(`\n--- ALL TEAM MEMBERS (${team.length}) ---`);
    team.forEach(t => console.log(JSON.stringify(t, null, 2)));

    const testimonials = await Testimonial.find({});
    console.log(`\n--- ALL TESTIMONIALS (${testimonials.length}) ---`);
    testimonials.forEach(t => console.log(JSON.stringify(t, null, 2)));

    const portfolios = await Portfolio.find({});
    console.log(`\n--- ALL PORTFOLIOS (${portfolios.length}) ---`);
    portfolios.forEach(p => console.log(JSON.stringify(p, null, 2)));

  } catch (error) {
    console.error("Failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
