/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardCommandEvent.ts" />
/// <reference path="../../Utilities/EventHandler1.ts" />

module EndGate.Input {

    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    export class KeyboardHandler {
        private static _keyboardCommandIds: number = 0;
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onDownCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onUpCommands: { [id: number]: Assets.KeyboardCommand; };

        private _onKeyPress: EventHandler1<KeyboardCommandEvent>;
        private _onKeyDown: EventHandler1<KeyboardCommandEvent>;
        private _onKeyUp: EventHandler1<KeyboardCommandEvent>;

        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this._onKeyPress = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyDown = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyUp = new EventHandler1<KeyboardCommandEvent>();

            this.Wire();
        }

        /**
        * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyPress(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyPress;
        }

        /**
        *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyDown(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyDown;
        }

        /**
        * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyUp(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyUp;
        }

        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        public OnCommandUp(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        }

        private UpdateCache(keyCommand: string, action: Function, store: { [id: number]: Assets.KeyboardCommand; }): Assets.KeyboardCommand {
            var command = new Assets.KeyboardCommand(keyCommand, action),
                commandId = KeyboardHandler._keyboardCommandIds++;

            command.OnDispose.Bind(() => {
                delete store[commandId];
            });

            store[commandId] = command;

            return command;
        }

        private Wire(): void {
            document.addEventListener("keypress", this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress), false);

            document.addEventListener("keydown", this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown), false);

            document.addEventListener("keyup", this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp), false);
        }

        private FocusingTextArea(ke: KeyboardEvent): boolean {
            var element;

            if (ke.target) {
                element = ke.target;
            }
            else if (ke.srcElement) {
                element = ke.srcElement;
            }

            if (element.nodeType === 3) {
                element = element.parentNode;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                return true;
            }

            return false;
        }

        private BuildKeyEvent(store: { [id: number]: Assets.KeyboardCommand; }, eventHandler: EventHandler1<KeyboardCommandEvent>): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: boolean = true;

                //Don't enable shortcut keys in Input, Text area fields
                if (this.FocusingTextArea(ke)) {
                    return;
                }

                keyboardCommandEvent = new KeyboardCommandEvent(ke);

                eventHandler.Trigger(keyboardCommandEvent);

                for (var keyboardCommandId in store) {
                    if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                        store[keyboardCommandId].Action();
                        ke.preventDefault();
                        propogate = false;
                    }
                }

                return propogate;
            };
        }
    }

}