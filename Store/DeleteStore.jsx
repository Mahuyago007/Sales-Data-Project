import React from "react";
import { Button,  Modal, Form } from "semantic-ui-react";
import axios from "axios";

const DeleteStore=(props)=>{
    const { open, storeId, toggleDeleteModal, refreshData } =
    props;

    const deleteRecord = () => {
        axios
          .delete(`/Stores/DeleteStore/${storeId}`)
          .then((res) => {
            console.log(res);
            toggleDeleteModal(false);
            refreshData();
          })
          .catch((err) => {
            console.log(err);
          });
      };

     return(
        <Modal open={open}>
        <Modal.Header>Are you sure to delete?</Modal.Header>
        <Modal.Actions>
        <Button color="yellow" onClick={() => toggleDeleteModal(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={deleteRecord}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>


     );


     };

export default DeleteStore;