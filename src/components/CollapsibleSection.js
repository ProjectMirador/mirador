import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDownSharp';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUpSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * CollapsableSection ~
*/
export class CollapsibleSection extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { open: true };
    this.toggleSection = this.toggleSection.bind(this);
  }

  /** */
  toggleSection() {
    const { open } = this.state;

    this.setState({ open: !open });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      children, classes, id, label, t,
    } = this.props;
    const { open } = this.state;

    return (
      <>
        <div>
          <MiradorMenuButton
            aria-label={
              t(
                open ? 'collapseSection' : 'expandSection',
                { section: label.toLowerCase() },
              )
            }
            className={classes.button}
            onClick={this.toggleSection}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </MiradorMenuButton>
          <Typography
            className={classes.heading}
            id={id}
            onClick={this.toggleSection}
            variant="overline"
          >
            {label}
          </Typography>
        </div>
        {open && children}
      </>
    );
  }
}

CollapsibleSection.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
