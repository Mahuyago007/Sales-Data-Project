import React from "react";
import { Button,  Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditProduct = (props) => {
  const { open, product, toggleEditModal, updateProductState, refreshData } =
    props;

  const updateProduct = (p) => {
 
    axios
      .put(`/Products/PutProduct/${p.id}`, {
        id: p.id,
        name: p.name,
        price: p.price,
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
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  updateProductState({
                    ...product,
                    name: e.target.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  updateProductState({
                    ...product,
                    price: e.target.value,
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
        <Button color="green" onClick={() => updateProduct(product)}>
          Edit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProduct;
