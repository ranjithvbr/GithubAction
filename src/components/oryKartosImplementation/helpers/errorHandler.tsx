import { AxiosError } from "axios";
import { GenericError } from "@ory/kratos-client";

export function handleFormSubmitError<T>(
  setConfig: (p: T) => void,
  initialize: () => void,
  logout?: () => void
) {
  return (err: AxiosError) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          if (typeof err.response.data.error === "object") {
            const ge: GenericError = err.response.data;
            return Promise.resolve();
          }

          // console.log(JSON.stringify(err.response.data.ui.messages))

          //   console.debug("Form validation failed:", err.response.data);
          setConfig(err.response.data);
          return Promise.resolve();
        case 404:
        case 410:
        //   console.debug("Flow could not be found, reloading page.");
          initialize();
          return Promise.resolve();
        case 403:
        case 401:
          if (!logout) {
            // console.error(
            //   "Received unexpected 401/403 status code: ",
            //   err,
            //   err.response.data
            // );
            return Promise.resolve();
          }
          //   console.warn(
          //     "The server indicated that this action is not allowed for you. 
          //   The most likely cause of that is that you modified a privileged field 
          // (e.g. your password) but your ORY Kratos Login Session is too old."
          //   );
          logout();
          return Promise.resolve();
      }
    }

    // console.error(err, err.response?.data);
    return Promise.resolve();
  };
}
