import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    paths: {
      base:
        process.env.NODE_ENV === "production"
          ? "/show-booking-assistant-wxcc"
          : "",
    },
  },
};

export default config;
