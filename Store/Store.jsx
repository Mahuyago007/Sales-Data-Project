import React, { Component } from "react";

import axios from "axios";
import StoreTable from "./StoreTable";
import { Button } from "semantic-ui-react";
import CreateStore from "./CreateStore";
// import EditCustomer from "./EditCustomer";

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      toggleCreateModal: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

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
    const { stores, toggleCreateModal } = this.state;
    return (
      <div>
        <CreateStore
          open={toggleCreateModal}
          toggleModal={this.toggleModal}
          refreshData={this.getData}
        />
        <h1 className="large">Store</h1>
        <Button Primary onClick={() => this.toggleModal()}>
          Create{" "}
        </Button>
        <StoreTable stores={stores} refreshData={this.getData} />
      </div>
    );
  }
}
