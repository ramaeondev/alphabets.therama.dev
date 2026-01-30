import { Client, Databases } from 'appwrite';

const appwriteConfig = {
    endpoint: 'https://api-v2.therama.dev/v1',
    projectId: '692a8520001d66741068',
    apiKey: 'standard_98617bb627244f29ae6257873c4c24d71fe96953e7719d16df6f424d5b02606f277e967b9d9fa1157959ac7c535af81b8b04a4f4c61357ca9371c45e018eb39ec11310677c112602f206529c1168889be4a1b3ef218880be854d7c97d54d48a18dc645beeaf94ed2cd66881630840d1550d30176c38f159380b1ed98a0df759d',
    databaseId: 'devpad_main',
};

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

// Initialize Databases
const databases = new Databases(client);

export { client, databases, appwriteConfig };
