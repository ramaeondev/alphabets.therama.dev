import { selectStatic } from '@/lib/staticApi';

export interface VoiceSetting {
    id: string;
    voice_type: 'male' | 'female';
    pitch: number;
    rate: number;
    volume: number;
    voice_names: string[];
}

/**
 * Fetch voice settings from the therama.dev API (static.voice_settings)
 */
export const fetchVoiceSettings = async (): Promise<Record<string, VoiceSetting>> => {
    try {
        const rows = await selectStatic<{
            id: string;
            voice_type: 'male' | 'female';
            pitch: number;
            rate: number;
            voice_names: string[];
        }>('voice_settings', 'select=id,voice_type,pitch,rate,voice_names&order=priority.asc');

        const settingsMap: Record<string, VoiceSetting> = {};
        rows.forEach((row) => {
            settingsMap[row.voice_type] = {
                id: row.id,
                voice_type: row.voice_type,
                pitch: row.pitch,
                rate: row.rate,
                volume: 1.0,
                voice_names: Array.isArray(row.voice_names) ? row.voice_names : [],
            };
        });

        return settingsMap;
    } catch (error) {
        // Return fallback data if the API request fails
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
