import React, { Component } from "react";

import axios from "axios";
import CustomerTable from "./CustomerTable";
import { Button } from "semantic-ui-react";
import CreateCustomer from "./CreateCustomer";
// import EditCustomer from "./EditCustomer";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      toggleCreateModal: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

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
    const { customers, toggleCreateModal } = this.state;
    return (
      <div>
        <CreateCustomer
          open={toggleCreateModal}
          toggleModal={this.toggleModal}
          refreshData={this.getData}
        />
        <h1 className="large">Hello Customer</h1>
        <Button Primary onClick={() => this.toggleModal()}>
          Create{" "}
        </Button>
        <CustomerTable customers={customers} refreshData={this.getData} />
      </div>
    );
  }
}
