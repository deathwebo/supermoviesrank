import React, {Component} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import ModalCard from './ModalCard';


class ShareList extends Component {
  constructor(props) {

    super(props);

    let url = "";
    if (props.profile) {
      url = window.location.protocol + '//'
        + window.location.host + '/' + props.profile.googleId;
    }

    this.state = {
      isModalActive: false,
      value: url,
      copied: false
    };
  }

  showModal() {
    this.setState({
      isModalActive: true
    });
  }

  hideModal() {
    this.setState({
      isModalActive: false
    });
  }

  render() {

    if (!this.props.profile) {
      return null;
    }

    let copiedMessage = (
      <article className="message is-success">
        <div className="message-body">
          Your list url has been copied to the clipboard!
        </div>
      </article>
    );

    return (
      <div>
        <a className="navbar-item" onClick={() => this.setState({isModalActive: true})}>
          <span className="icon">
            <i className="fa fa-share-alt" aria-hidden="true"></i>
          </span>
          Share my list
        </a>

        <ModalCard
          title="Copy and share!"
          isActive={this.state.isModalActive}
          onClose={() => this.hideModal()}
        >
          {this.state.copied ? copiedMessage : null}

          <div className="field is-grouped">
            <div className="control is-expanded">
              <input value={this.state.value} className="input"
              onChange={({target: {value}}) => this.setState({value, copied: false})} />
            </div>

            <div className="control">
              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                  <button className="button">
                    <span className="icon">
                      <i className="fa fa-clipboard" aria-hidden="true"></i>
                    </span>
                    <span>Copy</span>
                  </button>
              </CopyToClipboard>
            </div>

          </div>

        </ModalCard>
      </div>
    )
  }
}

ShareList.propTypes = {
  profile: PropTypes.object
};

export default ShareList;