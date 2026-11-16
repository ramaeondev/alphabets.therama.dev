import { selectStatic } from '@/lib/staticApi';

export interface AppSetting {
    id: string;
    key: string;
    value: any;
    description?: string;
}

/**
 * Fetch application settings from the therama.dev API (static.app_settings)
 */
export const fetchAppSettings = async (): Promise<Record<string, any>> => {
    try {
        const rows = await selectStatic<{ key: string; value: string }>('app_settings', 'select=key,value');

        const settingsMap: Record<string, any> = {};

        rows.forEach((row) => {
            // Values are stored as text; convert booleans, numbers and JSON
            let value: any = row.value;
            if (typeof value === 'string') {
                try {
                    if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    else if (!isNaN(Number(value))) value = Number(value);
                    else if (value.startsWith('{') || value.startsWith('[')) {
                        value = JSON.parse(value);
                    }
                } catch (e) {
                    // Keep as string
                }
            }

            settingsMap[row.key] = value;
        });

        return settingsMap;
    } catch (error) {
        // Return fallback data if the API request fails
        return getFallbackAppSettings();
    }
};

/**
 * Fallback application settings
 */
function getFallbackAppSettings(): Record<string, any> {
    return {
        'default_voice_type': 'female',
        'default_image_source': 'local',
        'show_boom_effect': true,
        'enable_speech': true,
        'dark_mode_default': false
    };
}
