'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var UncaughtMemoryReporter =
    require('../../uncaught/structures.js').UncaughtMemoryReporter;

var EVENTS = [
    'reportConfig',
    'reportPreLogging',
    'reportLogging',
    'reportPostLogging',
    'reportPreGracefulShutdown',
    'reportShutdown',
    'reportPostGracefulShutdown',
    'markTransition'
];

module.exports = EventReporter;

function EventReporter() {
    if (!(this instanceof EventReporter)) {
        return new EventReporter();
    }

    EventEmitter.call(this);
}
util.inherits(EventReporter, EventEmitter);

EventReporter.prototype.createStateMachine =
function createStateMachine(a) {
    this.emit('createStateMachine', a);

    return UncaughtMemoryReporter.prototype.createStateMachine
        .apply(this, arguments);
};

EventReporter.prototype.getAllState = function getAllState() {
    return {};
};

EVENTS.forEach(function addMethod(ev) {
    EventReporter.prototype[ev] = function emit(a) {
        this.emit(ev, a);
    };
});
