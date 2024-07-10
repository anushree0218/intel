const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const app = express();
const port = 3003; // You can change the port if needed

// Import MongoDB connections
const collection = require("./src/mongodb"); // For login/signup
const Service = require("./src/mongodbservice"); // For service provider

// Paths
const templatePath = path.join(__dirname, 'views'); // Adjusted path

// Middleware
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("wrong password");
        }

    } catch {
        res.send("wrong details");
    }
});

// User Dashboard route
app.get('/user-dashboard', (req, res) => {
    res.render('user-dashboard'); // Create a user-dashboard.hbs file
});

// Provider Dashboard route
app.get('/provider-dashboard', (req, res) => {
    res.render('provider-dashboard'); // Create a provider-dashboard.hbs file
});

// Route to handle provider form submission
app.post('/provider', async (req, res) => {
  const { typeofservices, phoneno, Location } = req.body;

  const newService = new Service({
    typeofservices,
    phoneno,
    location: Location // 'Location' should match the name attribute in the HTML form
  });

  try {
    await newService.save();
    res.send('Service provider registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving to database');
  }
});

// Route to handle search request
app.get('/search', async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const results = await Service.find({ typeofservices: { $regex: searchQuery, $options: 'i' } });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching the database');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});