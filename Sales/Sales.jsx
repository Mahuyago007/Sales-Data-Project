import React, { Component } from "react";

import axios from "axios";
import SalesTable from "./SalesTable";
import { Button } from "semantic-ui-react";
import CreateSales from "./CreateSales";
import { Customer } from "../Customer/Customer";
// import EditCustomer from "./EditCustomer";

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
     customers:[],
     products:[],
     stores:[],
      sales: [],

      toggleCreateModal: false,
    };
  }

  componentDidMount() {
    this.getData();
    this.getData();
    this.getData();
    this.getData();
    
  }

  
  getData = () => {
    axios
      .get("/Sales/GetSales")
      .then(({ data }) => {
        this.setState({
          sales: data,
          
        });

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        this.setState({
          customers: data,
        });

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  getData = () => {
    axios
      .get("/Stores/GetStore")
      .then(({ data }) => {
        this.setState({
          stores: data,
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
    const { sales, toggleCreateModal } = this.state;
    return (
      <div>
        <CreateSales
          open={toggleCreateModal}
          toggleModal={this.toggleModal}
          refreshData={this.getData}
        />
        <h1 className="large">Sales</h1>
        <Button Primary onClick={() => this.toggleModal()}>
          Create{" "}
        </Button>
        <SalesTable sales={sales} refreshData={this.getData} />
      </div>
    );
  }
}
