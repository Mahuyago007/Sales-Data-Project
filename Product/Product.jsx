import React, {Component} from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import CreateProduct from "./CreateProduct";
import ProductTable from "./ProductTable";

export class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          toggleCreateModal: false,
        };
      }
      componentDidMount() {
          console.log("componentDidMount");
        this.getData();
      }
    
      getData = () => {
        axios
          .get("/Products/GetProduct")
          .then(({ data }) => {
            this.setState({
              products: data,
            });
    
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      componentDidUpdate() {
        console.log("componentDidUpdate");
      }
    
      componentWillUnmount() {
        console.log("componentWillUnmount");
      }
    
      toggleModal = () => {
        this.setState({ toggleCreateModal: !this.state.toggleCreateModal });
      };
    
      render() {
        const { products, toggleCreateModal } = this.state;
        return (
          <div>
            <CreateProduct
              open={toggleCreateModal}
              toggleModal={this.toggleModal}
              refreshData={this.getData}
            />
            <h1 className="large1">Products</h1>
            <Button Primary onClick={() => this.toggleModal()}>
              Create{" "}
            </Button>
            <ProductTable products={products} refreshData={this.getData} />
          </div>
        );
      }

}