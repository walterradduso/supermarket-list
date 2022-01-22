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
  Init = "Init",
  Success = "Success",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = useState<boolean>(false);

  async function remove(id: Item["id"]) {
    const itemRemoved = await itemsService.remove(id);

    setItems((items) => items.filter((item) => item.id !== itemRemoved));
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

    const newItem = await itemsService.add(text);

    setItems((items) => items.concat(newItem));
    toggleModal(false);
  }

  useEffect(() => {
    itemsService.list().then((items) => {
      setTimeout(() => {
        setItems(items);
        setStatus(Status.Success);
      }, 1000);
    });
  }, []);

  if (status === Status.Init) {
    return <Spinner label="Loading supermarket list..." />;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
      </header>

      <List>
        {items.map((item) => (
          <ListItem key={item.id} onRemove={() => remove(item.id)}>
            {item.text}
          </ListItem>
        ))}
      </List>

      <Button colorScheme="primary" focusButton={!isModalVisible} onClick={() => toggleModal(true)}>
        Add Item
      </Button>

      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h2>Add item</h2>
            <TextField name="text" />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>

              <Button colorScheme="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
