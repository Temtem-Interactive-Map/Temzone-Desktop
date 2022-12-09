import keyIcon from "../public/images/key_icon.png";
import landmarkIcon from "../public/images/landmark_icon.png";
import temcardIcon from "../public/images/temcard_icon.png";

// Map properties
export const zoom = 6;
export const tileSize = 256;
export const mapSize = tileSize * Math.pow(2, zoom);
export const mapMinHorizontal = tileSize * 7;
export const mapMaxHorizontal = mapSize - tileSize * 7;
export const mapMinVertical = tileSize * 11;
export const mapMaxVertical = mapSize - tileSize * 11;
export const mapCenter = mapSize / 2;

// Types of markers for the endpoint call
export const types = Object.freeze({
  all: ["temtem", "saipark", "landmark"],
  temtem: ["temtem"],
  landmark: ["saipark", "landmark"],
});

// Sidebar buttons
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

// Marker icon path
export function markerIcon(marker) {
  switch (marker.type) {
    case "temtem":
      return "../markers/" + marker.title.toLowerCase() + "_marker.png";
    case "saipark":
    case "landmark":
      return "../markers/landmark_marker.png";
  }
}