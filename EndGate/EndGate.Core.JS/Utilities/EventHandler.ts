/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />

module EndGate {

    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    export class EventHandler implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<Function>;
        private _hasBindings: boolean;

        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: Function): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: Function): void {
            var foo = this._actions[i];

            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler has active bindings.
        */
        public HasBindings(): boolean {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        */
        public Trigger(): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i]();
            }
        }
    }

}