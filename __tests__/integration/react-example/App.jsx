import React, { Component } from 'react';

import m3core from '../../../index.umd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
      lastRequested: '',
      content: 'Nothing Selected Yet',
    };
    this.fetchManifest = this.fetchManifest.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    m3core.store.subscribe(() => {
      const manifest = m3core.store.getState().manifests[this.state.lastRequested];

      if (manifest) {
        if (manifest.isFetching) {
          this.setState({
            content: '☕',
          });
          return;
        } else if (manifest.error) {
          this.setState({
            content: manifest.error.message,
          });
          return;
        }

        this.setState({
          content: JSON.stringify(manifest.json, 0, 2),
        });
      }
    });
  }
  fetchManifest(event) {
    event.preventDefault();
    const f = m3core.actions.fetchManifest(this.state.formValue);
    this.setState({
      lastRequested: this.state.formValue,
    });
    m3core.store.dispatch(f);
  }
  handleInputChange(event) {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.fetchManifest}>
          <input
            value={this.state.formValue}
            id="manifestURL"
            type="text"
            onChange={this.handleInputChange}
          />

          <button id="fetchBtn" type="submit">Fetch Manifest</button>
          <pre id="exampleManifest">
            { this.state.content }
          </pre>
        </form>
      </div>
    );
  }
}

export default App;
