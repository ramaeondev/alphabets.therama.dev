import { appwriteConfig } from '@/lib/appwrite';

export interface LetterWord {
    id: string;
    letter: string;
    words: string[];
    language: string;
    is_active: boolean;
}

/**
 * Fetch letter-word mappings from Appwrite database
 */
export const fetchLetterWords = async (): Promise<Record<string, string[]>> => {
    try {
        // Use explicit JSON query format (requested by user/Appwrite requirement)
        const queryParams = new URLSearchParams();
        queryParams.append('queries[]', 'limit(100)');
        // Note: The user provided a JSON format example, but usually 'limit(100)' string format works if encoded correctly.
        // However, if the user specifically asked for the JSON format, the SDK usually handles that.
        // But for RAW REST, let's try strict `queries[]=limit(100)` again but properly appended.

        // Actually, the user provided URL indicates: queries[0]={"method":"limit","values":[100]}
        // This is internal Appwrite format. Let's try standard REST first:
        // Or simply stick to what works for client SDKs usually: `queries[]=limit(100)`

        // Let's matching the user's successful request pattern exactly:
        // ?queries[0]={"method":"limit","values":[100]}&queries[1]={"method":"offset","values":[0]}

        const url = `${appwriteConfig.endpoint}/databases/${appwriteConfig.databaseId}/collections/letter_words/documents?queries[0]=%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B100%5D%7D`;

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
        const letterWordsMap: Record<string, string[]> = {};

        data.documents.forEach((doc: any) => {
            if (doc.is_active) {
                let words: string[] = [];

                if (Array.isArray(doc.words)) {
                    words = doc.words;
                } else if (typeof doc.words === 'string') {
                    try {
                        // Try to parse if it's a JSON string
                        if (doc.words.trim().startsWith('[') && doc.words.trim().endsWith(']')) {
                            words = JSON.parse(doc.words);
                        } else {
                            // It's just a single string word
                            words = [doc.words];
                        }
                    } catch (e) {
                        // Failed to parse, using as single string
                        words = [doc.words];
                    }
                } else {
                    // Fallback
                    words = [String(doc.words)];
                }

                letterWordsMap[doc.letter] = words;
            }
        });

        return letterWordsMap;
    } catch (error) {
        // Return fallback data if Appwrite query fails
        return getFallbackLetterWords();
    }
};

/**
 * Fallback letter-word mappings (same as original hardcoded data)
 */
function getFallbackLetterWords(): Record<string, string[]> {
    return {
        'A': ['Apple', 'Ant', 'Astronaut', 'Airplane', 'Arrow', 'Avocado', 'Alligator', 'Anchor', 'Acorn', 'Axe'],
        'B': ['Ball', 'Banana', 'Bear', 'Boat', 'Balloon', 'Butterfly', 'Bird', 'Book', 'Beach', 'Bee'],
        'C': ['Cat', 'Car', 'Cake', 'Cow', 'Castle', 'Carrot', 'Cloud', 'Candy', 'Camera', 'Candle'],
        'D': ['Dog', 'Duck', 'Dinosaur', 'Door', 'Dolphin', 'Donut', 'Dragon', 'Drum', 'Diamond', 'Daisy'],
        'E': ['Elephant', 'Egg', 'Eagle', 'Eye', 'Earth', 'Elbow', 'Eel', 'Envelope', 'Eskimo', 'Engine'],
        'F': ['Fish', 'Frog', 'Flower', 'Fox', 'Fire', 'Flag', 'Fries', 'Fan', 'Fairy', 'Feather'],
        'G': ['Giraffe', 'Grass', 'Grapes', 'Gift', 'Guitar', 'Ghost', 'Goat', 'Goose', 'Garden', 'Glove'],
        'H': ['House', 'Hat', 'Horse', 'Heart', 'Hamburger', 'Helicopter', 'Hippo', 'Hand', 'Honey', 'Hammer'],
        'I': ['Ice cream', 'Igloo', 'Island', 'Insect', 'Ink', 'Iron', 'Ivy', 'Icicle', 'Iguana', 'Instrument'],
        'J': ['Jelly', 'Jacket', 'Jet', 'Juice', 'Jam', 'Jellyfish', 'Jeep', 'Jungle', 'Jar', 'Jewelry'],
        'K': ['Kite', 'King', 'Koala', 'Key', 'Kangaroo', 'Kitchen', 'Kettle', 'Keyboard', 'Knife', 'Kiwi'],
        'L': ['Lion', 'Lamp', 'Leaf', 'Lemon', 'Ladder', 'Lighthouse', 'Lizard', 'Lock', 'Lollipop', 'Leg'],
        'M': ['Monkey', 'Moon', 'Mouse', 'Mango', 'Monster', 'Mountain', 'Map', 'Milk', 'Music', 'Muffin'],
        'N': ['Nest', 'Nose', 'Nut', 'Noodles', 'Nurse', 'Nail', 'Notebook', 'Night', 'Needle', 'Necklace'],
        'O': ['Orange', 'Octopus', 'Owl', 'Ocean', 'Onion', 'Otter', 'Oven', 'Ostrich', 'Olive', 'Office'],
        'P': ['Penguin', 'Pig', 'Pizza', 'Panda', 'Pencil', 'Popcorn', 'Puzzle', 'Pear', 'Pillow', 'Parachute'],
        'Q': ['Queen', 'Quilt', 'Question', 'Quail', 'Quarter', 'Quiver', 'Quicksand', 'Quiche', 'Quiet', 'Queue'],
        'R': ['Rabbit', 'Rainbow', 'Robot', 'Rocket', 'River', 'Rain', 'Rose', 'Ring', 'Road', 'Raccoon'],
        'S': ['Snake', 'Sun', 'Star', 'Strawberry', 'Sandwich', 'Spider', 'Ship', 'Snow', 'Shark', 'Sock'],
        'T': ['Tiger', 'Tree', 'Train', 'Turtle', 'Tomato', 'Tooth', 'Tractor', 'Telescope', 'Table', 'Toy'],
        'U': ['Umbrella', 'Unicorn', 'UFO', 'Underwear', 'Uniform', 'Ukulele', 'Umpire', 'Universe', 'Urchin', 'Up'],
        'V': ['Violin', 'Volcano', 'Vase', 'Vegetable', 'Van', 'Vest', 'Valentine', 'Vacuum', 'Vine', 'Village'],
        'W': ['Whale', 'Watch', 'Wagon', 'Watermelon', 'Window', 'Wolf', 'Web', 'Waffle', 'Wind', 'Water'],
        'X': ['X-ray', 'Xylophone', 'Box', 'Fox', 'Axe', 'Exit', 'Taxi', 'Mixer', 'Six', 'Ox'],
        'Y': ['Yo-yo', 'Yacht', 'Yak', 'Yogurt', 'Yarn', 'Yellow', 'Yawn', 'Yard', 'Yell', 'Year'],
        'Z': ['Zebra', 'Zoo', 'Zipper', 'Zero', 'Zigzag', 'Zinc', 'Zucchini', 'Zoom', 'Zone', 'Zombie'],
        '0': ['Zero'],
        '1': ['One'],
        '2': ['Two'],
        '3': ['Three'],
        '4': ['Four'],
        '5': ['Five'],
        '6': ['Six'],
        '7': ['Seven'],
        '8': ['Eight'],
        '9': ['Nine'],
    };
}
