import React, { Fragment, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import EditStore from "./EditStore";
import DeleteStore from "./DeleteStore";

const StoreTable = (props) => {
  const { stores, refreshData } = props;

  const [storeEdit, setStoreEdit] = useState({
    id: 0,
    name: "",
    address: "",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [storeDeleteId, setStoreDeleteId]=useState(false);
    

  const updateStoreState = (store) => {
  
    setStoreEdit(store);
  }

    const handleEdit = (s) => {
    setStoreEdit(s);
    setOpenEditModal(true);
  };

  const toggleEditModal = (value) => {
    setOpenEditModal(value);
  };
  
  const handleDelete=(id)=>{
    
    setStoreDeleteId(id);
    setOpenDeleteModal(true)
    
  };
  const toggleDeleteModal=()=>{setOpenDeleteModal(false)};

  return (
    <Fragment>
      <EditStore
        open={openEditModal}
        store={storeEdit}
        toggleEditModal={toggleEditModal}
        updateStoreState={updateStoreState}
        refreshData={refreshData}
      />
      <DeleteStore
        open={openDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        refreshData={refreshData}
        storeId={storeDeleteId}
        
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
          {stores.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.name}</Table.Cell>
              <Table.Cell>{s.address}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => handleEdit(s)}>
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleDelete(s.id)}>
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

export default StoreTable;
