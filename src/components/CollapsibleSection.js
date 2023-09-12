import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUpSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';

const Container = styled('div')(({ theme }) => ({
  cursor: 'pointer', // This style will be applied to Typography
  display: 'flex',
  justifyContent: 'space-between',
}));

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
      children, id, label, t,
    } = this.props;
    const { open } = this.state;

    return (
      <>
        <Container sx={{ padding: 0 }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            id={id}
            onClick={this.toggleSection}
            variant="overline"
            component="h4"
          >
            {label}
          </Typography>
          <MiradorMenuButton
            aria-label={t(open ? 'collapseSection' : 'expandSection', { section: label })}
            aria-expanded={open}
            sx={{ padding: 0 }}
            onClick={this.toggleSection}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </MiradorMenuButton>
        </Container>
        {open && children}
      </>
    );
  }
}

CollapsibleSection.propTypes = {
  children: PropTypes.node.isRequired,

  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
