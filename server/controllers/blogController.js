require('dotenv').config();
const res = require("express/lib/response");
require('../models/db');
const Category = require('../models/category');
const blogPosts = require('../models/blogPosts');
const nodemailer = require('nodemailer');

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req,res) => {

    
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await blogPosts.find({}).sort({_id: -1}).limit(limitNumber);
        const Ebun = await blogPosts.find({ 'category': 'Ebun' }).limit(limitNumber);
        const Mogbo = await blogPosts.find({ 'category': 'Mogbo' }).limit(limitNumber);
        const Cloud = await blogPosts.find({ 'category': 'Cloud' }).limit(limitNumber);

        const food = { latest, Ebun, Mogbo, Cloud };
        

        res.render('index', { title: 'TeyiLovesMondays', layout:'./layouts/homepage.ejs', categories, food });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }


}

/**
 * GET /categories
 * Categories
 */
 exports.exploreCategories = async(req,res) => {
    
    
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);


        res.render('categories', { title: 'TeyiLovesMondays - Categories', categories });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/**
 * GET /categories/:id
 * Categories
 */
 exports.exploreCategoriesByID = async(req,res) => {
    
    try {

        let categoryId = req.params.id;

        const limitNumber = 20;
        const categoryById = await blogPosts.find({'category': categoryId}).limit(limitNumber);


        res.render('categories', { title: 'TeyiLovesMondays - Categories', categoryById });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}


/**
 * GET /
 * blog/:id
 */
 exports.exploreBlogPost = async(req,res) => {
    
    try {
        let blogId = req.params.id;

        const blog = await blogPosts.findById(blogId);
        res.render('blogpost', { title: 'TeyiLovesMondays - Blog', blog});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}


/**
 * GET /
 * test/
 */
exports.exploreTest = async(req,res) => {
    try {
        res.render('testfinal', {title: 'TestBlog' })
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});        
    }
}

/**
 * GET /submit-recipe
 * Submit Details
 */

exports.submitBlog = async(req,res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-blog', { title: 'TeyiLovesMondays - Submit Name', infoErrorsObj, infoSubmitObj});
}

/**
 * POST /submit-recipe
 * Submit Details
 */

 exports.submitBlogOnPost = async(req,res) => {

    const output =`
    <h2>Dear ${req.body.name},</h2>
    <p>Thank you for subscribing!</p>
    <p>This really means a lot to me! It's obvious that you like having fun since you subscribed to this blog and We're gonna have a lot of fun.</p>
    <p>Every time there's a new post, you'll get a tiny notification. Once again, thank you!</p><br><br>
    <p>Yours relaxingly,</p>
    <h4>Teyi❤️</h4>`;

    const my_output =`
    <p>Name: ${req.body.name},</p>
    <p>Email: ${req.body.email},</p>
    <p>IG: ${req.body.ig},</p>`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.password
        }
    });

    const mailOptions = {
        from: `"TeyiLovesMondays" <${process.env.user}>`,
        to: req.body.email,
        subject: 'TeyiLovesMondays Notifications - We\'re now guyz😉',
        text: 'Hello World?',
        html: output
    }
    const myMailOptions = {
        from: process.env.user,
        to: process.env.user,
        subject: 'TeyiLovesMondays Notifications - User Details',
        text: 'Hello World?',
        html: my_output
    }

    try {
        transporter.sendMail(mailOptions, function(err,data){
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Email Sent');
            }
        });
        transporter.sendMail(myMailOptions, function(err,data){
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Email Sent');
            }
        });
        // console.log(req.body);
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('index', { title: 'TeyiLovesMondays', msg: 'Email has sent' }, categories);
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }

}


