const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));
const db = mongoose.connection;
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/staylo');
    console.log("connected to mongoose!!!");
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Reconnect with nature and those you love at our campgrounds. Whether you’re seeking peaceful solitude or exciting outdoor adventures, this is the place where memories are made and stories are shared under the stars.",
            price
        });
        await camp.save();
    }
}

seedDB().then(() => { mongoose.connection.close(); })