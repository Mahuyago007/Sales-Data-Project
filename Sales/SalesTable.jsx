import React, { Fragment, useState } from "react";
import { Table, Button, Dropdown } from "semantic-ui-react";
import axios from "axios";
import EditSales from "./EditSales";
import DeleteSales from "./DeleteSales";

const SalesTable = (props) => {
  const { sales, refreshData } = props;

  const [salesEdit, setSalesEdit] = useState({
    id: 0,
    cId: "",
    pId: "",
    sId:"",
    dateSold:"",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [salesDeleteId, setSalesDeleteId]=useState(false);
    

  const updateSalesState = (sale) => {
  
    setSalesEdit(sale);
  }

    const handleEdit = (sa) => {
    setSalesEdit(sa);
    setOpenEditModal(true);
  };

  const toggleEditModal = (value) => {
    setOpenEditModal(value);
  };
  
  const handleDelete=(id)=>{
    
    setSalesDeleteId(id);
    setOpenDeleteModal(true)
    
  };
  const toggleDeleteModal=()=>{setOpenDeleteModal(false)};

  return (
    <Fragment>
      <EditSales
        open={openEditModal}
        sale={salesEdit}
        toggleEditModal={toggleEditModal}
        updateSalesState={updateSalesState}
        refreshData={refreshData}
      />
      <DeleteSales                                                           
        open={openDeleteModal}
        toggleDeleteModal={toggleDeleteModal}
        refreshData={refreshData}
        salesId={salesDeleteId}
        
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>DateSold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.map((sa) => (
            <Table.Row key={sa.id}>
              <Table.Cell>{sa.Customer.name}</Table.Cell>
              <Table.Cell>{sa.Product.name}</Table.Cell>
              <Table.Cell>{sa.Store.name}</Table.Cell>
              <Table.Cell>{sa.dateSold}</Table.Cell>
              <Table.Cell>
                <Button color="yellow" onClick={() => handleEdit(sa)}>
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleDelete(sa.id)}>
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

export default SalesTable;
