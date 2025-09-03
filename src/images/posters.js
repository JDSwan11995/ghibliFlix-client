// src/images/posters.js

// All movie posters centralized here
// Use the movie's _id or a sanitized title as the key
// Value should be a path to the image (require/import) or a URL

export const posters = {
  default: require("./default_image.jpg"), // fallback poster

  arrietty: require("./arrietty.jpg"),
  howls_moving_castle: require("./howls_moving_castle.jpg"),
  the_cats_return: require("./the_cat_returns.jpg"),
  tales_from_earthsea: require("./tales_from_earthsea.jpg"),
  grave_of_the_fireflies: require("./grave_of_the_fireflies.jpg"),
  ocean_waves: require("./ocean_waves.jpg"),
  only_yesterday: require("./only_yesterday.jpg"),
  the_red_turtle: require("./the_red_turtle.jpg"),
  spirited_away: require("./spirited_away.jpg"),
  my_neighbor_totoro: require("./my_neighbor_totoro.jpg"),
  whisper_of_the_heart: require("./whisper_of_the_heart.jpg"),
};
