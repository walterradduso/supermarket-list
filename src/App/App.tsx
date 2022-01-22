import React, {useEffect, useState} from "react";

import {Item} from "../Items/types";
import itemsService from "../Items/service";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Modal, {ModalFooter} from "../components/Modal";
import TextField from "../components/TextField";
import List, {ListItem} from "../components/List";

import styles from "./App.module.scss";

enum Status {
  Error = "Error",
  Init = "Init",
  Success = "Success",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [getError, setGetError] = useState<string | null>(null);
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<number | null>(null);

  async function remove(id: Item["id"]) {
    setDeletingItem(id);

    setTimeout(async () => {
      const itemRemoved = await itemsService.remove(id);

      setItems((items) => items.filter((item) => item.id !== itemRemoved));
      setDeletingItem(null);
    }, 1000);
  }

  async function add(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) {
      return;
    }

    const existItem = items.some((item) => item.text === text);

    if (existItem) {
      return;
    }

    setLoadingItem(true);

    setTimeout(async () => {
      const newItem = await itemsService.add(text);

      setItems((items) => items.concat(newItem));
      toggleModal(false);
      setLoadingItem(false);
    }, 1000);
  }

  useEffect(() => {
    const itemsTimeout = setTimeout(() => {
      itemsService
        .list()
        .then((items) => {
          setItems(items);
          setStatus(Status.Success);
        })
        .catch((error) => {
          setStatus(Status.Error);
          setGetError(error);
        });
    }, 1000);

    return () => {
      clearTimeout(itemsTimeout);
    };
  }, []);

  if (status === Status.Init) {
    return <Spinner label="Loading supermarket list..." />;
  }

  if (status === Status.Error) {
    return (
      <div>
        <p>{getError}</p>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
      </header>

      <List items={items}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            deletingItem={deletingItem === item.id}
            onRemove={() => remove(item.id)}
          >
            {item.text}
          </ListItem>
        ))}
      </List>

      <Button
        fullWidth
        colorScheme="primary"
        focusButton={!isModalVisible}
        onClick={() => toggleModal(true)}
      >
        Add Item
      </Button>

      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h3>Add item</h3>

            <TextField autoComplete="off" name="text" />

            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>

              <Button
                colorScheme={loadingItem ? "secondary" : "primary"}
                disabled={loadingItem}
                type="submit"
              >
                {loadingItem ? <Spinner /> : "Add"}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
