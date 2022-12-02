import keyImage from "../public/images/key.png";
import landmarkImage from "../public/images/landmark.png";
import temcardImage from "../public/images/temcard.png";

export const markers = Object.freeze({
  all: ["temtem", "saipark", "landmark"],
  temtem: ["temtem"],
  landmark: ["saipark", "landmark"],
});

export const sidebar = Object.freeze([
  {
    image: keyImage,
    label: "All markers",
    href: "/markers/all",
  },
  {
    image: temcardImage,
    label: "Temtem markers",
    href: "/markers/temtem",
  },
  {
    image: landmarkImage,
    label: "Landmark markers",
    href: "/markers/landmark",
  },
]);
