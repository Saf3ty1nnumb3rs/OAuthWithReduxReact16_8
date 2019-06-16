import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
        <Link to={'/'} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete the stream?';
    }
    return `Are you sure you want to delete the stream with the title: '${this.props.stream.title}'?`
  }
  render() {
    return (
      <div>
        {this.props.stream &&
          <Modal
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={() => history.push('/')}
          />
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);