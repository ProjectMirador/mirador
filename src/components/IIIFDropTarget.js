import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import { grey } from '@material-ui/core/colors';
import { v4 as uuid } from 'uuid';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { readImageMetadata } from '../lib/readImageMetadata';

/** */
export const handleDrop = (item, monitor, props) => {
  const { onDrop } = props;

  if (item.urls) {
    item.urls.forEach((str) => {
      const url = new URL(str);
      const manifestId = url.searchParams.get('manifest');
      const canvasId = url.searchParams.get('canvas');

      if (manifestId) onDrop({ canvasId, manifestId }, props, monitor);
    });
  }

  if (item.files) {
    const manifestFiles = item.files.filter(f => f.type === 'application/json');
    const manifestPromises = manifestFiles.map(file => (
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const manifestJson = reader.result;
          const manifestId = uuid();

          if (manifestJson) onDrop({ manifestId, manifestJson }, props, monitor);
          resolve();
        });
        reader.readAsText(file);
      })
    ));

    const imageFiles = item.files.filter(({ type }) => type.startsWith('image/'));

    let imagePromise;

    if (imageFiles.length > 0) {
      const id = uuid();
      const imageData = imageFiles.map(file => readImageMetadata(file));

      imagePromise = Promise.all(imageData).then((images) => {
        const manifestJson = {
          '@context': 'http://iiif.io/api/presentation/3/context.json',
          id,
          items: images.map(({
            name, type, width, height, url,
          }, index) => ({
            height,
            id: `${id}/canvas/${index}`,
            items: [
              {
                id: `${id}/canvas/${index}/1`,
                items: [{
                  body: {
                    format: type,
                    id: url,
                    type: 'Image',
                  },
                  height,
                  id: `${id}/canvas/${index}/1/image`,
                  motivation: 'painting',
                  target: `${id}/canvas/${index}/1`,
                  type: 'Annotation',
                  width,
                }],
                type: 'AnnotationPage',
              },
            ],
            label: name,
            type: 'Canvas',
            width,
          })),
          label: images[0].name,
          type: 'Manifest',
        };

        const manifestId = uuid();
        if (manifestJson) onDrop({ manifestId, manifestJson }, props, monitor);
      });
    }

    return Promise.all([...manifestPromises, imagePromise]);
  }

  return undefined;
};

/** */
export const IIIFDropTarget = (props) => {
  const { children, onDrop } = props;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.URL, NativeTypes.FILE],
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    /** */
    drop(item, monitor) {
      if (!onDrop) return;
      handleDrop(item, monitor, props);
    },
  });

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} style={{ height: '100%', width: '100%' }}>
      {children}
      <Backdrop open={isActive} style={{ zIndex: 9999 }}>
        <InsertDriveFileSharpIcon style={{ color: grey[400], fontSize: 256 }} />
      </Backdrop>
    </div>
  );
};

IIIFDropTarget.propTypes = {
  children: PropTypes.node.isRequired,
  onDrop: PropTypes.func.isRequired,
};
