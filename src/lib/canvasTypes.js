/** values for type/@type that indicate an image content resource */
const imageTypes = ['Image', 'StillImage', 'dctypes:Image', 'dctypes:StillImage'];
Object.freeze(imageTypes);

/** values for type/@type that indicate a sound content resource */
const audioTypes = ['Audio', 'Sound', 'dctypes:Audio', 'dctypes:Sound'];
Object.freeze(audioTypes);

/** values for type/@type that indicate a text content resource */
const textTypes = ['Document', 'Text', 'dctypes:Document', 'dctypes:Text'];
Object.freeze(textTypes);

/** values for type/@type that indicate a video content resource */
const videoTypes = ['Video', 'MovingImage', 'dctypes:Video', 'dctypes:MovingImage'];
Object.freeze(videoTypes);

/** values for profile that indicate an image service */
const imageServiceProfiles = [
  'level2',
  'level1',
  'level0',
  'http://iiif.io/api/image/2/level2.json',
  'http://iiif.io/api/image/2/level1.json',
  'http://iiif.io/api/image/2/level0.json',
];

Object.freeze(imageServiceProfiles);

const canvasTypes = {
  audioTypes,
  imageServiceProfiles,
  imageTypes,
  textTypes,
  videoTypes,
};

export default canvasTypes;
