import React, { Component } from 'react';
import debounce from 'lodash/debounce';

class ResourceMoviesFilter extends Component {

  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.onChange = this.onChange.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 250);
  }

  handleChange() {
    this.props.filterMovies(this.state.value);
  }

  onChange(event) {
    event.persist();
    this.setState({
      value: event.target.value
    });
    this.handleChange();
  }

  render() {
    return (
      <div className="ResourceMoviesFilter">
        <form>
          <input
            value={this.state.value}
            type="text"
            onChange={this.onChange}
            placeholder="Filter movies"
          />
        </form>
      </div>
    );
  }
}

export default ResourceMoviesFilter;