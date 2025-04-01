
# TypeJoy Kids - Interactive Typing Application

A fun and educational typing application for children to learn letters and numbers through interactive typing, animations, and visual/audio feedback.

## Features

- Interactive keyboard and typing experience
- Animated letters with sound effects
- Voice pronunciation (male/female options)
- Associated words and images for each letter
- Dark/Light mode toggle
- Responsive design for all devices

## Image Path Structure

The application expects images to be placed in the `/public/images/` directory with the following naming convention:

```
/images/[letter]-[number].jpg
```

Where:
- `[letter]` is the lowercase letter (a-z) or number (0-9)
- `[number]` is a value from 1 to 10 representing the variation

For example:
- `/images/a-1.jpg` (First image for letter 'A')
- `/images/a-2.jpg` (Second image for letter 'A')
- `/images/b-1.jpg` (First image for letter 'B')
- `/images/1-1.jpg` (Image for number '1')

Each letter should have 10 different images (numbered 1-10) corresponding to the 10 different words for that letter.
Each number only needs one image, but the naming convention still requires the -1 suffix.

## Installing Images

1. Create a folder called `images` inside the `public` directory
2. Name your images according to the convention described above
3. Use JPG format for best compatibility (PNG is also supported)
4. Recommended image size: 300x300 pixels

If an image is missing, a placeholder will be shown.

## Development

This project is built with React, TypeScript, and Tailwind CSS.

```
npm install   # Install dependencies
npm run dev   # Start development server
```
