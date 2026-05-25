export const useSFXMuted = () => {
  const persisted = useLocalStorage<boolean>('sfx-muted', false);
  const isMuted   = useState<boolean>('sfx-muted', () => persisted.value);

  const toggleMute = () => {
    isMuted.value   = !isMuted.value;
    persisted.value = isMuted.value;
  };

  return { isMuted, toggleMute };
};

interface ISFXOptions {
  volume?: number;
  /** true (по умолчанию) — перематывает и проигрывает заново при повторном вызове */
  interrupt?: boolean;
}

export function useSFX(src: string, options: ISFXOptions = {}) {
  const { volume = 1, interrupt = true } = options;
  const { isMuted } = useSFXMuted();

  const audio = import.meta.client
    ? Object.assign(new Audio(src), { volume, preload: 'auto' } as HTMLAudioElement)
    : null;

  const play = () => {
    if (!audio || isMuted.value) return;
    if (interrupt) audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const stop = () => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  return { play, stop };
}
