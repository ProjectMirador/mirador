import React from 'react';
import PropTypes from 'prop-types';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';

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
      if (onDrop) onDrop(props, monitor);
    },
  });

  const isActive = canDrop && isOver;

  return (
    <div ref={drop}>
      {React.Children.map(children, child => (
        React.cloneElement(
          child,
          {
            dropActive: isActive,
          },
        )
      ))
      }
    </div>
  );
};

IIIFDropTarget.propTypes = {
  children: PropTypes.node.isRequired,
  onDrop: PropTypes.func.isRequired,
};
