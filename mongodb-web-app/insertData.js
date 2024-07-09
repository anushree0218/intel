const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri);

async function insertServices() {
    try {
        await client.connect();
        const database = client.db('your_database');
        const collection = database.collection('services');

        const services = [
            { service_name: "Healthcare", description: "Services related to health and wellness" },
            { service_name: "Education", description: "Educational services and resources" },
            { service_name: "Transport", description: "Transport-related services and information" },
            { service_name: "Government Services", description: "Various services provided by the government" },
            { service_name: "Financial Services", description: "Banking, insurance, and other financial services" },
            { service_name: "Housing Services", description: "Services related to housing and accommodation" }
        ];

        await collection.insertMany(services);
        console.log("Data inserted successfully!");
    } finally {
        await client.close();
    }
}

insertServices().catch(console.error);
