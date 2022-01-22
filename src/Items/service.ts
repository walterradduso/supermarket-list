import {Item} from "./types";

const MOCK: Item[] = [
  {
    id: 1,
    text: "item 1",
  },
  {
    id: 2,
    text: "item 2",
  },
  {
    id: 3,
    text: "item 3",
  },
];

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  add: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
