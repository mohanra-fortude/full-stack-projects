const domain = "@careator";
const storeData = (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.setItem(`${domain}:${key}`, JSON.stringify(value));
      resolve("stored");
    } catch (error) {
      reject(error);
    }
  });
};

const getData = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      const value = sessionStorage.getItem(`${domain}:${key}`);
      if (!value) throw "no data";
      resolve(JSON.parse(value));
    } catch (error) {
      reject(error);
    }
  });
};

const clearAll = () => sessionStorage.clear();

const StorageServices = { storeData, getData, clearAll };
export default StorageServices;
