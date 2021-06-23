import React, {useState,useEffect} from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'
import axios from 'axios';

const CreateStore= (props) => {
  const [Name, setName] = useState();
  const[Address, setAddress]=useState();


  const {open,toggleModal,refreshData}=props;

 const createStore=() =>{
    axios.post('/Stores/PostStore',{

      Name: Name,
      Address:Address,
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
  console.log("Name is" +Name);
  console.log("Address is" +Address);
  return()=>{
console.log("unmount");
  };
  
});


  return (
    <Modal
      
      open={open}
      
    >
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>        

  <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <input placeholder='Address'onChange={(e) => setAddress(e.target.value)} />
    </Form.Field>
     </Form>


        </Modal.Description>
      </Modal.Content>      
      <Modal.Actions>
        <Button color="yellow" onClick={toggleModal}> 
          Cancel
        </Button>
        <Button color="green" onClick={createStore}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default CreateStore