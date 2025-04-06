import os
import requests
from PIL import Image
from io import BytesIO

API_KEY = "Xsba5D3Y2yi9rA3BJrvFNXEhrnWBTqx8ZGi8mDSOcfGgWtW2gVTCwoG0"
HEADERS = {"Authorization": API_KEY}
TARGET_SIZE = (300, 300)
SAVE_DIR = "/Users/ramu/Documents/GitHub/happy-letters/public/images/pexels_images"

words = {
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
}


def resize_and_crop(img, size):
    img_ratio = img.width / img.height
    target_ratio = size[0] / size[1]

    if img_ratio > target_ratio:
        new_height = size[1]
        new_width = int(new_height * img_ratio)
    else:
        new_width = size[0]
        new_height = int(new_width / img_ratio)

    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    left = (new_width - size[0]) // 2
    top = (new_height - size[1]) // 2
    right = left + size[0]
    bottom = top + size[1]

    return img.crop((left, top, right, bottom))

def download_image(query):
    params = {"query": query, "per_page": 1}
    response = requests.get("https://api.pexels.com/v1/search", headers=HEADERS, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["photos"]:
            image_url = data["photos"][0]["src"]["large2x"]
            return image_url
    return None

if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

for letter, word_list in words.items():
    for word in word_list:
        file_path = os.path.join(SAVE_DIR, f"{word}.jpg")
        if os.path.exists(file_path):
            print(f"Skipping {word}, already exists.")
            continue

        print(f"Downloading {word}...")
        try:
            image_url = download_image(word)
            if image_url:
                img_data = requests.get(image_url).content
                img = Image.open(BytesIO(img_data)).convert("RGB")
                img = resize_and_crop(img, TARGET_SIZE)
                img.save(file_path, "JPEG")
                print(f"Saved: {file_path}")
            else:
                print(f"No image found for {word}")
        except Exception as e:
            print(f"Failed to download {word}: {e}")
