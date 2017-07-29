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
          <p> 
            You ever had that question asked ? <strong>What are your favorite superhero movies?</strong>
            Or worst! You get asked to name your favorite superhero movies from first to last! 
          </p>

          <p>
            Good thing we got that question asked too! So we made a tool that help you build your own list
            and share it with world! 
          </p>

          <p>
            You get a list of all the superhero movies that have been released to date, ordered alphabetically,
            to start adding your favorite ones into your list.
          </p>
        </ModalCard>
      </div>
    )
  }
}

export default About;