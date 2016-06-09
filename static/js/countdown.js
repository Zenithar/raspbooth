Countdown = function() {
	_(this).bindAll('update', 'executeAnimation', 'finishAnimation');
	this.setVars.apply(this, arguments);
	this.update();
};

Countdown.prototype = {
	duration: 900,

	setVars: function(time, el, template) {
		this.max = time;
		this.time = time;
		this.el = el;
		this.template = _(template.innerHTML).template();
		this.delta = -1;
	},

	update: function() {
		var time = this.checkTime();
		this.setSizes();

		this.setupAnimation();
		_(this.executeAnimation).delay(20);
		_(this.finishAnimation).delay(this.duration * 0.9);

    if(time > 0) {
      _(this.update).delay(this.duration);
    }
	},

	checkTime: function() {
		this.time += this.delta;

		this.toggleDirection('down', 'up');

		this.nextTime = this.time + this.delta;
    return this.nextTime
	},

	toggleDirection: function(add, remove) {
		this.el.classList.add(add);
		this.el.classList.remove(remove);
	},

	setSizes: function() {
		this.currentSize = this.getSize(this.time);
		this.nextSize = this.getSize(this.nextTime);
	},

	getSize: function(time) {
		return time > 9 ? 'small' : '';
	},

	setupAnimation: function() {
		this.el.innerHTML = this.template(this);
		this.el.classList.remove('changed');
	},

	executeAnimation: function() {
		this.el.classList.add('changing');
	},

	finishAnimation: function() {
		this.el.classList.add('changed');
		this.el.classList.remove('changing');
	}
};
