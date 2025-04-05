// supabase/functions/random-word-image/index.ts
// <reference lib="deno.unstable" />
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const PEXELS_API_KEY = Deno.env.get("PEXELS_API_KEY")!;
const PIXABAY_API_KEY = Deno.env.get("PIXABAY_API_KEY")!;
const FLICKR_API_KEY = Deno.env.get("FLICKR_API_KEY")!;


serve(async (req) => {
  try {
    const { letter, width = 300, height = 300, source = 'pexels' } = await req.json();

    console.log("Incoming request:", { letter, width, height, source });

    if (!letter || typeof letter !== "string" || letter.length !== 1) {
      console.warn("Invalid letter received:", letter);
      return new Response(JSON.stringify({ error: "Invalid letter" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const wordApiUrl = `https://api.datamuse.com/words?sp=${letter.toLowerCase()}*&max=20`;
    const wordRes = await fetch(wordApiUrl);
    const wordList = await wordRes.json();

    console.log(`Fetched ${wordList.length} words from Datamuse API.`);

    if (!Array.isArray(wordList) || wordList.length === 0) {
      console.warn("No word found for letter:", letter);
      return new Response(JSON.stringify({ error: "No word found for letter" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const word = wordList[Math.floor(Math.random() * wordList.length)].word;
    console.log("Selected word:", word);

    let image_url = "";

    switch (source) {
      case "pexels": {
        console.log("Fetching image from Pexels...");
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${word}&per_page=1`,
          {
            headers: { Authorization: PEXELS_API_KEY },
          },
        );
        const json = await res.json();
        image_url = json.photos?.[0]?.src?.medium || "";
        break;
      }
      case "pixabay": {
        console.log("Fetching image from Pixabay...");
        const res = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(word)}&image_type=photo&per_page=3`
        );
        const json = await res.json();
        image_url = json.hits?.[0]?.webformatURL || "";
        break;
      }
      case "openverse": {
        console.log("Fetching image from Openverse...");
        const res = await fetch(
          `https://api.openverse.engineering/v1/images?q=${encodeURIComponent(word)}&page_size=1`
        );
        const json = await res.json();
        image_url = json.results?.[0]?.url || "";
        break;
      }
      case "flickr": {
        console.log("Fetching image from Flickr...");
        const res = await fetch(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${encodeURIComponent(word)}&format=json&nojsoncallback=1&per_page=1`
        );
        const json = await res.json();
        const photo = json.photos?.photo?.[0];
        if (photo) {
          image_url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
        }
        break;
      }
      case "lorem_picsum": {
        console.log("Generating image from Lorem Picsum...");
        image_url = `https://picsum.photos/seed/${word}/${width}/${height}`;
        break;
      }
      default:
        console.warn("Invalid image source:", source);
        return new Response(JSON.stringify({ error: "Invalid image source" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
    }

    if (!image_url) {
      console.warn("Image not found for word:", word);
      return new Response(JSON.stringify({ error: "Image not found for word" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    console.log("Returning result:", { word, image_url });
    return new Response(JSON.stringify({ word, image_url }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (err) {
    console.error("ERROR:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
