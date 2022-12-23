import keyIcon from "../public/images/key_icon.png";
import landmarkIcon from "../public/images/landmark_icon.png";
import temcardIcon from "../public/images/temcard_icon.png";

// Map properties
export const zoom = 6;
export const tileSize = 256;
export const mapSize = tileSize * Math.pow(2, zoom);
export const mapCenter = mapSize / 2;
export const mapMinHorizontal = tileSize * 7;
export const mapMaxHorizontal = mapSize - tileSize * 7;
export const mapMinVertical = tileSize * 11;
export const mapMaxVertical = mapSize - tileSize * 11;
export const markerOpacity = 0.6;
export const markerMinHorizontal = mapMinHorizontal + tileSize;
export const markerMaxHorizontal = mapMaxHorizontal - tileSize;
export const markerMinVertical = mapMinVertical + tileSize;
export const markerMaxVertical = mapMaxVertical - tileSize;

// Sidebar button data
export const sidebar = Object.freeze([
  {
    image: keyIcon,
    label: "all_markers",
    href: "/markers/all",
  },
  {
    image: temcardIcon,
    label: "temtem_markers",
    href: "/markers/temtem",
  },
  {
    image: landmarkIcon,
    label: "landmark_markers",
    href: "/markers/landmark",
  },
]);

// Returns the path of the marker image
export function markerIconPath(marker) {
  switch (marker.type) {
    case "temtem":
      return "../markers/" + marker.title.toLowerCase() + "_marker.png";
    case "saipark":
    case "landmark":
      return "../markers/landmark_marker.png";
  }
}
