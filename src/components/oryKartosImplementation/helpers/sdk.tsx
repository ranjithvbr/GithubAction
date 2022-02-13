import { Configuration, V0alpha2Api } from "@ory/kratos-client";
import axiosFactory from "axios";
import { resilience } from "./axios";

const KRATOS_URL = "http://ec2-18-144-34-157.us-west-1.compute.amazonaws.com:4433";

const axios = axiosFactory.create();
resilience(axios);

// canonicalize removes the trailing slash from URLs.
const canonicalize = (url = ""): string => url.replace(/\/+$/, "");

export const kratosUrl = (project = "playground"): string => {
  const url = canonicalize(KRATOS_URL) || "";

  if (url.indexOf("https://playground.projects.oryapis.com/") == -1) {
    return url;
  }
  return url.replace("playground.", `${project}.`);
};

export const newKratosSdk = (project?: string): Promise<void> =>
  new V0alpha2Api(
    new Configuration({
      basePath: kratosUrl(project),
      baseOptions: {
        withCredentials: false,
        timeout: 10000
      }
    }),
    "",
    axios
  );