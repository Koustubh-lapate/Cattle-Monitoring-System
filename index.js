import express, { json } from 'express';
import pkg1 from 'jsonwebtoken';
import { Schema, model, connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
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
    cow_id: Number,
    tempData: Number,
    milkProductionData: Number,
    StepsData: Number,
    imageLink: String
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

        // Update the imageLink field
        cow.imageLink = req.body.imageLink;

        // Save the updated cow document
        await cow.save();

        return res.status(200).json({ message: "Image data added successfully" });
    } 
    
    catch (error) {
        console.error("Error adding image data:", error);
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
})

app.listen(port, () => {
    console.log('Cattle Monitoring System backend server listening on port 3000');
});