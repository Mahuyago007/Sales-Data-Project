import React from "react";
import { Button,  Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditStore = (props) => {
  const { open, store, toggleEditModal, updateStoreState, refreshData } =
    props;

  const updateStore = (s) => {
 
    axios
      .put(`/Stores/PutStore/${s.id}`, {
        id: s.id,
        name: s.name,
        address: s.address,
      })

      .then((res) => {
        refreshData();
        toggleEditModal(false);
        // toggleModal();

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <Modal open={open}>
      <Modal.Header>Edit Store</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                value={store.name}
                onChange={(e) =>
                  updateStoreState({
                    ...store,
                    name: e.target.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Address"
                value={store.address}
                onChange={(e) =>
                  updateStoreState({
                    ...store,
                    address: e.target.value,
                  })
                }
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="yellow" onClick={() => toggleEditModal(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={() => updateStore(store)}>
          Edit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditStore;
