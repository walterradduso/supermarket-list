import {Item} from "./types";

export async function addLocalItem(newItem: Item): Promise<void> {
  try {
    const myItems: Item[] = await getLocalItems();

    myItems.push(newItem);

    await localStorage.setItem("myItems", JSON.stringify(myItems));
  } catch (e) {
    return Promise.reject("There was a problem adding your item. Please try again later.");
  }
}

export async function getLocalItems(): Promise<Item[]> {
  try {
    const localItems: string | null = await localStorage.getItem("myItems");

    if (localItems) {
      return JSON.parse(localItems);
    }

    return [];
  } catch (e) {
    return Promise.reject("There was a problem getting your items. Please refresh your page.");
  }
}

export async function removeLocalItems(removedId: Item["id"]): Promise<void> {
  try {
    const myItems: Item[] = await getLocalItems();

    const newItems: Item[] = myItems.filter((item) => item.id !== removedId);

    await setLocalItems(newItems);
  } catch (e) {
    return Promise.reject("There was a problem removing your item. Please try again later.");
  }
}

export async function setLocalItems(items: Item[]): Promise<void> {
  await localStorage.setItem("myItems", JSON.stringify(items));
}

export default {
  getLocalItems,
  addLocalItem,
  removeLocalItems,
  setLocalItems,
};
