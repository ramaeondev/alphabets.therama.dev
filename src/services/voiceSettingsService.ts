import { appwriteConfig } from '@/lib/appwrite';

export interface VoiceSetting {
    id: string;
    voice_type: 'male' | 'female';
    pitch: number;
    rate: number;
    volume: number;
    voice_names: string[];
}

/**
 * Fetch voice settings from Appwrite database
 */
export const fetchVoiceSettings = async (): Promise<Record<string, VoiceSetting>> => {
    try {
        const url = `${appwriteConfig.endpoint}/databases/${appwriteConfig.databaseId}/collections/voice_settings/documents`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': appwriteConfig.projectId,
                'X-Appwrite-Key': appwriteConfig.apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`Appwrite API responded with status: ${response.status}`);
        }

        const data = await response.json();

        const settingsMap: Record<string, VoiceSetting> = {};

        data.documents.forEach((doc: any) => {
            // Parse voice names if they are strings/JSON
            let voiceNames: string[] = [];
            if (Array.isArray(doc.voice_names)) {
                voiceNames = doc.voice_names;
            } else if (typeof doc.voice_names === 'string') {
                try {
                    if (doc.voice_names.trim().startsWith('[')) {
                        voiceNames = JSON.parse(doc.voice_names);
                    } else {
                        voiceNames = [doc.voice_names];
                    }
                } catch (e) {
                    voiceNames = [doc.voice_names];
                }
            }

            settingsMap[doc.voice_type] = {
                id: doc.$id,
                voice_type: doc.voice_type,
                pitch: doc.pitch,
                rate: doc.rate,
                volume: doc.volume,
                voice_names: voiceNames
            };
        });

        return settingsMap;
    } catch (error) {
        // Return fallback data if Appwrite query fails
        return getFallbackVoiceSettings();
    }
};

/**
 * Fallback voice settings (same as original hardcoded values)
 */
function getFallbackVoiceSettings(): Record<string, VoiceSetting> {
    return {
        'male': {
            id: 'fallback_male',
            voice_type: 'male',
            pitch: 0.9,
            rate: 0.9,
            volume: 1.0,
            voice_names: ['eddy', 'male', 'david', 'james', 'paul', 'thomas', 'daniel', 'guy', 'man']
        },
        'female': {
            id: 'fallback_female',
            voice_type: 'female',
            pitch: 1.2,
            rate: 0.9,
            volume: 1.0,
            voice_names: ['female', 'lisa', 'sarah', 'victoria', 'karen', 'woman', 'girl']
        }
    };
}
