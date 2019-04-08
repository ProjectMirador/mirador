import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { List } from '@material-ui/core';
import { chars, keys } from './KeyHelper';

/**
 *
 */
export class ListKeyboardNavigation extends Component {
  /** */
  constructor(props) {
    super(props);
    const { selected } = props;
    this.state = {
      selected,
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  /** */
  componentDidMount() {
    this.selectedChild && ReactDOM.findDOMNode(this.selectedChild).focus(); // eslint-disable-line react/no-find-dom-node, max-len
  }

  /** */
  keyDownHandler(event) {
    if (event.key === keys.up || event.which === chars.up) {
      event.preventDefault();
      return this.selectPreviousItem(event.target);
    }
    if (event.key === keys.down || event.which === chars.down) {
      event.preventDefault();
      return this.selectNextItem(event.target);
    }
    if (event.key === keys.enter || event.which === chars.enter) {
      event.preventDefault();
      const { selected } = this.state;
      const { onChange } = this.props;
      return onChange(selected);
    }
    return null;
  }

  /** */
  selectPreviousItem() {
    const { selected } = this.state;
    const selectedIndex = this.values.indexOf(selected);
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : this.values.length - 1;
    this.setState({ selected: this.values[newIndex] });
  }

  /** */
  selectNextItem() {
    const { selected } = this.state;
    const selectedIndex = this.values.indexOf(selected);
    const newIndex = selectedIndex + 1 < this.values.length ? selectedIndex + 1 : 0;
    this.setState({ selected: this.values[newIndex] });
  }

  /** */
  render() {
    const { children, className, onChange } = this.props;
    const { selected } = this.state;
    this.listItems = children;
    this.values = children.map(child => child.props.value);
    const childrenSelected = children.map((child, index) => {
      const ret = React.cloneElement(child, {
        ...child.props,
        key: child.props.value || index,
        onClick: () => {
          onChange(child.props.value);
          this.setState({ selected: child.props.value });
          child.props.onClick && child.props.onClick();
        },
        selected: (child.props.value === selected),
      }, child.props.children);
      return ret;
    });
    return (
      <List {...this.props} tabIndex="0" className={className} ref={(ref) => { this.selectedChild = ref; }} onKeyDown={this.keyDownHandler}>
        {childrenSelected}
      </List>
    );
  }
}

ListKeyboardNavigation.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

ListKeyboardNavigation.defaultProps = {
  children: [],
};
