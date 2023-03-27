import keyIcon from "public/images/key_icon.png";
import landmarkIcon from "public/images/landmark_icon.png";
import temcardIcon from "public/images/temcard_icon.png";

// Map properties
export const ZOOM = 6;
export const TILE_SIZE = 256;
export const MAP_SIZE = TILE_SIZE * Math.pow(2, ZOOM);
export const MAP_CENTER = MAP_SIZE / 2;
export const MAP_MIN_HORIZONTAL = TILE_SIZE * 7;
export const MAP_MAX_HORIZONTAL = MAP_SIZE - TILE_SIZE * 7;
export const MAP_MIN_VERTICAL = TILE_SIZE * 11;
export const MAP_MAX_VERTICAL = MAP_SIZE - TILE_SIZE * 11;

// Marker properties
export const MARKER_OPACITY = 0.6;
export const MARKER_MIN_HORIZONTAL = MAP_MIN_HORIZONTAL + TILE_SIZE;
export const MARKER_MAX_HORIZONTAL = MAP_MAX_HORIZONTAL - TILE_SIZE;
export const MARKER_MIN_VERTICAL = MAP_MIN_VERTICAL + TILE_SIZE;
export const MARKER_MAX_VERTICAL = MAP_MAX_VERTICAL - TILE_SIZE;

// Sidebar button data
export const sidebar = Object.freeze([
  {
    image: keyIcon,
    tooltip: "tooltip.all_markers",
    types: ["spawn", "saipark"],
  },
  {
    image: temcardIcon,
    tooltip: "tooltip.temtem_markers",
    types: ["spawn"],
  },
  {
    image: landmarkIcon,
    tooltip: "tooltip.landmark_markers",
    types: ["saipark"],
  },
]);

// Returns the path of the marker image
export function markerIconPath(marker) {
  const name = marker.title
    .replace(/[()]/g, "")
    .replace(" ", "_")
    .toLowerCase();

  switch (marker.type) {
    case "spawn":
      try {
        // Check if image path exists
        require("../public/images/" + name + "_icon.png");

        return "../images/" + name + "_icon.png";
      } catch {
        return "../images/temcard_icon.png";
      }
    case "saipark":
      return "../images/landmark_icon.png";
  }
}
