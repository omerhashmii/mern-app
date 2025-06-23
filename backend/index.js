import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {sendEmail} from "./utils/sendEmail.js";

config({path:"./config.env"});

const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.post("/send/mail", async(req,res)=>{
    const {name,email,message} = req.body;
    
    if(!name || !email || !message){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        await sendEmail({
            email: "omerattique641@gmail.com",
            subject: "New Message from GymPulse_Ai",
            message,
            userEmail: email,
        });
        
        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({
            success: false,
            message: "Email not sent"
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});