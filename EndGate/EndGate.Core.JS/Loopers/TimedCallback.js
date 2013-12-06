/// <reference path="LooperCallback.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                    _super.call(this, callback);
                    this._type = "TimedCallback";

                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(EndGate._.Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
