import canvasTypes from './canvasTypes';
import serviceProfiles from './serviceProfiles';

/**
 * Filter resources by profile property in given profiles
 */
export function filterByProfiles(resources, profiles) {
  if (profiles === undefined || resources === undefined) return [];

  if (!Array.isArray(profiles)) {
    return resources.filter((resource) => profiles === resource.getProperty('profile'));
  }

  return resources.filter((resource) => profiles.includes(resource.getProperty('profile')));
}

/**
 * Filter resources by type property in given types
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

/** */
export function choiceResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.choiceTypes);
}

/**
 */
export function imageServicesFrom(services) {
  return filterByProfiles(services, serviceProfiles.iiifImageProfiles);
}

/** */
export function hasImageService(resource) {
  const imageServices = imageServicesFrom(resource ? resource.getServices() : []);
  return imageServices[0] && imageServices[0].id;
}

/** */
export function iiifImageResourcesFrom(resources) {
  return imageResourcesFrom(resources).filter((r) => hasImageService(r));
}

/** */
export function imageResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.imageTypes);
}

/** */
export function textResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.textTypes);
}

/** */
export function videoResourcesFrom(resources) {
  return filterByTypes(resources, canvasTypes.videoTypes);
}
