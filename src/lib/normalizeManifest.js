// eslint-disable-next-line import/no-unresolved
import { upgradeToPresentation4, normalize, serialize, serializeConfigPresentation4 } from '@iiif/parser/presentation-4';

function handleCanvasOrSpecificResource(canvas) {
  if (typeof canvas !== 'string') return canvas;
  if (canvas.includes('#xywh=')) {
    return {
      '@type': 'oa:SpecificResource',
      full: {
        '@type': 'sc:Canvas',
        '@id': canvas.split('#xywh=')[0],
      },
      selector: {
        '@type': 'oa:FragmentSelector',
        value: `xywh=${canvas.split('#xywh=')[1]}`,
      },
    };
  }
  return { '@id': canvas, '@type': 'sc:Canvas' };
}

const convertPresentation2Service = (service) => {
  if (!service) return undefined;
  const { '@id': id, '@context': context, ...rest } = service;
  return { id, type: 'ImageService2', profile: 'level1', ...rest };
};

// @iiif/parser mangles ranges that reference fragments using the string syntax..
function handleStructures(json) {
  if (json.structures?.some((s) => s.canvases?.some((c) => typeof c === 'string' && c.includes('#xywh')))) {
    const upgradedStructures = json.structures.map((s) => {
      if (!s.canvases || !s.canvases.some((c) => typeof c === 'string' && c.includes('#xywh'))) {
        return s;
      }

      const { canvases = [], ranges = [], members = undefined, ...otherRangeProps } = s;

      const updatedMembers = members || [
        ...ranges.map((r) => (typeof r === 'string' ? { '@id': r, '@type': 'sc:Range' } : r)),
        ...canvases.map((c) => handleCanvasOrSpecificResource(c)),
      ];

      return { ...otherRangeProps, members: updatedMembers };
    });

    return { ...json, structures: upgradedStructures };
  }
  return json;
}

export default (input) => {
  if (input.id) return input;

  const preprocessed = handleStructures(input);

  const upgraded = upgradeToPresentation4(preprocessed);

  if (preprocessed?.sequences && preprocessed.sequences.length > 1) {
    // restore other sequences as ranges...
    upgraded.structures = preprocessed.sequences.map((s) => {
      return {
        id: s.id || s['@id'],
        type: 'Range',
        behavior: ['sequence'],
        label: s.label,
        items: s.canvases.map((c) => ({ id: c.id || c['@id'], type: 'Canvas' })),
      };
    });
  }

  const normalized = normalize(upgraded);
  const serialized = serialize(
    { entities: normalized.entities, mapping: normalized.mapping, requests: {} },
    normalized.resource,
    serializeConfigPresentation4,
  );

  if (preprocessed.viewingDirection) {
    serialized.viewingDirection = preprocessed.viewingDirection;
  }

  if (preprocessed.sequences?.length === 1 && preprocessed.sequences[0].viewingDirection) {
    serialized.viewingDirection = preprocessed.sequences[0].viewingDirection;
  }

  // fix up some things from the normalization that are weird:
  // 1. if there's a sequence-level viewing hint, it should replace the manifest-level hint:
  if (preprocessed?.sequences && preprocessed.sequences[0] && preprocessed.sequences[0].viewingHint) {
    serialized.behavior = [preprocessed.sequences[0].viewingHint];
  }

  // 2. restore the IIIF v3 rights value, if it got stripped for not being a CC/RS url.
  if (preprocessed.rights && !serialized.rights) {
    serialized.rights = preprocessed.rights;
  }

  if (preprocessed.license && !serialized.rights) {
    serialized.rights = preprocessed.license;
  }

  // 3. restore v2 provider logos
  if (preprocessed.logo && serialized.provider && serialized.provider.length > 0) {
    const { '@id': id, service, ...rest } = preprocessed.logo;

    const upgradedService = convertPresentation2Service(service);
    const logo = { id, type: 'Image', service: upgradedService, ...rest };

    serialized.provider[0].logo = [logo];
  }

  if (serialized.structures?.length === 1 && serialized.structures[0].behavior?.includes('top')) {
    // replace top with sequence:
    serialized.structures[0].behavior = serialized.structures[0].behavior.filter((b) => b !== 'top');
    serialized.structures[0].behavior.push('sequence');
  }

  return serialized;
};
