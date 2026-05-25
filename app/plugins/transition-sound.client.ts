import netherPortal from '~/assets/sfx/nether_portal.mp3';

export default defineNuxtPlugin((nuxtApp) => {
  const sfx = useSFX(netherPortal, { volume: 0.2, interrupt: true });

  nuxtApp.hook('page:start', () => {
    sfx.play();
  });
});
