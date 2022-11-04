//llaves para Local storage
export const UserKey = "CoinTrackerUser";
export const TokenKey = "CoinTrackerToken";

export const persistLocalStore = <T,>(key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ ...data }));
};

export const clearLocalStore = (key: string) => {
  localStorage.removeItem(key);
};
