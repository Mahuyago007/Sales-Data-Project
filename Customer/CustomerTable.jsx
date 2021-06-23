import React, { Fragment, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

const CustomerTable = (props) => {
  const { customers, refreshData } = props;

  const [customerEdit, setCustomerEdit] = useState({
    id: 0,
    name: "",
    address: "",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [customerDeleteId, setCustomerDeleteId]=useState(false);
    

  const updateCustomerState = (customer) => {
  
    setCustomerEdit(customer);
  }

    const handleEdit = (c) => {
    setCustomerEdit(c);
    setOpenEditModal(true);
  };

  const toggleEditModal = (value) => {
    setOpenEditModal(value);
  };
  
  const handleDelete=(id)=>{
    
    setCustomerDeleteId(id);
    setOpenDeleteModal(true)
    
  };
  const toggleDeleteModal=()=>{setOpenDeleteModal(false)};

  return (
    <Fragment>
      <EditCustomer
        open={openEditModal}
        customer={customerEdit}
        toggleEditModal={toggleEditModal}
        updateCustomerState={updateCustomerState}
        refreshData={refreshData}
      />
      <DeleteCustomer
        open={openDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        refreshData={refreshData}
        customerId={customerDeleteId}
        
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((c) => (
            <Table.Row key={c.id}>
              <Table.Cell>{c.name}</Table.Cell>
              <Table.Cell>{c.address}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => handleEdit(c)}>
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleDelete(c.id)}>
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

export default CustomerTable;
