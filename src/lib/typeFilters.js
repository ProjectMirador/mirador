import canvasTypes from './canvasTypes';
/**
 */
export function filterByTypes(resources, types) {
  if (types === undefined || resources === undefined) return [];

  if (!Array.isArray(types)) {
    return resources.filter((resource) => types === resource.getProperty('type'));
  }

  return resources.filter((resource) => types.includes(resource.getProperty('type')));
}

/** */
export function audioResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.audioTypes);
}

/**
 */
export function anyImageServices(resource) {
  const services = resource ? resource.getServices() : [];
  return services.filter(s => canvasTypes.imageServiceProfiles.includes(s.getProfile()));
}

/** */
export function hasImageService(resource) {
  const imageServices = anyImageServices(resource);
  return imageServices[0] && imageServices[0].id;
}

/** */
export function iiifImageResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.imageTypes).filter((r) => hasImageService(r));
}

/** */
export function textResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.textTypes);
}

/** */
export function videoResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.videoTypes);
}
