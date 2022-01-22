import {addLocalItem, getLocalItems, removeLocalItems} from "./api";
import {Item} from "./types";

export default {
  add: async (text: Item["text"]): Promise<Item> => {
    try {
      const newItem: Item = {id: +new Date(), text};

      await addLocalItem(newItem);

      return Promise.resolve(newItem);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  list: async (): Promise<Item[]> => {
    try {
      const myItems: Item[] = await getLocalItems();

      return Promise.resolve(myItems);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  remove: async (id: Item["id"]): Promise<Item["id"]> => {
    try {
      await removeLocalItems(id);

      return Promise.resolve(id);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
