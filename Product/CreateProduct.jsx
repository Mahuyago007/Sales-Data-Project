import React, {useState,useEffect} from 'react'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'
import axios from 'axios';

const CreateProduct= (props) => {
  const [Name, setName] = useState();
  const[Price, setPrice]=useState();


  const {open,toggleModal,refreshData}=props;

 const createProduct=() =>{
    axios.post('/Products/PostProduct',{

      Name: Name,
      Price:Price
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
  console.log("Price is" +Price);
  return()=>{
console.log("unmount");
  };
  
});


  return (
    <Modal
      
      open={open}
      
    >
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>        

  <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Price</label>
      <input placeholder='Price'onChange={(e) => setPrice(e.target.value)} />
    </Form.Field>
     </Form>


        </Modal.Description>
      </Modal.Content>      
      <Modal.Actions>
        <Button color="yellow" onClick={toggleModal}> 
          Cancel
        </Button>
        <Button color="green" onClick={createProduct}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default CreateProduct