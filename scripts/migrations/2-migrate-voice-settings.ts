#!/usr/bin/env tsx
/**
 * Migration Script: Voice Settings
 * 
 * This script creates voice configuration data in the Appwrite database
 * collection 'voice_settings'.
 * 
 * Run: npm run migrate:voice-settings
 */

import { Client, Databases, ID } from 'node-appwrite';

const appwriteConfig = {
    endpoint: 'https://api-v2.therama.dev/v1',
    projectId: '692a8520001d66741068',
    apiKey: 'standard_98617bb627244f29ae6257873c4c24d71fe96953e7719d16df6f424d5b02606f277e967b9d9fa1157959ac7c535af81b8b04a4f4c61357ca9371c45e018eb39ec11310677c112602f206529c1168889be4a1b3ef218880be854d7c97d54d48a18dc645beeaf94ed2cd66881630840d1550d30176c38f159380b1ed98a0df759d',
    databaseId: 'devpad_main',
    collectionId: 'voice_settings',
};

// Voice configuration data
const voiceSettings = [
    {
        voice_type: 'male',
        voice_names: ['eddy', 'male', 'david', 'james', 'paul', 'thomas', 'daniel', 'guy', 'man'],
        language: 'en-US',
        priority: 1,
        pitch: 0.9,
        rate: 0.9,
        is_active: true,
    },
    {
        voice_type: 'female',
        voice_names: ['female', 'lisa', 'sarah', 'victoria', 'karen', 'woman', 'girl'],
        language: 'en-US',
        priority: 2,
        pitch: 1.2,
        rate: 0.9,
        is_active: true,
    },
];

async function migrateVoiceSettings() {
    console.log('🚀 Starting voice-settings migration...\n');

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    const databases = new Databases(client);

    let successCount = 0;
    let errorCount = 0;

    for (const setting of voiceSettings) {
        try {
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.collectionId,
                ID.unique(),
                setting
            );

            console.log(`✅ Migrated voice type: ${setting.voice_type}`);
            successCount++;
        } catch (error: any) {
            console.error(`❌ Failed to migrate voice type: ${setting.voice_type}`, error.message);
            errorCount++;
        }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${voiceSettings.length}`);
}

migrateVoiceSettings()
    .then(() => {
        console.log('\n✨ Migration completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Migration failed:', error);
        process.exit(1);
    });
