/// <reference path="../Vectors/Vector2d.ts" />
/// <reference path="../../Interfaces/ICloneable.ts" />
/// <reference path="../../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    var Size2d = (function () {
        function Size2d(first, second) {
            this._type = "Size2d";
            this.Width = first || 0;
            this.Height = typeof second !== "undefined" ? second : this.Width;
        }
        Object.defineProperty(Size2d, "Zero", {
            /**
            * Returns a Size2d with all its components set to zero.
            */
            get: function () {
                return new Size2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d, "One", {
            /**
            * Returns a Size2d with all its components set to one.
            */
            get: function () {
                return new Size2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "Radius", {
            /**
            * Gets the radius that encompasses the two dimensional size of this Size2d.
            */
            get: function () {
                return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfWidth", {
            /**
            * Gets half of the Width component of this Size2d.
            */
            get: function () {
                return this.Width / 2;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfHeight", {
            /**
            * Gets half of the Height component of this Size2d.
            */
            get: function () {
                return this.Height / 2;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
        * @param action The function used to modify the Width and Height.
        */
        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };

        /**
        * Executes the action with the Width and Height of this Size2d.
        * @param action The function to pass the Width and Height components to.
        */
        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };

        Size2d.prototype.Add = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };

        Size2d.prototype.Multiply = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };

        Size2d.prototype.Subtract = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };

        Size2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };

        Size2d.prototype.Divide = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };

        Size2d.prototype.DivideFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            } else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        };

        /**
        * Returns a Size2d that is the negated version of this Size2d.
        */
        Size2d.prototype.Negate = function () {
            return new Size2d(this.Width * -1, this.Height * -1);
        };

        /**
        * Determines whether this Size2d has the same Width and Height of another Size2d.
        * @param size The Size2d to compare the current Size2d to.
        */
        Size2d.prototype.Equivalent = function (size) {
            return this.Width === size.Width && this.Height === size.Height;
        };

        /**
        * Returns a Size2d that has identical Width's and Height's as the current Size2d.
        */
        Size2d.prototype.Clone = function () {
            return new Size2d(this.Width, this.Height);
        };

        /**
        * Overridden toString method to display Size2d in the (Width, Height) format.
        */
        Size2d.prototype.toString = function () {
            return "(" + this.Width + ", " + this.Height + ")";
        };
        return Size2d;
    })();
    EndGate.Size2d = Size2d;
})(EndGate || (EndGate = {}));
