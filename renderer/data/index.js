import keyIcon from "../public/images/key_icon.png";
import landmarkIcon from "../public/images/landmark_icon.png";
import temcardIcon from "../public/images/temcard_icon.png";

export const markers = Object.freeze({
  all: ["temtem", "saipark", "landmark"],
  temtem: ["temtem"],
  landmark: ["saipark", "landmark"],
});

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
