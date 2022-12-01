import keyImage from "../public/images/key.png";
import landmarkImage from "../public/images/landmark.png";
import temcardImage from "../public/images/temcard.png";

export const sidebar = [
  {
    image: keyImage,
    label: "All markers",
    active: true,
  },
  {
    image: temcardImage,
    label: "Temtem markers",
    active: false,
  },
  {
    image: landmarkImage,
    label: "Landmark markers",
    active: false,
  },
];
