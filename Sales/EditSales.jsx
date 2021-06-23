import React, {useEffect,useState} from "react";
import { Button,  Modal, Form, Dropdown} from "semantic-ui-react";
import axios from "axios";

const EditSales = (props) => {
  const { open, sale, toggleEditModal, updateSalesState, refreshData } =
    props;
    const [customerList] = useState([]);
    const [productList] = useState([]);
    const [storeList] = useState([]);

    const [dateSold, setDateSold] = useState();
    const [cId, setSelectedCustomerId] = useState();
    const [pId, setSelectedProductId] = useState();
    const [sId, setSelectedStoreId] = useState();

    



  const updateSales = (sa) => {
 
    axios
      .put(`/Sales/PutSales/${sa.id}`, {
        id: sa.id,
        cId: sa.cId,
        pId: sa.pId,
        sId:sa.sId,
        dateSold:sa.dateSold
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

  useEffect(() => {
       
     

    axios.get('Customers/GetCustomer')
        .then((res) => {
            console.log(res.data)
            res.data.forEach((c) => {
                customerList.push({
                    key: c.id,
                    text: c.name,
                    value: c.name
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });

    axios.get('Products/GetProduct')
        .then((res) => {
            console.log(res.data)
            res.data.forEach((p) => {
                productList.push({
                    key: p.id,
                    text: p.name,
                    value: p.name
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });

    axios.get('Stores/GetStore')
        .then((res) => {
            console.log(res.data)
            res.data.forEach((s) => {
                storeList.push({
                    key: s.id,
                    text: s.name,
                    value: s.name
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });

}, [customerList, productList, storeList]);

  return (
    <Modal open={open}>
      <Modal.Header>Edit Sales</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Customer</label>
              
              <Dropdown defaultValue={cId} placeholder='Select Customer' search selection options={customerList} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedCustomerId(key);
                                updateSalesState({
                                  ...sale,
                                  cId: e.target.value,
                                })
                                
                            }} />
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <Dropdown defaultValue={pId} placeholder='Select Product' search selection options={productList} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedProductId(key);
                                updateSalesState({
                                  ...sale,
                                  pId: e.target.value,
                                })
                                
                            }} />
            </Form.Field>
            
            <Form.Field>
              <label>Store</label>
              <Dropdown defaultValue={sId} placeholder='Select Store' search selection options={storeList} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedStoreId(key);
                                updateSalesState({
                                  ...sale,
                                  sId: e.target.value,
                                })
                                
                            }} />          
            </Form.Field>
            <Form.Field>
              <label>DateSold</label>
              <input
                type="datetime-local"
                placeholder="DateSold"
                value={sale.DateSold}
                onChange={(e) =>
                  updateSalesState({
                    ...sale,
                    dateSold: e.target.value,
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
        <Button color="green" onClick={() => updateSales(sale)}>
          Edit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditSales;
