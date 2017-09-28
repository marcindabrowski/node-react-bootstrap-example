import React, {
  PureComponent,
} from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import AnimatedView from '../../components/animatedView/AnimatedView';
import { listClaims, updateClaim } from '../../services/index';

const claimType = {
  'Lost Baggage': 'Lost Baggage',
  Theft: 'Theft',
  'Missed Flight': 'Missed Flight',
  Illness: 'Illness',
  Accident: 'Accident',
};

const statusType = {
  New: 'New',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
};

class ManageClaims extends PureComponent {
  static priceFormatter(cell) {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      claims: [],
    };
    this.cellButton = this.cellButton.bind(this);
  }
  componentDidMount() {
    this.fetchClaims();
  }

  fetchClaims() {
    const ME = this;
    listClaims()
      .then(res => ME.setState({ claims: res.data }))
      .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  changeStatus(id, status) {
    const ME = this;
    updateClaim(id, status)
      .then(() => ME.fetchClaims())
      .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  cellButton(cell, row) {
    if (row.status !== 'New') {
      return null;
    }
    return (
      <div>
        <button type="button" onClick={() => this.changeStatus(row.id, statusType.Accepted)}>
          <i className="glyphicon glyphicon-ok" />
        </button>
        <button type="button" onClick={() => this.changeStatus(row.id, statusType.Rejected)}>
          <i className="glyphicon glyphicon-remove" />
        </button>
      </div>
    );
  }

  render() {
    const options = {
      clearSearch: true,
      clearSearchBtn: () => (<ClearSearchButton />),
    };
    return (
      <AnimatedView>
        <BootstrapTable
          data={this.state.claims}
          options={options}
          search
          striped
          hover
          condensed
          pagination
          exportCSV
        >
          <TableHeaderColumn dataField="id" isKey dataSort dataAlign="right">ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort filter={{ type: 'TextFilter', delay: 1000 }}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort filter={{ type: 'TextFilter', delay: 1000 }}>Email</TableHeaderColumn>
          <TableHeaderColumn dataField="policyId" dataSort filter={{ type: 'TextFilter', delay: 1000 }}>Policy ID</TableHeaderColumn>
          <TableHeaderColumn dataField="type" dataSort filter={{ type: 'SelectFilter', options: claimType, delay: 1000 }}>Claim Type</TableHeaderColumn>
          <TableHeaderColumn
            dataField="amount"
            dataSort
            dataFormat={ManageClaims.priceFormatter}
            filter={{
              type: 'NumberFilter',
              delay: 1000,
              numberComparators: ['=', '>', '<='],
            }}
            dataAlign="right"
          >Claim Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataSort filter={{ type: 'DateFilter' }}>Date Occurred</TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort filter={{ type: 'SelectFilter', options: statusType, defaultValue: 'New', delay: 1000 }}>State</TableHeaderColumn>
          <TableHeaderColumn
            dataField="button"
            dataFormat={this.cellButton}
          >Action</TableHeaderColumn>
        </BootstrapTable>
      </AnimatedView>
    );
  }
}

export default ManageClaims;
