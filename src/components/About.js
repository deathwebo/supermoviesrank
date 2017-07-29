import React, {Component} from 'react';
import ModalCard from './ModalCard';

class About extends Component {
  constructor(props) {

    super(props);

    this.state = {
      isModalActive: false,
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
    return (
      <div>
        <a className="navbar-item" onClick={() => this.setState({isModalActive: true})}>
          <span className="icon">
            <i className="fa fa-question-circle-o" aria-hidden="true"></i>
          </span>
          WTF is this
        </a>

        <ModalCard
          title="About"
          isActive={this.state.isModalActive}
          onClose={() => this.hideModal()}
        >

          Insert about text here...

        </ModalCard>
      </div>
    )
  }
}

export default About;