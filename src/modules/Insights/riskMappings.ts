export const recommendedRiskMappings = [
  {
    level: "Strict",
    settings: {
      webAndAppActivity: "off",
      locationHistory: "off",
      youtubeHistory: "off"
    }
  },
  {
    level: "Comfortable",
    settings: {
      webAndAppActivity: "on",
      locationHistory: "off",
      youtubeHistory: "off"
    }
  },
  {
    level: "Relaxed",
    settings: {
      webAndAppActivity: "on",
      locationHistory: "on",
      youtubeHistory: "on"
    }
  }
];

