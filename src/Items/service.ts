import {Item} from "./types";

export default {
  list: (): Promise<Item[]> => Promise.resolve([]),
  add: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
