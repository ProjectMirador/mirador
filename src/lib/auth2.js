import { Utils } from 'manifesto.js';

/** The Auth 2 service tree is probe → access → token/logout. */
export const getAuth2Probes = (resource) => {
  if (!resource) return [];
  const compatible = resource.__jsonld ? resource : { ...resource, options: {} };
  return Utils.getServices(compatible).filter((service) => service.__jsonld.type === 'AuthProbeService2');
};

export const getAuth2AccessServices = (resource) =>
  getAuth2Probes(resource).flatMap((probe) =>
    Utils.getServices(probe)
      .filter((service) => service.__jsonld.type === 'AuthAccessService2')
      .map((service, index) => ({
        id: service.id || `${probe.id}#external-${index}`,
        probeId: probe.id,
        service,
      })),
  );

export const getAuth2RelatedService = (accessService, type) =>
  Utils.getServices(accessService).find((service) => service.__jsonld.type === type);

/** Resolve a Presentation API language map to a single display string. */
export const auth2Text = (value, locale) => {
  if (!value) return undefined;
  const language = typeof locale === 'string' ? locale.replace(/-.*$/, '') : undefined;
  const values = value[locale] || value[language] || value.none || value.en || Object.values(value)[0];
  return Array.isArray(values) ? values[0] : values;
};
