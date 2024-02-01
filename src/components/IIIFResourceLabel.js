import { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  getLocale,
} from '../state/selectors';
import LocaleContext from '../contexts/LocaleContext';

/** Render the IIIF resource's label using the contextual locale or a fallback */
export const IIIFResourceLabel = ({ resource = undefined, fallback = undefined }) => {
  const contextLocale = useContext(LocaleContext);
  const fallbackLocale = useSelector(state => getLocale(state, {}));

  if (!resource) return fallback;

  const label = resource.getLabel();

  if (!label) return fallback;

  return label.getValue(contextLocale || fallbackLocale || '') ?? (fallback || resource.id);
};
