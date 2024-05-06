export const KEY_WETHER = `ff700cb509764bb482e74953240605`;
export const ENDPOINT = {
   BASE: `http://api.weatherapi.com/v1`,
   CURRENT: () => `${ENDPOINT.BASE}/current.json?key=${KEY_WETHER}`,
   SEARCH: () => `${ENDPOINT.BASE}/search.json?key=${KEY_WETHER}`,
};
