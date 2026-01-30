import { appwriteConfig } from '@/lib/appwrite';

export interface AppSetting {
    id: string;
    key: string;
    value: any;
    description?: string;
}

/**
 * Fetch application settings from Appwrite database
 */
export const fetchAppSettings = async (): Promise<Record<string, any>> => {
    try {
        const url = `${appwriteConfig.endpoint}/databases/${appwriteConfig.databaseId}/collections/app_settings/documents`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': appwriteConfig.projectId,
                'X-Appwrite-Key': appwriteConfig.apiKey,
            },
        });

        if (!response.ok) {
            // Silent fail
            return getFallbackAppSettings();
        }

        const data = await response.json();

        const settingsMap: Record<string, any> = {};

        data.documents.forEach((doc: any) => {
            // Parse value if it is a string JSON
            let value = doc.value;
            if (typeof value === 'string') {
                try {
                    // Check if it looks like JSON boolean/number/object
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

            settingsMap[doc.key] = value;
        });

        return settingsMap;
    } catch (error) {
        // Return fallback data if Appwrite query fails
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
