import React, {useState,useEffect} from 'react'
import { Button, Header, Image, Modal,Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios';

const CreateSales= (props) => {
  const [CId, setSelectedCId] = useState();
  const[PId, setSelectedPId]=useState();
  const[SId, setSelectedSId]=useState();
  const[DateSold, setDateSold]=useState();
  const [customerList]=useState([]);
  const [productList]=useState([]);
  const[storeList]=useState([]);
   

  const {open, toggleModal, refreshData}=props;


 const createSales=() =>{
    axios.post('/Sales/PostSales',{

      cId:CId,
      pId:PId,
      sId:SId,
      dateSold:DateSold,
    }
    
    )
    .then((res) =>{
       refreshData();
       toggleModal  ();     
        
      console.log(res);
    })
    .catch((err)=> {
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
  
},[customerList, productList, storeList]);


  return (
    <Modal
      
      open={open}
      
    >
      <Modal.Header>Create Sales</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>        

  <Form>
    <Form.Field>
      <label> Customer </label>
      <Dropdown placeholder='Select Customer' search selection options={customerList} onChange={(e, data) => {
        const { value } = data;
        const { key } = (data.options.find(x => x.value === value));
        setSelectedCId(key);
    }} />
        </Form.Field>
    <Form.Field>
      <label>Product</label>
      <Dropdown placeholder='Select Product' search selection options={productList} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedPId(key);
                            }} />
      </Form.Field>
      <Form.Field>
      <label>Store</label>
      <Dropdown placeholder='Select Store' search selection options={storeList} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedSId(key);
                            }} />
      </Form.Field>
      <Form.Field>
      <label>DateSold</label>
      <input type="datetime-local" placeholder='DateSold' onChange={(e) => setDateSold(e.target.value)} />
    </Form.Field>
     </Form>

        </Modal.Description>
      </Modal.Content>      
      <Modal.Actions>
        <Button color="yellow" onClick={toggleModal}> 
          Cancel
        </Button>
        <Button color="green" onClick={createSales}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default CreateSales