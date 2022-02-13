import { Navigation } from "./constant/navigation";

const config = {
  screens: {
    [Navigation.LoginOryKartos]: {
      path: `${Navigation.LoginOryKartos}/:id`,
      parse: {
        id: (id) => `${id}` 
      }
    }
  }
};

const linking = {
  prefixes: [ "demo://app" ],
  config
};

export default linking;
