import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import SidebarIndexList from '../containers/SidebarIndexList';
import SidebarSequenceItem from '../containers/SidebarSequenceItem';

/** */
export class SidebarSequenceList extends Component {
  /** */
  constructor(props) {
    super(props);

    const open = {};
    props.sequences.forEach((sequence, i) => {
      if (i === 0) {
        open[sequence.id] = true;
      } else {
        open[sequence.id] = false;
      }
    });

    this.state = { open };
    this.handleClick = this.handleClick.bind(this);
  }

  /** @private */
  getIdAndLabelOfSequences() {
    const { sequences } = this.props;

    return sequences.map((sequence, index) => ({
      id: sequence.id,
      label: (sequence.getLabel
        && sequence.getLabel().length > 0)
        ? sequence.getLabel()[0].value
        : sequence.id,
    }));
  }

  /** @private */
  handleClick(sequenceId) {
    const { open } = this.state;
    open[sequenceId] = !open[sequenceId];
    Object.keys(open).forEach((sequence) => {
      if (sequence !== sequenceId) {
        open[sequence] = false;
      }
    });

    this.setState({ open });
  }

  /** */
  render() {
    const {
      containerRef,
      sequences,
      id,
      t,
      classes,
      windowId,
    } = this.props;

    const { open } = this.state;

    const sequencesIdAndLabel = this.getIdAndLabelOfSequences(sequences);
    const Item = SidebarSequenceItem;

    /** */
    return (
      <MenuList variant="selectedMenu" disablePadding>
        {
          sequencesIdAndLabel.map((sequence, sequenceIndex) => {
            /** */
            const onClick = () => this.handleClick(sequence.id);

            /** */
            return (
              <div key={sequence.id}>
                <MenuItem
                  className={classes.listItem}
                  righticon={<ArrowDropDownCircle />}
                  alignItems="flex-start"
                  onClick={onClick}
                  button
                  component="li"
                >
                  <Item sequence={sequence} otherSequence={sequences[sequenceIndex]} />
                  {open[sequence.id] ? <IconExpandLess /> : <IconExpandMore />}
                </MenuItem>
                <Collapse in={open[sequence.id]} timeout="auto" unmountOnExit>
                  <Divider />
                  <SidebarIndexList
                    id={id}
                    t={t}
                    sequence={sequences[sequenceIndex]}
                    containerRef={containerRef}
                    windowId={windowId}
                  />
                </Collapse>
              </div>
            );
          })
        }
      </MenuList>
    );
  }
}

SidebarSequenceList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  sequences: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SidebarSequenceList.defaultProps = {
  t: () => {},
};
