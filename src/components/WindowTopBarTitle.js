import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ErrorIcon from '@mui/icons-material/ErrorOutlineSharp';

const TitleTypographyStyle = styled(TitleTypography)(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  paddingLeft: theme.spacing(0.5),
}));

const TitleStyle = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  flexGrow: 1,
  paddingLeft: theme.spacing(0.5),
}));
/** */
function TitleTypography({ children, ...props }) {
  return (
    <Typography variant="h2" noWrap color="inherit" {...props}>
      {children}
    </Typography>
  );
}

TitleTypography.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * WindowTopBarTitle
 */
export class WindowTopBarTitle extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      error, hideWindowTitle, isFetching, manifestTitle,
    } = this.props;

    let title = null;
    if (isFetching) {
      title = (
        <TitleTypographyStyle>
          <Skeleton variant="text" />
        </TitleTypographyStyle>
      );
    } else if (error) {
      title = (
        <>
          <ErrorIcon color="error" />
          <TitleTypographyStyle color="textSecondary">
            {error}
          </TitleTypographyStyle>
        </>
      );
    } else if (hideWindowTitle) {
      title = (<TitleStyle />);
    } else {
      title = (
        <TitleTypographyStyle>
          {manifestTitle}
        </TitleTypographyStyle>
      );
    }
    return title;
  }
}

WindowTopBarTitle.propTypes = {
  error: PropTypes.string,
  hideWindowTitle: PropTypes.bool,
  isFetching: PropTypes.bool,
  manifestTitle: PropTypes.string,
};

WindowTopBarTitle.defaultProps = {
  error: null,
  hideWindowTitle: false,
  isFetching: false,
  manifestTitle: '',
};
