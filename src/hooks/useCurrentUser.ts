import { useQuery, useQueryClient } from "react-query";
import { getCurrentUser } from "../services/users";
import { QUERY_KEYS } from "../constants/services";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import promptErrorFixVideo from "../assets/prompt-error-fix.mp4";

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const [isMixedContentError, setIsMixedContentError] = useState(false);

  const result = useQuery(QUERY_KEYS.currentUser, getCurrentUser, {
    staleTime: 1000 * 60 * 20, // 20 minutes
    // // If the user is not logged in, we don't want to keep trying to fetch the
    // // current user. Instead, we want to wait for the user to log in and then
    // // try to fetch the current user again.
    retry: false,

    onError: (err: AxiosError) => {
      // If the error is a 401 error, we want to set the current user to null.
      // So RQ will cache that the current user is null and we won't keep trying

      console.log(err.code);
      console.log(err.message);
      if (err.code === "ERR_NETWORK" && err.message === "Network Error") {
        setIsMixedContentError(true);
      }

      queryClient.setQueryData(QUERY_KEYS.currentUser, null);
    },
  });

  useEffect(() => {
    if (isMixedContentError) {
      console.log("isMixedContentError", isMixedContentError);

      // TODO: remove all this modal code here as it's not a good practice

      const modal = document.querySelector(".modal");
      if (modal) document.body.removeChild(document.querySelector(".modal")!);

      document.body.innerHTML = `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__content">
          <div class="modal__header">
            <h2 class="modal__title">Network Error ⚠️</h2>
          </div>
          <div class="modal__body">
            <p class="modal__text">Please confirm that you network connection is not disconnected. ᯤ 📶 🌐</p>
            <p class="modal__text"><mark>If you network connection is fine, please follow the instructions in the video below to fix the issue.</mark></p>

            <video controls autoplay loop muted class="modal__video">
              <source src=${promptErrorFixVideo} type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      ${document.body.innerHTML}
      `;

      return;
    }
  }, [isMixedContentError]);

  return result;
};

export default useCurrentUser;
