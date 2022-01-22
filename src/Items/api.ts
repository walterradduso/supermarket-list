import {Item} from "./types";

export async function addLocalItem(newItem: Item) {
  const myItems: Item[] = await getLocalItems();

  myItems.push(newItem);

  await localStorage.setItem("myItems", JSON.stringify(myItems));
}

export async function getLocalItems(): Promise<Item[]> {
  const localItems: string | null = await localStorage.getItem("myItems");

  if (localItems) {
    return JSON.parse(localItems);
  }

  return [];
}

export async function removeLocalItems(removedId: Item["id"]) {
  const myItems: Item[] = await getLocalItems();

  const newItems: Item[] = myItems.filter((item) => item.id !== removedId);

  await setLocalItems(newItems);
}

export async function setLocalItems(items: Item[]) {
  await localStorage.setItem("myItems", JSON.stringify(items));
}

export default {
  getLocalItems,
  addLocalItem,
  removeLocalItems,
  setLocalItems,
};
