import React, { Component } from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';

import { editStream, fetchStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    let initialValues;
    if (!this.props.stream) {
      initialValues = '';
      return <div>Loading...</div>
    } else {
     const { title, description } = this.props.stream;
     initialValues = { title, description };
    }
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={initialValues}
        />
      </div>
      
    );
  }
  
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
}
export default connect (mapStateToProps, { editStream, fetchStream })(StreamEdit);