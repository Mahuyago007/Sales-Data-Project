import React, { Fragment, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const ProductTable = (props) => {
  const { products, refreshData } = props;

  const [productEdit, setProductEdit] = useState({
    id: 0,
    name: "",
    price: "",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [productDeleteId, setProductDeleteId]=useState(false);
    

  const updateProductState = (product) => {
  
    setProductEdit(product);
  }

    const handleEdit = (p) => {
    setProductEdit(p);
    setOpenEditModal(true);
  };

  const toggleEditModal = (value) => {
    setOpenEditModal(value);
  };
  
  const handleDelete=(id)=>{
    
    setProductDeleteId(id);
    setOpenDeleteModal(true)
    
  };
  const toggleDeleteModal=()=>{setOpenDeleteModal(false)};

  return (
    <Fragment>
      <EditProduct
        open={openEditModal}
        product={productEdit}
        toggleEditModal={toggleEditModal}
        updateProductState={updateProductState}
        refreshData={refreshData}
      />
      <DeleteProduct
        open={openDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        refreshData={refreshData}
        productId={productDeleteId}
        
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((p) => (
            <Table.Row key={p.id}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>{p.price}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => handleEdit(p)}>
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default ProductTable;
