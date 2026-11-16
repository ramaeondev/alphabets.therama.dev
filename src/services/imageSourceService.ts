import { selectStatic } from '@/lib/staticApi';
import { ImageSource } from '@/components/ImageSourceSelector';

export interface ImageSourceOption {
    id: string;
    name: string;
    image_source: ImageSource;
    is_disabled: boolean;
}

/**
 * Fetch image sources from the therama.dev API (static.image_sources)
 */
export const fetchImageSources = async (): Promise<ImageSourceOption[]> => {
    try {
        const rows = await selectStatic<{ id: string; name: string; image_source: string; is_disabled: boolean }>(
            'image_sources',
            'select=id,name,image_source,is_disabled&order=created_at.asc',
        );

        return rows.map((row) => ({
            id: row.id,
            name: row.name,
            image_source: row.image_source as ImageSource,
            is_disabled: row.is_disabled || false,
        }));
    } catch (error) {
        // Return fallback data if the API request fails
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
