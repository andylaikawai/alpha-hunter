import {binanceApi} from "./api-helper.js";

export const main = () => {

};

const fetchListing = (timeout = 0.5) => {
  const timeoutInMillisecond = timeout * 1000;
  binanceApi.getListingAnnouncement()
    .then((response) => {

    });

  setTimeout(fetchListing, timeoutInMillisecond)
};