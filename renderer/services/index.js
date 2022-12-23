import { mapCenter } from "../utils";

export function login(email, password) {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(), 500));
}

export function logout() {
  return new Promise((resolve, _reject) => setTimeout(() => resolve(), 100));
}

// Types of markers for the endpoint call
const types = Object.freeze({
  all: ["temtem", "saipark", "landmark"],
  temtem: ["temtem"],
  landmark: ["saipark", "landmark"],
});

function typeSplitter(list) {
  return list.reduce((res, curr) => {
    if (res[curr.type]) {
      res[curr.type].push(curr);
    } else {
      Object.assign(res, { [curr.type]: [curr] });
    }

    return res;
  }, {});
}

export function getMarkers(type) {
  const markers = typeSplitter([
    {
      id: 0,
      type: "temtem",
      title: "Mimit",
      subtitle: {
        original: "Iwaba, East Path",
        current: "Iwaba, East Path",
      },
      condition: null,
      coordinates: null,
    },
    {
      id: 1,
      type: "temtem",
      title: "Mimit",
      subtitle: {
        original: "Iwaba, East Path",
        current: "Iwaba, East Path",
      },
      condition: "Requires Fishing Rod",
      coordinates: {
        x: mapCenter,
        y: mapCenter - 500,
      },
    },
    {
      id: 2,
      type: "saipark",
      title: "Saipark",
      subtitle: "West from Praise Coast",
      coordinates: {
        x: mapCenter + 500,
        y: mapCenter,
      },
    },
    {
      id: 3,
      type: "landmark",
      title: "Zadar",
      subtitle: "South of Praise Coast",
      coordinates: {
        x: mapCenter - 500,
        y: mapCenter,
      },
    },
    {
      id: 4,
      type: "landmark",
      title: "Zadar",
      subtitle: null,
      coordinates: null,
    },
  ]);

  return types[type].map((type) => markers[type]).flat();
}
