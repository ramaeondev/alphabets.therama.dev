import { databases, appwriteConfig } from '@/lib/appwrite';
import { ImageSource } from '@/components/ImageSourceSelector';

export interface ImageSourceOption {
    id: string;
    name: string;
    image_source: ImageSource;
    is_disabled: boolean;
}

/**
 * Fetch image sources from Appwrite database using direct API call
 */
export const fetchImageSources = async (): Promise<ImageSourceOption[]> => {
    try {
        const url = `${appwriteConfig.endpoint}/databases/${appwriteConfig.databaseId}/collections/image_sources/documents`;

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

        // Map Appwrite documents to ImageSourceOption format
        const imageSources: ImageSourceOption[] = data.documents.map((doc: any) => ({
            id: doc.$id,
            name: doc.name,
            image_source: doc.image_source as ImageSource,
            is_disabled: doc.is_disabled || false,
        }));

        return imageSources;
    } catch (error) {


        // Return fallback data if Appwrite query fails
        return [
            { id: '1', name: 'Local', image_source: 'local', is_disabled: false },
            { id: '2', name: 'Unsplash', image_source: 'unsplash', is_disabled: true },
            { id: '3', name: 'Flickr', image_source: 'flickr', is_disabled: true },
            { id: '4', name: 'Openverse', image_source: 'openverse', is_disabled: false },
            { id: '5', name: 'Lorem Picsum', image_source: 'lorem_picsum', is_disabled: false },
            { id: '6', name: 'Pixabay', image_source: 'pixabay', is_disabled: false },
            { id: '7', name: 'Pexels', image_source: 'pexels', is_disabled: false }
        ];
    }
};
