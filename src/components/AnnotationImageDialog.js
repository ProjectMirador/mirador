import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 */
export class AnnotationImageDialog extends Component {
  /**
   * render
   * @return
   */
  constructor() {
    super();

    this.closeDialog = this.closeDialog.bind(this);
    this.getAnnotation = this.getAnnotation.bind(this);
    this.state = { annotation: {}, isModalOpen: false };
  }

  /** */
  componentDidUpdate(prevProps) {
    const {
      openedAnnotationImageId,
    } = this.props;

    if ((prevProps.openedAnnotationImageId !== openedAnnotationImageId)
      && openedAnnotationImageId) {
      this.getAnnotation();
    }
  }

  /** */
  getAnnotation() {
    const {
      annotations, selectedAnnotationId,
    } = this.props;

    let annotation = {};
    for (let i = 0; i < annotations.length; i += 1) {
      annotation = annotations && annotations[i] && annotations[i].resources
        && annotations[i].resources.find(anno => anno.id === selectedAnnotationId);
      if (annotation) {
        this.setState({ annotation, isModalOpen: true });
        break;
      }
    }
  }

  /** */
  closeDialog() {
    const {
      toggleAnnotationImage, windowId,
    } = this.props;

    toggleAnnotationImage(windowId);
    this.setState({ annotation: {}, isModalOpen: false });
  }

  /** */
  render() {
    const {
      t,
    } = this.props;
    const {
      isModalOpen, annotation,
    } = this.state;

    return isModalOpen ? (
      <Dialog
        aria-labelledby="annotation-dialog-title"
        id="annotation-dialog"
        open={isModalOpen}
      >
        <DialogTitle id="annotation-dialog-title" disableTypography>
          <Typography variant="h2">Annotation Image</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
            <img src={annotation.body[0].url} alt={t('annotationImage')} width={annotation.body[0].w} height={annotation.body[0].h} style={({ marginRight: '30' })} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog}>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    ) : null;
  }
}

AnnotationImageDialog.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  openedAnnotationImageId: PropTypes.string,
  selectedAnnotationId: PropTypes.string,
  t: PropTypes.func.isRequired,
  toggleAnnotationImage: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

AnnotationImageDialog.defaultProps = {
  annotations: [],
  openedAnnotationImageId: undefined,
  selectedAnnotationId: undefined,
};
