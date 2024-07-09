const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb+srv://anushreesinghania1802:<Anu18022004_>@intelproject.plnmnwk.mongodb.net/?retryWrites=true&w=majority&appName=intelProject';
const client = new MongoClient(uri);

async function getServices() {
    try {
        await client.connect();
        const database = client.db('Listing');
        const collection = database.collection('ServicesIntel');
        return await collection.find({}).toArray();
    } finally {
        await client.close();
    }
}

app.get('/servicesIntel', async (req, res) => {
    try {
        const services = await getServices();
        let html = '<!DOCTYPE html><html><head><title>Services</title></head><body>';
        html += '<h1>List of Services</h1><ul>';
        services.forEach(service => {
            html += `<li><strong>${service.service_name}:</strong> ${service.description}</li>`;
        });
        html += '</ul></body></html>';
        res.send(html);
    } catch (err) {
        res.status(500).send('Error fetching services');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
