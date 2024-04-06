import express, { json } from 'express';
import pkg1 from 'jsonwebtoken';
import { Schema, model, connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
import { spawn } from 'child_process';
const port = 3000;

const app = express();

const {json: _json} = pkg;
const {verify, sign} = pkg1;

app.use(cors());
app.use(_json());

const secret = 'my-secret-key';

//define mongoose schemas
const adminSchema = new Schema({
    username: String,
    password: String
});

const cowSchema = new Schema({
    cow_id: String,
    tempData: Number,
    milkProductionData: String,
    StepsData: Number,
    imageLink: String,
    prediction: String
});

//define mongoose models
const Admin = model('Admin', adminSchema);
const Cow = model('Cow', cowSchema);

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        verify(token, secret, (err, user) => {
            if(err){
                return res.status(403);
            }

            req.user = user;
            next();
        });
    }

    else{
        res.status(401);
    }
}

//Connect to MongoDB
connect('mongodb+srv://koustubhlap:kond018@koustubh18.qmw1c9a.mongodb.net/', {dbName: "Cattle"});

//routes
app.get('/admin/me', authenticateJwt, (req, res) => {
    const username = req.user.username;

    res.json({
        username: username
    });
});

app.post('/admin/signup', (req, res) => {
    const {username, password} = req.body;

    function callback(admin){
        if(admin){
            res.status(403).json({message: 'Admin already exists'});
        }

        else{
            const obj = {username: username, password: password};
            const newAdmin = new Admin(obj);
            newAdmin.save();
            const token = sign({username, role: 'admin'}, secret, {expiresIn: '1h'});
            res.json({message: 'Admin created successfully', token});
        }
    }

    Admin.findOne({username}).then(callback);
});

app.post('/admin/login', async (req, res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});

    if(admin){
        const token = sign({username, role: 'user'}, secret, {expiresIn: '1h'});
        res.json({message: 'Admin logged in successfully', token});
    }

    else{
        res.status(403).json({message: 'Invalid username or password'});
    }
});

// Route to handle Arduino data
app.post('/arduino/data', async (req, res) => {
    try {
        const { cow_id, milk_production } = req.body;

        // Check if a cow with the same ID exists
        let cow = await Cow.findOne({ cow_id });

        if (cow) {
            // Update the existing cow document
            cow.milkProductionData = milk_production;
        } else {
            // Create a new cow document
            cow = new Cow({ cow_id, milkProductionData: milk_production });
        }

        // Save the cow document
        await cow.save();

        res.status(200).json({ message: "Arduino data received and stored successfully" });
    } catch (error) {
        console.error("Error processing Arduino data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to handle ESP32 data
app.post('/esp32/data', async (req, res) => {
    try {
        const { cow_id, temperature, step_count } = req.body;

        // Check if a cow with the same ID exists
        let cow = await Cow.findOne({ cow_id });

        if (!cow) {
            // If cow does not exist, create a new entry
            cow = new Cow({ cow_id });
        }

        else{
            // Update the cow document
            cow.tempData = temperature;
            cow.StepsData = step_count;
        }

        // Save the cow document
        await cow.save();

        res.status(200).json({ message: "ESP32 data received and stored successfully" });
    } catch (error) {
        console.error("Error processing ESP32 data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/cow/imageData', authenticateJwt, async (req, res) => {
    try {
        // Validate input
        if (!req.body.cow_id || !req.body.imageLink) {
            return res.status(400).json({ message: "Missing cow_id or imageLink in request body" });
        }

        // Search for cow with the provided cow_id
        const cow = await Cow.findOne({ cow_id: req.body.cow_id });

        if (!cow) {
            return res.status(404).json({ message: "Cow not found" });
        }

        // Execute the Python script using child_process.spawn
        const pythonProcess = spawn('python', ['/Users/koustubhlapate/Documents/repos/Cattle-Monitoring-System/Capstone_Cattle_CNN.py', req.body.imageLink]);

        // Handle data from Python script
        pythonProcess.stdout.on('data', (data) => {
            const prediction = data.toString().trim(); // Assuming the prediction is sent back as stdout from the Python script
            // Update the cow document with the prediction
            cow.prediction = prediction;
            // Save the updated cow document
            cow.save().then(() => {
                return res.status(200).json({ message: "Image data processed successfully", prediction });
            }).catch((error) => {
                console.error("Error saving cow document:", error);
                return res.status(500).json({ message: "Internal server error" });
            });
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error("Error processing image data:", data.toString());
            return res.status(500).json({ message: "Internal server error" });
        });

    } catch (error) {
        console.error("Error processing image data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/cowsData', authenticateJwt, async (req, res) => {
    try{
        const cows = await Cow.find({}, '-imageLink');
        res.json({cows});
    }

    catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log('Cattle Monitoring System backend server listening on port 3000');
});