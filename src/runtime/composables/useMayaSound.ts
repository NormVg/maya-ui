import { playUISound } from '@thenormvg/web-have-sounds';

export type SoundType = "click" | "pop" | "toggle" | "tick" | "drop" | "success" | "error" | "warning" | "startup";
export type FeelType = "soft" | "aero" | "arcade" | "organic" | "glass" | "industrial" | "minimal" | "retro" | "crisp";

export interface FeelParams {
    filterFreq: number;
    q: number;
    oscType: OscillatorType;
    decayMult: number;
    gainMult: number;
    pitchMult: number;
}

export interface MayaSoundOptions {
    theme?: FeelType | FeelParams;
    enabled?: boolean;
}

export function useMayaSound(globalOptions?: MayaSoundOptions) {
    const isEnabled = globalOptions?.enabled ?? true;
    const defaultTheme = globalOptions?.theme ?? 'aero';

    const play = (type: SoundType, overrideTheme?: FeelType | FeelParams) => {
        if (!import.meta.client) return;
        if (!isEnabled) return;
        
        try {
            playUISound(type, overrideTheme || defaultTheme);
        } catch (e) {
            console.warn('Maya UI Sound Error:', e);
        }
    };

    return {
        play,
        isEnabled
    };
}
