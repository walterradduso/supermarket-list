import {addLocalItem, getLocalItems, removeLocalItems} from "./api";
import {Item} from "./types";

export default {
  add: async (text: Item["text"]): Promise<Item> => {
    const newItem: Item = {id: +new Date(), text};

    await addLocalItem(newItem);

    return Promise.resolve(newItem);
  },
  list: async (): Promise<Item[]> => {
    try {
      const myItems: Item[] = await getLocalItems();

      return Promise.resolve(myItems);
    } catch (e) {
      return Promise.reject("There was a problem getting your items. Please refresh your page.");
    }
  },
  remove: async (id: Item["id"]): Promise<Item["id"]> => {
    await removeLocalItems(id);

    return Promise.resolve(id);
  },
};
