const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbURL = "mongodb+srv://Chikun_65:mongodb65@cluster0.clozdnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main().then(() => {
    console.log("Data connected successfully");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbURL);
}

const Schema = new mongoose.Schema({
    BlogName: {
        type: String,
        required: true,
    },
    BlogDetails: {
        type: String,
        required: true,
    }
});

const Items = mongoose.model("Items", Schema);

app.listen(3000, () => {
    console.log("Listening successfully on port 3000");
});

app.get('/', async (req, res) => {
    let items = await Items.find();
    res.render('index', { items });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/', async (req, res) => {
    try {
        const newItem = new Items({
            BlogName: req.body.BlogName,
            BlogDetails: req.body.BlogDetails
        });
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).send("Error creating item");
    }
});

app.use((req,res)=>{
    res.status(404).send("<h1>Page not Found 404!:)</h1>");
})