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
    id: Number,
    tempData: Number,
    milkProductionData: Number,
    StepsData: Number
});

//define mongoose models
const Admin = model('User', userSchema);
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
connect('mongodb+srv://koustubhlap:kond018@koustubh18.qmw1c9a.mongodb.net/', {dbName: "CattleMonitoringSystem"});

//routes
app.get('admin/me', authenticateJwt, (req, res) => {
    const username = req.user.username;

    res.json({
        username: username
    });
});

app.post('/user/signup', (req, res) => {
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

app.listen(port, () => {
    console.log('Cattle Monitoring System backend server listening on port 3000');
});