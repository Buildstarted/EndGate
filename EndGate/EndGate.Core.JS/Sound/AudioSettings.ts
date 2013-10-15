/// <reference path="../Interfaces/ICloneable.ts" />

module EndGate.Sound {

    /**
    * Defines a set of settings that are used to play AudioClip's a custom way.
    */
    export class AudioSettings implements ICloneable {
        /**
        * The default audio settings.
        */
        public static Default: AudioSettings = new AudioSettings();

        /**
        * Gets or sets the repeat function of the AudioClip.
        */
        public Repeat: boolean;
        /**
        * Gets or sets the volume level of the AudioClip. Value between 0-100.
        */
        public Volume: number;
        /**
        * Gets or sets the auto play functionality of the AudioClip.
        */
        public AutoPlay: boolean;
        /**
        * Gets or sets the preload functionality of the AudioClip.  Values can be "auto", "metadata", or "none".
        */
        public Preload: string;
        
        /**
        * Creates a new instance of the AudioSettings object with default values.
        */
        constructor();
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        */
        constructor(repeat: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        */
        constructor(repeat: boolean, volume: number);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        * @param preload Initial value of the preload component.  Values can be "auto", "metadata", or "none".
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean, preload: string);
        constructor(repeat: boolean = false, volume: number = 100, autoplay: boolean = false, preload: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }

        /**
        * Returns a new AudioSettings object that is identical to the current AudioSettings object.
        */
        public Clone(): AudioSettings {
            return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
        }
    }

}