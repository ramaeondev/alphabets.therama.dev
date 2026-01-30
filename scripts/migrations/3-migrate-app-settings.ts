#!/usr/bin/env tsx
/**
 * Migration Script: App Settings
 * 
 * This script creates default application settings in the Appwrite database
 * collection 'app_settings'.
 * 
 * Run: npm run migrate:app-settings
 */

import { Client, Databases, ID } from 'node-appwrite';

const appwriteConfig = {
    endpoint: 'https://api-v2.therama.dev/v1',
    projectId: '692a8520001d66741068',
    apiKey: 'standard_98617bb627244f29ae6257873c4c24d71fe96953e7719d16df6f424d5b02606f277e967b9d9fa1157959ac7c535af81b8b04a4f4c61357ca9371c45e018eb39ec11310677c112602f206529c1168889be4a1b3ef218880be854d7c97d54d48a18dc645beeaf94ed2cd66881630840d1550d30176c38f159380b1ed98a0df759d',
    databaseId: 'devpad_main',
    collectionId: 'app_settings',
};

// Application settings
const appSettings = [
    {
        key: 'default_voice_type',
        value: 'female',
        type: 'string',
        description: 'Default voice type for speech synthesis',
        is_active: true,
    },
    {
        key: 'default_image_source',
        value: 'local',
        type: 'string',
        description: 'Default image source for letter images',
        is_active: true,
    },
    {
        key: 'speech_rate',
        value: '0.9',
        type: 'number',
        description: 'Default speech synthesis rate',
        is_active: true,
    },
    {
        key: 'speech_error_threshold',
        value: '3',
        type: 'number',
        description: 'Number of speech errors before disabling',
        is_active: true,
    },
    {
        key: 'use_static_word',
        value: 'false',
        type: 'boolean',
        description: 'Use static word (A-Apple) vs random words',
        is_active: true,
    },
    {
        key: 'audio_pool_size',
        value: '5',
        type: 'number',
        description: 'Number of audio elements in the pool',
        is_active: true,
    },
];

async function migrateAppSettings() {
    console.log('🚀 Starting app-settings migration...\n');

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    const databases = new Databases(client);

    let successCount = 0;
    let errorCount = 0;

    for (const setting of appSettings) {
        try {
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collectionId,
                ID.unique(),
                setting
            );

            console.log(`✅ Migrated setting: ${setting.key}`);
            successCount++;
        } catch (error: any) {
            console.error(`❌ Failed to migrate setting: ${setting.key}`, error.message);
            errorCount++;
        }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${appSettings.length}`);
}

migrateAppSettings()
    .then(() => {
        console.log('\n✨ Migration completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Migration failed:', error);
        process.exit(1);
    });
