import React from "react";
import { Button,  Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditCustomer = (props) => {
  const { open, customer, toggleEditModal, updateCustomerState, refreshData } =
    props;

  const updateCustomer = (c) => {
 
    axios
      .put(`/Customers/PutCustomer/${c.id}`, {
        id: c.id,
        name: c.name,
        address: c.address,
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
      <Modal.Header>Edit Customer</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                value={customer.name}
                onChange={(e) =>
                  updateCustomerState({
                    ...customer,
                    name: e.target.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Address"
                value={customer.address}
                onChange={(e) =>
                  updateCustomerState({
                    ...customer,
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
        <Button color="green" onClick={() => updateCustomer(customer)}>
          Edit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomer;
