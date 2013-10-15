/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="AudioSettings.ts" />

module EndGate.Sound {

    var supportedAudioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/x-m4a'
    };

    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    export class AudioClip implements IDisposable {
        private _audio: HTMLAudioElement;
        private _settings: AudioSettings;
        private _onComplete: EventHandler1<Event>;
        private _canPlayWires: Array<() => void>;
        private _endedWire: (e: Event) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        */
        constructor(source: HTMLAudioElement);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: string, settings: AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        * @param settings Audio clip settings.
        */
        constructor(source: string[], settings: AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: HTMLAudioElement, settings: AudioSettings);
        constructor(source: any, settings: AudioSettings = AudioSettings.Default) {
            this._disposed = false;
            this._settings = settings.Clone();
            this._canPlayWires = [];
            
            if (source instanceof HTMLAudioElement) {
                this._audio = source;
            }
            else {
                this._audio = <HTMLAudioElement>document.createElement("audio");
                this.SetAudioSource(source);
            }

            this.ApplySettings();

            this._onComplete = new EventHandler1<Event>();
        }

        /**
        * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Event> {
            return this._onComplete;
        }

        /**
        * Gets or sets the audio clip volume.
        */
        public get Volume(): number {
            return this._settings.Volume;
        }
        public set Volume(percent: number) {
            this._settings.Volume = percent;
            this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
        }

        /**
        * Determines if the AudioClip is currently playing.
        */
        public IsPlaying(): boolean {
            return !this._audio.paused;
        }

        /**
        * Determines if the AudioClip has completed.
        */
        public IsComplete(): boolean {
            return this._audio.ended;
        }

        /**
        * Plays the current audio clip.
        */
        public Play(): void {
            var wire: () => void;

            if (this._audio.readyState === <any>0) {
                wire = () => {
                    this._audio.play();
                };
                this._canPlayWires.push(wire);
                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.play();
            }
        }

        /**
        * Pauses the current audio clip.
        */
        public Pause(): void {
            this._audio.pause();
        }

        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
        public Seek(time: number): void {
            var wire: () => void;

            if (this._audio.readyState === <any>0) {
                wire = () => {
                    this._audio.currentTime = time;
                };

                this._canPlayWires.push(wire);

                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.currentTime = time;
            }
        }

        /**
        * Stops the current audio clip and seeks back to time 0.
        */
        public Stop(): void {
            this.Seek(0);
            this._audio.pause();
        }

        /**
        * Unbinds all events and nulls out the settings and audio component to allow for garbage collection.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._onComplete.Dispose();
                for (var i = 0; i < this._canPlayWires.length; i++) {
                    this._audio.removeEventListener("canplay", this._canPlayWires[i], true);
                }

                this._audio.removeEventListener("ended", this._endedWire, true);
                this._audio = null;
                this._settings = null;                
            }
            else {
                throw new Error("Cannot dispose AudioClip more than once.");
            }
        }

        private SetAudioSource(source: any): void {
            var sourceHolder: HTMLSourceElement,
                sourceType: string;

            // If we've passed in a list of sources
            if (!(source instanceof Array)) {
                source = [source];
            }

            for (var i = 0; i < source.length; i++) {
                sourceHolder = < HTMLSourceElement > document.createElement("source");
                sourceHolder.src = source[i];

                sourceType = supportedAudioTypes[source[i].split('.').pop()];

                if (typeof sourceType !== "undefined") {
                    sourceHolder.type = sourceType;
                }

                this._audio.appendChild(sourceHolder);
            }
        }

        private ApplySettings(): void {
            this._audio.loop = this._settings.Repeat;
            this._audio.autoplay = this._settings.AutoPlay;
            this._audio.preload = this._settings.Preload;
            this.Volume = this._settings.Volume;

            this._endedWire = (e: Event) => {
                this.OnComplete.Trigger(e);
            };

            this._audio.addEventListener("ended", this._endedWire, true);
        }

    }
}