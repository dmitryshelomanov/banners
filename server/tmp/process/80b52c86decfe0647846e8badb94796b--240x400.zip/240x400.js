(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];


lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.kn = function() {
	this.initialize(img.kn);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,129);


(lib.pic2 = function() {
	this.initialize(img.pic2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,400);


(lib.pic4 = function() {
	this.initialize(img.pic4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,400);


(lib.pic5 = function() {
	this.initialize(img.pic5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,400);


(lib.te = function() {
	this.initialize(img.te);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,163,79);


(lib.tuman = function() {
	this.initialize(img.tuman);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,164);


(lib.txt3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AoPBMQgQgFgNgNQgMgLgGgQQgGgPAAgPQAAgPAGgRQAGgPAMgMQANgLAQgGQAQgGASAAQARAAAQAGQARAGALALQANAMAGAPQAGARAAAPQAAAPgGAPQgGAQgNALQgLANgRAFQgQAGgRAAQgSAAgQgGgAn/gmQgIADgGAGQgGAGgEAIQgDAJAAAHQAAAKAFAIQADAHAFAEQAFAFAIAEQAIAEALAAQAKAAAIgEQAHgEAGgFQAFgGAEgHQADgHABgJQgBgKgDgHQgEgIgFgFQgGgGgJgDQgIgDgIgBQgJABgJADgAmGBQIgHgBIAAgmIAEABIAFABIAIgCIAGgDIADgEQACgDACgGQABgHAAgKIAAhWIB5AAIAACdIgpAAIAAh6IgoAAIAAA4IAAASQgBAJgEAJQgEALgHAHQgGAHgJADQgJAEgMAAIgMgBgAKEBPIAAh6IghAAIAAgjIBsAAIAAAjIgiAAIAAB6gAH/BPIAAidIBZAAIAAAjIgwAAIAAAbIAuAAIAAAhIguAAIAAAbIAwAAIAAAjgAG1BPIAAhAIg7AAIAABAIgpAAIAAidIApAAIAAA8IA7AAIAAg8IApAAIAACdgACoBPIAAidIBZAAIAAAjIgwAAIAAAbIAtAAIAAAhIgtAAIAAAbIAwAAIAAAjgAhCBPIAAidIApAAIAAB6IAmAAIAAh6IApAAIAAB6IAoAAIAAh6IAoAAIAACdgAjUBPIAAidIApAAIAAA+IAUAAIAOABQAIABAIADQAJACAHAIQAIAHADAJQACAJAAAHQAAALgEAIQgDAJgFAFQgHAGgJAEIgRAEIgRABgAirAvIAQAAIAIAAQAFgBAEgDIADgGIABgGQAAgFgBgDQgBgCgCgCIgIgEIgJgBIgQAAgArOBPIAAidIBmAAIAAAjIg9AAIAAAbIAQAAQAPAAANADQANAEAJAJQAGAEACAJQAEAIAAAKQAAAJgEAJQgCAJgHAHQgJAJgOACQgNADgOAAgAqlAvIAOAAIAJgBQAGAAADgFQACgBABgDIABgHQAAgEgBgDIgEgEQgDgDgFgBIgJgBIgOAAg");
	this.shape.setTransform(12.4,6.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-1.9,143.8,16.4);


(lib.txt2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D23125").s().p("AG3BSQgRgHgNgNQgOgMgGgRQgHgQAAgRQAAgQAHgQQAGgRAOgOQANgMARgGQASgGATAAQATAAAQAGQASAGANAMQAOAOAGARQAGAQAAAQQAAARgGAQQgGARgOAMQgNANgSAHQgQAGgTAAQgTAAgSgGgAHJgpQgJACgGAIQgIAGgCAJQgEAIAAAJQAAALAEAIQAFAHAFAFQAFAGAJAEQAJADALAAQAKAAAJgDQAJgEAFgGQAGgGAEgIQAEgJAAgJQAAgKgEgIQgEgIgGgFQgGgHgJgDQgJgFgJAAQgKAAgJAFgAAzBSQgSgHgNgNQgOgMgGgRQgFgQAAgRQAAgQAFgQQAGgRAOgOQANgMASgGQARgGATAAQATAAARAGQASAGAMAMQAOAOAGARQAHAQAAAQQAAARgHAQQgGARgOAMQgMANgSAHQgRAGgTAAQgTAAgRgGgABEgpQgIACgHAIQgHAGgDAJQgEAIAAAJQAAALAEAIQAFAHAFAFQAFAGAJAEQAJADALAAQALAAAIgDQAJgEAFgGQAHgGADgIQAEgJAAgJQAAgKgEgIQgDgIgHgFQgGgHgJgDQgJgFgJAAQgKAAgJAFgAjcBQQgQgIgLgKQgNgMgGgRQgGgPAAgRQAAgSAHgPQAHgRALgLQALgMARgHQAQgHAVgBQAFAAAKACQAKABAOAGIAAA1QgIgJgHgEIgNgFIgKgBQgKAAgIADQgIACgFAHQgHAHgEAJQgEAIAAAJQAAAIAEAJQAEAJAGAGQAFAFAJAEQAIADAKAAQACABAHgBQAGgCAIgDQAHgEAIgJIAAA0IgWAHIgQACQgXAAgQgIgADHBVIgJgBIAAgpIAFACIAFAAQAGAAADgCQAEgBACgCIAEgEQADgEABgGQABgHAAgLIAAhcICCAAIAACoIgsAAIAAiDIgrAAIAAA8QABAJgBAKQgBAKgEALQgEALgJAHQgGAIgJAEQgKADgOAAIgLgBgAJUBUIAAioIBCAAQAJAAAKACQAJACAJAKIAHAMQADAIAAALIgBAKIgEAKIgFAJIgJAFQAHAAAHAEIAKAGQAFAEACAIQAEAIAAAJQgBAOgDAHQgDAJgFADQgIAIgLAEQgMAFgPAAgAKAAyIAJAAQAKAAAHgBQAHgBAEgFIADgEIABgHIgBgIIgEgEQgEgFgHAAIgQgBIgJAAgAKAgSIAIAAIAJAAQAEgBAEgDIADgGIAAgGIAAgGIgDgGIgHgDQgEgCgGABIgIAAgAhgBUIAAiDIglAAIAAglIB0AAIAAAlIgkAAIAACDgAmFBUIAAioIBgAAIAAAlIgzAAIAAAcIAxAAIAAAlIgxAAIAAAeIAzAAIAAAkgAodBUIAAioIBGAAQALAAAMADQAKADAKAKQAKAJADAKQADALgBAKQABAKgDAMQgDAJgJAKQgKAKgLADQgMADgKAAIgaAAIAAA3gAnwgGIAOAAIAIgBIALgEQADgEACgFIAAgIIAAgIIgFgHQgEgDgFgCIgKAAIgOAAgApsBUIAAiDIg8AAIAACDIgsAAIAAioICUAAIAACog");
	this.shape.setTransform(23.1,2.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.4,-6.2,145.1,17.6);


(lib.txt1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D23125").s().p("AgPBjIAAgkIh5AAIAAieIAqAAIAAB8IA3AAIAAh8IApAAIAAB8IATAAIAABGgAL1BDIgIgGIgFgHQgCgFgBgGQABgGACgFIAFgHQAEgEAEgCIAJgBQAEAAAFACQAFABAEAFQADADABAEQACAEAAAGQAAAGgCAEQgBAEgDAEQgEADgFACQgFACgEAAIgJgBgApBA9QgQgGgNgMQgNgMgGgQQgFgPgBgQQABgPAFgQQAGgPANgOQANgKAQgGQARgGARAAQATAAAPAGQARAGAMAKQANAOAGAPQAGAQAAAPQAAAQgGAPQgGAQgNAMQgMAMgRAGQgPAGgTAAQgRAAgRgGgAowg3QgJACgFAHQgIAGgCAJQgDAIgBAIQABALADAGQAEAHAGAFQAEAGAIAEQAJACAKAAQALAAAHgCQAJgEAFgGQAGgGAEgHQADgHAAgKQAAgJgDgIQgEgIgGgFQgGgGgJgDQgIgEgJAAQgJAAgIAEgAKfA/IAAieIAqAAIAACegAIYA/IAAieIAqAAIAAA+IAUAAIAPAAQAIACAIADQAJADAGAHQAJAIACAKQADAHAAAHQAAAJgDAIQgCAKgHAHQgHAHgIAEIgSADIgRABgAJCAfIAQAAIAJAAQAEgBAFgEQABgBACgEIABgHIgBgHIgDgFQgFgCgEAAIgJgBIgQAAgAGIA/IAAieIBDAAQAKgBALAEQAJACAKAKQAJAIADAKQADAKAAAKQAAAJgDALQgDAKgIAJQgKAJgKACQgLADgJAAIgZAAIAAA0gAGzgWIAMAAIAJgBIAJgEQAEgDABgFIAAgHIAAgHQgBgEgEgDQgDgEgFgBIgKAAIgMAAgAESA/IAAieIBdAAIAAAjIgzAAIAAB7gADHA/IAAhjIg8BjIgqAAIAAieIAqAAIAABkIA8hkIAqAAIAACegAj9A/IAAieIBbAAIAAAjIgxAAIAAAaIAuAAIAAAjIguAAIAAAcIAxAAIAAAigAlHA/IAAg/Ig8AAIAAA/IgpAAIAAieIApAAIAAA7IA8AAIAAg7IApAAIAACegAq2A/Ig2hEIAABEIgpAAIAAieIApAAIAABCIAyhCIA0AAIg/BMIBEBSg");
	this.shape.setTransform(-16.5,1.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
	this.timeline.onComplete = function () { 
		alert()
	}
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-8.3,158.1,19.9);


(lib.tuman_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.tuman();
	this.instance.parent = this;
	this.instance.setTransform(-200,-82);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200,-82,400,164);


(lib.top = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AzACaIAAkzMAmBAAAIAAEzg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.7,-15.3,243.4,30.7);


(lib.te_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.te();
	this.instance.parent = this;
	this.instance.setTransform(-81.5,-39.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.5,-39.5,163,79);


(lib.pic2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.pic2();
	this.instance.parent = this;
	this.instance.setTransform(-120,-200);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120,-200,240,400);


(lib._new = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ADngfIAKAAIAAA+IA/hBIAABUIgLAAIAAg+Ig+BBgAhugfIAKAAIAAA+IA/hBIAABUIgKAAIAAg+Ig/BBgAAiAvQgKgHgGgJQgGgKAAgLQAAgLAGgLQAGgJALgGQAKgFAOAAIAHAAIAJACIAKAGIAAALIgFgEIgGgEIgIgBIgIgBQgKgBgIAFQgJAEgEAJQgFAGAAAKQAAAIADAGQAEAHAFAEQAFAEAHACQAGACAGAAIAJgBIAIgDIAHgEIADgCIAAAKQgHAGgHABIgNACQgNAAgLgFgAlvAvQgKgGgGgKQgHgJAAgNQAAgLAHgKQAGgKAKgFQALgFANAAQANAAALAFQALAFAGAKQAGAKAAALQAAANgGAJQgGAKgLAGQgLAFgNAAQgNAAgLgFgAlpgTQgJAEgEAJQgFAGAAAJQAAAKAFAHQAEAIAJAFQAIAEAKAAQALAAAIgEQAIgFAFgIQAFgHAAgKQAAgJgFgGQgFgJgIgEQgIgFgLABQgKgBgIAFgAGVAzIgEgBIAAgJIADABIACAAIAFgBIAEgCQADgCABgEIABgIIAAgIIAAgwIA3AAIAABRIgKAAIAAhIIgjAAIAAArIAAAIIgCAKQgCAEgEAEIgHACQgEACgEAAIgCAAgAGDAyIgKgWIgnAAIgLAWIgLAAIAqhUIAoBUgAF1ATIgQggIgPAgIAfAAgACpAyIAAhRIAQAAQAHAAAGABQAGACAEADQAFAEACAFIABAJQAAAGgDAEQgCAFgHAEQgGACgKAAIgJAAIAAAkgACzAGIAIAAQAJAAAFgDQAFgEAAgHQAAgEgCgDIgFgFIgHgCIgGAAIgHAAgABoAyIAAhRIAvAAIAAAJIglAAIAAAYIAkAAIAAAIIgkAAIAAAfIAlAAIAAAJgAiPAyIAAhRIAKAAIAABRgAjOAyIAAhRIAKAAIAAAiIAMAAIAKAAIAKADQAFACADAFQADAFAAAHQAAAIgDAGQgEAGgHADQgGACgJAAgAjEApIALAAIAGAAIAFgBIAGgCIADgFQACgEAAgEIgCgGQgBgDgEgDIgHgCIgJAAIgKAAgAkVAyIAAhRIAQAAIAGAAIAHACQAEABAEADIADADIADAFQACADAAAFIgBAFIgDAFQgBADgEACQAGACAEAEQADADACAEQACAEAAAFQAAAFgDAFQgDAFgDACQgGADgGABIgKABgAkLApIALAAIAJAAQAEAAADgCQADgDABgDQACgDAAgDQAAgFgDgDIgFgEIgGgCIgJAAIgKAAgAkLAEIAHAAIAFAAIAGgBQADgCACgCQACgCAAgGQAAgEgDgDIgFgFIgGgBIgDAAIgIAAgAmiAyIAAgoIguAAIAAAoIgKAAIAAhRIAKAAIAAAhIAuAAIAAghIAKAAIAABRgAhTgnIgHgDIgDgFIgCgCIAKgDQABADADABIAEACIADAAIADAAIAFgCQADgBABgDIAJADIgBACIgEAFIgGADQgEACgGAAQgFAAgEgCg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1))

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.5,-5.3,95.1,10.7);


(lib.logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AggI4QhHhGAAhkIAAm5QCHAqBqASIAAJtQhkAAhGhGgADUjpQACgnAHgoQAKhJAag6QAnhXBIgyQBJgzBigGIHXAAQBjAGBIAzQBJAyAmBXQAaA7ALBNIAEAYIgBAAQAFAvAABCIAAANQgDBkgqBTQgrBUhOA+QhbBGiCAhQhyAeiJAAQiJAAhtgFIAABhQAABjhGBHQhHBGhkAAgAHklZQgfAzAABRIAAEQQB+AOCEgIQCJgKBdggQA1gTAdgWQAmgdARglQATglgBgxQAAhEgGgtQgMg0gcgdQgbgfgmgDImjAAQgzADgfAygAsMJ9QhPAAhAgtQhBgtgahKIlCsqIAAkcQBBAIBFBFQBABAAaBHIFCMRQAGATATACIAQAAQATgCAHgTIE+sGQAahJBChDQBHhLBBgIIAAEcIlCMqQgbBKhAAtQhAAthPAAgAhnl9QAAhjBHhHQBGhGBjAAIABAAIAAC5QAABkhHBGQhGBHhkAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133.7,-63.8,267.5,127.7);


(lib.kn_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.kn();
	this.instance.parent = this;
	this.instance.setTransform(-15,-64.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15,-64.5,30,129);


(lib.btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CA2F24").ss(1,1,1).p("ArYiZIWxAAIAAEzI2xAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CA2F24").s().p("ArXCaIAAkzIWvAAIAAEzg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.8,-16.4,147.7,32.8);


(lib.bot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#000000","rgba(0,0,0,0)"],[0.467,0.706],0,193.6,0,-193.8).s().p("AzgQsMAAAghXMAnBAAAMAAAAhXg");
	this.shape.setTransform(0,-27.3,1,1.256);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-161.5,249.8,268.3);


(lib.Анимация18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AnEgMIgHAwIgIAAIAMhKIAbA7IAbg7IALBKIgHAAIgIgwIgXAzgABzAlQgKAAgIgFQgIgFgFgIQgEgIAAgKQAAgKAEgIQAFgIAIgFQAJgFAKAAIAGAAIAHADQADABAEADIAAAKIgDgEIgFgDIgGgCIgHgBQgIABgGAEQgHADgDAHQgEAGAAAIQAAAHADAFQADAGAEADQAEAEAFACIAJABIAIAAIAGgDIAEgDIADgDIAAAKQgFAEgGACIgHABIgDAAgAn0AlQgKAAgJgFQgIgFgFgIQgEgIgBgKQABgKAEgIQAFgIAIgFQAJgFALAAIAFAAIAHADQAEABAEADIAAAKIgEgEIgFgDIgGgCIgGgBQgJABgFAEQgHADgDAHQgFAGAAAIQAAAHAEAFQACAGAEADQAFAEAEACIAKABIAHAAIAGgDIAFgDIADgDIAAAKQgFAEgGACIgIABIgCAAgAHjAgQgJgFgFgIQgFgIABgLQgBgJAFgIQAFgJAJgEQAIgFAKAAQAKAAAJAFQAHAEAFAJQAGAIAAAJQAAALgGAIQgEAIgIAFQgIAFgLAAQgKAAgIgFgAHmgXQgGADgEAHQgDAGAAAHQAAAJADAGQAEAHAGAEQAHADAIAAQAJAAAFgDQAHgEAEgHQAEgGAAgJQAAgHgEgGQgEgHgHgDQgFgEgJgBQgIABgHAEgAlnAgQgIgFgFgIQgFgIAAgLQAAgJAFgIQAFgJAIgEQAIgFAKAAQALAAAHAFQAJAEAFAJQAFAIAAAJQAAALgFAIQgFAIgIAFQgIAFgLAAQgKAAgIgFgAljgXQgGADgEAHQgEAGAAAHQAAAJAEAGQAEAHAGAEQAHADAHAAQAIAAAHgDQAHgEADgHQAEgGAAgJQAAgHgEgGQgDgHgHgDQgHgEgIgBQgHABgHAEgADYAkIgDAAIAAgIIACABIACAAIAEgBIACgCQADgCABgDIABgGIAAgIIAAgoIAqAAIAABFIgIAAIAAg+IgaAAIAAAkIgBAIQAAADgCAEQgBAEgCADQgDACgEABIgGABIgBAAgAG6AkIAAgjIgkAAIAAAjIgIAAIAAhFIAIAAIAAAcIAkAAIAAgcIAIAAIAABFgAFsAkIAAg+IgRAAIAAgHIApAAIAAAHIgRAAIAAA+gAFPAkIgHgUIgfAAIgIAUIgJAAIAhhJIAfBJgAFEAIIgLgbIgMAbIAXAAgADDAkIAAg+IgkAAIAAA+IgIAAIAAhFIA0AAIAABFgAAhAkIAAhFIAkAAIAAAHIgcAAIAAAUIAbAAIAAAHIgbAAIAAAbIAcAAIAAAIgAgWAkIAAhFIAiAAIAAAHIgaAAIAAAWIAKAAIAGAAQAEABADACQAFABACADQADAFgBAHQABAGgDAFQgDAEgFADQgFADgGAAgAgOAcIAJAAIAEAAIADgBIAFgCIACgFQACgCAAgDIgCgGQgBgDgDgDIgFgBIgGAAIgIAAgAhlAkIAAhFIAIAAIAAAdIAJAAIAHAAQAEABAEACQAEABACADQADAFAAAHQAAAGgDAFQgCAEgGADQgFADgGAAgAhdAcIAJAAIADAAIAFgBIAEgCIADgFIABgFIgBgGQgBgDgDgDIgGgBIgGAAIgIAAgAiJAkIAAg+IgRAAIAAgHIAqAAIAAAHIgRAAIAAA+gAjFAkIAAhFIAkAAIAAAHIgcAAIAAAUIAcAAIAAAHIgcAAIAAAbIAcAAIAAAIgAj1AkIAAhFIANAAIAKAAQAEABADADQAFAEABAEIABAIQAAAEgCAFQgCAEgFACQgFADgIAAIgHAAIAAAfgAjtgBIAGAAQAHAAAFgDQADgEAAgGQAAgEgBgDIgFgEIgEgBIgFAAIgGAAgAkYAkIAAg+IgRAAIAAgHIAqAAIAAAHIgRAAIAAA+g");
	this.shape.setTransform(-1.2,0.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,-3.1,107.5,7.8);


(lib.Анимация16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ADwgwIAMAAIAbBJIAchJIAMAAIgoBngAlFgTIgJBEIgMAAIARhnIAmBSIAmhSIAQBnIgLAAIgKhEIgiBIgACMAsQgMgGgHgMQgGgLAAgPQAAgNAHgMQAHgLALgIQAMgGAPAAIAHABIAKACQAGACAGAFIAAANIgGgFIgHgFIgIgCIgJgBQgLAAgKAFQgJAGgEAJQgGAKAAAKQAAALAEAHQADAHAGAGQAGAFAHACQAHACAHABIAKgBIAIgEIAIgEIAEgFIAAAPQgJAFgHACQgIACgGAAQgPAAgLgHgAh8AsQgLgGgHgMQgGgLgBgPQABgNAGgMQAHgLAMgIQALgGAPAAIAIABIAKACQAFACAGAFIAAANIgGgFIgHgFIgIgCIgJgBQgLAAgJAFQgJAGgFAJQgFAKAAAKQAAALADAHQAEAHAGAGQAFAFAIACQAHACAGABIAKgBIAJgEQAEgCADgCIAEgFIAAAPQgIAFgIACQgIACgGAAQgOAAgMgHgAFxAxIAAhhIASAAIANABQAHABAFAFQAFAFACAFQACAGAAAFQAAAHgDAGQgEAGgGADQgHAEgMABIgJAAIAAAqgAF8gDIAJAAQAKAAAFgFQAGgEAAgJQAAgGgCgDQgDgEgDgCIgHgCIgHAAIgIAAgAFNAxIAAhhIALAAIAABhgAAPAxIAAhhIAzAAIAAAKIgpAAIAAAdIAoAAIAAAJIgoAAIAAAnIApAAIAAAKgAgjAxIAAhXIgYAAIAAgKIA7AAIAAAKIgYAAIAABXgAjWAxIAAhhIAzAAIAAAKIgpAAIAAAdIAoAAIAAAJIgoAAIAAAnIApAAIAAAKgAmkAxIAAhhIASAAIAGAAIAIABQAEABAEADIADAFQADACABAEQACAEAAAGIgBAGQAAADgDAEQgCAEgEADQAHACAEACQAEAEACAFQACAFAAAGQAAAGgDAGQgDAGgEACQgGAFgHABIgLABgAmaAnIANAAQAFAAAEgBIAJgDIAEgGQACgEAAgEQAAgGgDgDQgCgEgDgBIgHgDIgKAAIgMAAgAmagFIAJAAIAFAAQAEgBACgCQAEgBACgDQACgEAAgGQAAgGgCgDIgGgGIgHgBIgEAAIgJAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.1,-5.5,84.2,11);


(lib.Анимация15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ADwgwIAMAAIAbBJIAchJIAMAAIgoBngAlFgTIgJBEIgMAAIARhnIAmBSIAmhSIAQBnIgLAAIgKhEIgiBIgACMAsQgMgGgHgMQgGgLAAgPQAAgNAHgMQAHgLALgIQAMgGAPAAIAHABIAKACQAGACAGAFIAAANIgGgFIgHgFIgIgCIgJgBQgLAAgKAFQgJAGgEAJQgGAKAAAKQAAALAEAHQADAHAGAGQAGAFAHACQAHACAHABIAKgBIAIgEIAIgEIAEgFIAAAPQgJAFgHACQgIACgGAAQgPAAgLgHgAh8AsQgLgGgHgMQgGgLgBgPQABgNAGgMQAHgLAMgIQALgGAPAAIAIABIAKACQAFACAGAFIAAANIgGgFIgHgFIgIgCIgJgBQgLAAgJAFQgJAGgFAJQgFAKAAAKQAAALADAHQAEAHAGAGQAFAFAIACQAHACAGABIAKgBIAJgEQAEgCADgCIAEgFIAAAPQgIAFgIACQgIACgGAAQgOAAgMgHgAFxAxIAAhhIASAAIANABQAHABAFAFQAFAFACAFQACAGAAAFQAAAHgDAGQgEAGgGADQgHAEgMABIgJAAIAAAqgAF8gDIAJAAQAKAAAFgFQAGgEAAgJQAAgGgCgDQgDgEgDgCIgHgCIgHAAIgIAAgAFNAxIAAhhIALAAIAABhgAAPAxIAAhhIAzAAIAAAKIgpAAIAAAdIAoAAIAAAJIgoAAIAAAnIApAAIAAAKgAgjAxIAAhXIgYAAIAAgKIA7AAIAAAKIgYAAIAABXgAjWAxIAAhhIAzAAIAAAKIgpAAIAAAdIAoAAIAAAJIgoAAIAAAnIApAAIAAAKgAmkAxIAAhhIASAAIAGAAIAIABQAEABAEADIADAFQADACABAEQACAEAAAGIgBAGQAAADgDAEQgCAEgEADQAHACAEACQAEAEACAFQACAFAAAGQAAAGgDAGQgDAGgEACQgGAFgHABIgLABgAmaAnIANAAQAFAAAEgBIAJgDIAEgGQACgEAAgEQAAgGgDgDQgCgEgDgBIgHgDIgKAAIgMAAgAmagFIAJAAIAFAAQAEgBACgCQAEgBACgDQACgEAAgGQAAgGgCgDIgGgGIgHgBIgEAAIgJAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.1,-5.5,84.2,11);


(lib.Анимация14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AHkgSIgKBEIgLAAIARhnIAmBSIAmhSIAPBnIgKAAIgKhEIgiBIgAhdgwIAKAAIAABLIBFhPIAABmIgKAAIAAhKIhFBOgAnEgSIgKBEIgLAAIARhnIAmBSIAmhSIAQBnIgLAAIgKhEIgiBIgAlCAtQgLgHgHgLQgGgMgBgPQABgNAGgMQAHgLALgHQAMgGAOAAQAOAAAMAGQAMAHAHALQAGAMAAANQAAAPgGAMQgHALgMAHQgLAGgPABQgOgBgMgGgAk8giQgJAGgFAJQgGAJAAAKQAAAMAGAJQAFAJAJAGQAJAFALAAQAMAAAJgFQAJgGAFgJQAFgJAAgMQAAgKgFgJQgFgJgJgGQgJgFgMAAQgLAAgJAFgAohAtQgMgHgHgLQgGgMgBgOQABgOAHgLQAGgMAMgHQAMgGAPAAIAHAAIAKADQAGACAFAEIAAAOIgFgFIgHgEIgIgDIgJgBQgLAAgKAFQgJAGgEAJQgGAJAAALQAAAKAEAIQADAHAGAFQAGAGAHACQAHACAHAAIAKgBIAIgDIAIgFIADgEIAAAOQgIAGgIACQgHACgGAAQgPgBgLgGgAGuAyIAAhiIAKAAIAABigAFpAyIAAhiIALAAIAAApIANAAIAKABQAGABAGADQAFACAEAFQADAGAAAJQAAAJgDAHQgFAHgHAEQgHADgKAAgAF0AnIAMAAIAGAAQAEAAADgBQADgBADgDIAEgFIABgJIgBgIQgCgEgFgDIgIgCIgJgBIgLAAgAEbAyIAAhiIASAAIAHABIAHABQAEABAEADIAEAEQACADABAEQACAEAAAGIgBAGQAAADgDAEQgCADgEADQAHACAFADQADAEACAFQACAFAAAFQAAAHgDAGQgDAFgEADQgGAFgGABIgLABgAElAnIAOAAIAJAAIAHgDQAEgDABgDQACgEAAgEQAAgGgDgEQgDgDgDgCIgGgCIgKgBIgMAAgAElgEIAJAAIAGgBIAFgCQAEgCACgDQADgDgBgGQABgGgDgDQgDgEgDgBIgGgCIgFAAIgJAAgADXAyIAAhiIASAAIAOABQAGACAFAEQAGAFABAGQADAGgBAEQAAAIgDAGQgDAGgHADQgGAEgMAAIgKAAIAAArgADigCIAKAAQAJAAAFgFQAGgEAAgJQAAgGgCgEIgGgFIgHgCIgGAAIgJAAgACQAyIAAhiIAzAAIAAALIgoAAIAAAdIAnAAIAAAJIgnAAIAAAmIAoAAIAAALgABrAyIAAhXIgyAAIAABXIgLAAIAAhiIBJAAIAABigAigAyIAAhiIASAAIANABQAGACAFAEQAGAFABAGQACAGAAAEQAAAIgDAGQgDAGgHADQgGAEgMAAIgKAAIAAArgAiWgCIAKAAQAKAAAEgFQAGgEAAgJQAAgGgCgEIgGgFIgHgCIgGAAIgJAAgAjTAyIAAhXIgYAAIAAgLIA8AAIAAALIgZAAIAABXg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,-5.4,114.3,10.9);


(lib.Анимация13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AHkgSIgKBEIgLAAIARhnIAmBSIAmhSIAPBnIgKAAIgKhEIgiBIgAhdgwIAKAAIAABLIBFhPIAABmIgKAAIAAhKIhFBOgAnEgSIgKBEIgLAAIARhnIAmBSIAmhSIAQBnIgLAAIgKhEIgiBIgAlCAtQgLgHgHgLQgGgMgBgPQABgNAGgMQAHgLALgHQAMgGAOAAQAOAAAMAGQAMAHAHALQAGAMAAANQAAAPgGAMQgHALgMAHQgLAGgPABQgOgBgMgGgAk8giQgJAGgFAJQgGAJAAAKQAAAMAGAJQAFAJAJAGQAJAFALAAQAMAAAJgFQAJgGAFgJQAFgJAAgMQAAgKgFgJQgFgJgJgGQgJgFgMAAQgLAAgJAFgAohAtQgMgHgHgLQgGgMgBgOQABgOAHgLQAGgMAMgHQAMgGAPAAIAHAAIAKADQAGACAFAEIAAAOIgFgFIgHgEIgIgDIgJgBQgLAAgKAFQgJAGgEAJQgGAJAAALQAAAKAEAIQADAHAGAFQAGAGAHACQAHACAHAAIAKgBIAIgDIAIgFIADgEIAAAOQgIAGgIACQgHACgGAAQgPgBgLgGgAGuAyIAAhiIAKAAIAABigAFpAyIAAhiIALAAIAAApIANAAIAKABQAGABAGADQAFACAEAFQADAGAAAJQAAAJgDAHQgFAHgHAEQgHADgKAAgAF0AnIAMAAIAGAAQAEAAADgBQADgBADgDIAEgFIABgJIgBgIQgCgEgFgDIgIgCIgJgBIgLAAgAEbAyIAAhiIASAAIAHABIAHABQAEABAEADIAEAEQACADABAEQACAEAAAGIgBAGQAAADgDAEQgCADgEADQAHACAFADQADAEACAFQACAFAAAFQAAAHgDAGQgDAFgEADQgGAFgGABIgLABgAElAnIAOAAIAJAAIAHgDQAEgDABgDQACgEAAgEQAAgGgDgEQgDgDgDgCIgGgCIgKgBIgMAAgAElgEIAJAAIAGgBIAFgCQAEgCACgDQADgDgBgGQABgGgDgDQgDgEgDgBIgGgCIgFAAIgJAAgADXAyIAAhiIASAAIAOABQAGACAFAEQAGAFABAGQADAGgBAEQAAAIgDAGQgDAGgHADQgGAEgMAAIgKAAIAAArgADigCIAKAAQAJAAAFgFQAGgEAAgJQAAgGgCgEIgGgFIgHgCIgGAAIgJAAgACQAyIAAhiIAzAAIAAALIgoAAIAAAdIAnAAIAAAJIgnAAIAAAmIAoAAIAAALgABrAyIAAhXIgyAAIAABXIgLAAIAAhiIBJAAIAABigAigAyIAAhiIASAAIANABQAGACAFAEQAGAFABAGQACAGAAAEQAAAIgDAGQgDAGgHADQgGAEgMAAIgKAAIAAArgAiWgCIAKAAQAKAAAEgFQAGgEAAgJQAAgGgCgEIgGgFIgHgCIgGAAIgJAAgAjTAyIAAhXIgYAAIAAgLIA8AAIAAALIgZAAIAABXg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.1,-5.4,114.3,10.9);


(lib.tt4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 1 - копия
	this.instance = new lib.Анимация13("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0,-15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib.Анимация14("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},14).to({state:[{t:this.instance_1}]},29).wait(11));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).to({_off:true,y:-8,alpha:1},29,cjs.Ease.get(1)).wait(11));

	// Слой 1
	this.instance_2 = new lib.Анимация15("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(0.7,0.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.instance_3 = new lib.Анимация16("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(0.7,7.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},24).to({state:[{t:this.instance_3}]},29).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({_off:true,y:7.9,alpha:1},29,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.t5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// >
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AAAggIABAdIgBAkg");
	this.shape.setTransform(50.3,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.067)").s().p("AAAAfIAAgBIAAg+IABAdIAAADIgBAeIAAADg");
	this.shape_1.setTransform(50.7,1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.133)").s().p("AgBAcIABgIIgBAJgAABAAIAAgGIgBgWIACAVIAAADIgCAUg");
	this.shape_2.setTransform(51.1,1.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.196)").s().p("AgCAgIAEgeIAAgEIABACIgBACIAAACIgDAdgAgBgYIgBgIIADAWg");
	this.shape_3.setTransform(51.5,1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.255)").s().p("AgCAgIABgIIAEgYIAAAEIgFAdgAADgDIgEgUIgBgJIAFAeIAAACg");
	this.shape_4.setTransform(51.8,1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.314)").s().p("AgDAgIAAgIIAHgYIgBgDIgGgUIAAgJIAHAeIAAAGIgHAdg");
	this.shape_5.setTransform(52.2,1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.373)").s().p("AgEAgIABgIIAHgYIgBgDIgGgUIgBgJIAJAeIAAAGIgJAdg");
	this.shape_6.setTransform(52.5,1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.424)").s().p("AgEAYIAJgYIgJgXIgBgJIALAeIAAAGIgLAdg");
	this.shape_7.setTransform(52.9,1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0.475)").s().p("AgFAgIAAgIIAKgYIgBgDIgJgUIAAgJIALAeIAAAGIgLAdg");
	this.shape_8.setTransform(53.2,1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0.525)").s().p("AgGAgIAAgIIALgXIgBgEIgKgUIAAgJIANAeIAAAGIgNAdg");
	this.shape_9.setTransform(53.5,1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.573)").s().p("AgHAgIABgIIAMgXIgMgYIgBgJIAPAeIAAAGIgOAdg");
	this.shape_10.setTransform(53.8,1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.616)").s().p("AgHAgIAAgIIANgXIgCgEIgLgUIAAgJIAPAeIAAAGIgPAdg");
	this.shape_11.setTransform(54,1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,255,0.655)").s().p("AgIAhIABgJIAOgXIgDgEIgLgUIgBgJIARAdIAAAHIgQAdg");
	this.shape_12.setTransform(54.3,1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.694)").s().p("AgIAhIAAgJIAOgXIgCgEIgMgUIAAgJIASAdIAAAHIgRAdg");
	this.shape_13.setTransform(54.6,1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0.733)").s().p("AgJAhIAAgJIAQgXIgCgEIgOgTIAAgKIATAdIAAAHIgSAdg");
	this.shape_14.setTransform(54.8,1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.769)").s().p("AgJAXIAQgWIgDgEIgNgTIgBgKIAVAdIAAAHIgTAcIgCABg");
	this.shape_15.setTransform(55,1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.8)").s().p("AgJAXIAQgWIgCgEIgOgTIgBgKIAVAdIAAAHIgUAcIgBABg");
	this.shape_16.setTransform(55.2,1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.827)").s().p("AgKAXIARgWIgCgEIgPgTIAAgKIAVAdIAAAHIgUAcIgBABg");
	this.shape_17.setTransform(55.4,1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,255,0.855)").s().p("AgLAXIATgWIgDgEIgQgTIAAgKIAXAdIAAAHIgVAcIgCABg");
	this.shape_18.setTransform(55.6,1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,255,0.882)").s().p("AgLAXIATgXIgTgWIAAgKIAXAdIAAAHIgWAcIgBABg");
	this.shape_19.setTransform(55.7,1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.902)").s().p("AgLAXIATgXIgDgDIgQgTIAAgKIAXAdIAAAHIgWAcIgBABg");
	this.shape_20.setTransform(55.9,1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,255,0.925)").s().p("AgLAXIATgXIgDgDIgQgTIAAgKIAXAdIAAAHIgXAcIAAABg");
	this.shape_21.setTransform(56,1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,255,0.941)").s().p("AgMAXIAUgXIgDgDIgRgTIAAgKIAZAdIAAAHIgYAcIgBABg");
	this.shape_22.setTransform(56.1,1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,255,255,0.957)").s().p("AgMAXIAUgXIgDgDIgRgTIAAgKIAZAdIAAAHIgYAcIgBABg");
	this.shape_23.setTransform(56.2,1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,255,0.969)").s().p("AgMAXIAUgXIgDgDIgRgTIAAgKIAZAdIAAAHIgZAdg");
	this.shape_24.setTransform(56.3,1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,255,0.98)").s().p("AgMAXIAUgXIgDgDIgRgTIAAgKIAZAdIAAAHIgZAdg");
	this.shape_25.setTransform(56.3,1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,255,255,0.988)").s().p("AgMAXIAVgXIgDgDIgSgTIAAgKIAZAdIAAAHIgZAdg");
	this.shape_26.setTransform(56.4,1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,255,0.996)").s().p("AgMAXIAUgXIgDgDIgRgTIAAgKIAZAdIAAAHIgZAdg");
	this.shape_27.setTransform(56.4,1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgNAXIAWgXIgEgDIgSgTIAAgKIAaAdIAAAHIgaAdg");
	this.shape_28.setTransform(56.5,1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgNAXIAWgXIgWgWIAAgKIAaAdIAAAHIgaAdg");
	this.shape_29.setTransform(56.5,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},29).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).wait(1));

	// Слой 1
	this.instance = new lib.Анимация18("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(-0.5,0.3);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},58).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,-2.8,107.5,7.8);


(lib.t3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// new
	this.instance = new lib._new("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(32.9,-55.4,1.824,1.824);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({scaleX:1,scaleY:1,y:-43.4,alpha:1},50,cjs.Ease.get(1)).wait(13));

	// kn
	this.instance_1 = new lib.kn_1("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-91.4,-37.2,1,1,20.3);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).to({rotation:0,x:-85,y:-9.5,alpha:1},39,cjs.Ease.get(1)).wait(24));

	// te
	this.instance_2 = new lib.te_1("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(-8,-3.9,1.264,1.264,0,0,0,-0.1,-0.1);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0,y:0,alpha:1},39,cjs.Ease.get(1)).wait(36));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.9,-53.7,206.1,99.9);


(lib.t2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 1
	this.instance = new lib.txt1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0,-4.6);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-24.1,alpha:1,loop:false},39,cjs.Ease.get(1)).wait(56).to({startPosition:0},0).to({y:-4.6,alpha:0},24,cjs.Ease.get(-1)).to({_off:true},1).wait(255));

	// 2
	this.instance_1 = new lib.txt2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-46.1,19.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10).to({_off:false},0).to({y:0,alpha:1},39,cjs.Ease.get(1)).wait(33).to({startPosition:0},0).to({y:19.5,alpha:0},29,cjs.Ease.get(-1)).to({_off:true},1).wait(263));

	// 3
	this.instance_2 = new lib.txt3("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(-36,43.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({y:24.1,alpha:1},39,cjs.Ease.get(1)).wait(16).to({startPosition:0},0).to({y:43.6,alpha:0},28,cjs.Ease.get(-1)).to({_off:true},1).wait(272));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-12.9,158.1,19.9);


(lib.pic5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 2
	this.instance = new lib.tuman_1();
	this.instance.parent = this;
	this.instance.setTransform(-119.8,157,1.683,1.683,-23.2,0,0,0.1,0.2);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:0.1,x:166.2,y:32.7,alpha:0},269,cjs.Ease.get(1)).wait(1));

	// Слой 1
	this.instance_1 = new lib.pic5();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-120,-200);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(270));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-483.9,-200,727.5,616.4);


(lib.pic4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой 2 - копия
	this.instance = new lib.tuman_1();
	this.instance.parent = this;
	this.instance.setTransform(-187.2,-47.9,1.683,1.683,147.1,0,0,0.1,0.2);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:0.2,regY:0.1,rotation:151.8,x:80.9,y:-239.4},269,cjs.Ease.get(1)).wait(1));

	// Слой 2
	this.instance_1 = new lib.tuman_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-119.8,157,1.683,1.683,-23.2,0,0,0.1,0.2);
	this.instance_1.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:0.1,x:166.2,y:32.7},269,cjs.Ease.get(1)).wait(1));

	// Слой 1
	this.instance_2 = new lib.pic4();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-120,-183);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(270));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-544.4,-346.4,788,762.8);


(lib.button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// t5
	this.instance = new lib.t5("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(-514.7,-78.7,1.077,1.077,0,0,0,0,-0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(419).to({_off:false},0).wait(210));

	// button
	this.instance_1 = new lib.btn();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-512.2,-86.6,1.125,1.125,0,0,0,0,-0.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(396).to({_off:false},0).to({regY:0,scaleX:1,scaleY:1,y:-77.5,alpha:1},34,cjs.Ease.get(1)).wait(199));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_628 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(628).call(this.frame_628).wait(1));
	this.timeline.onComplete = function () { 
		alert()
	}
	// 16+
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfA3QgHgDgFgGQgFgFgCgHQgDgGAAgIIABgGIADgJIAGgKIAmg1IAJAHIgZAkIAFgBIAFAAQALAAAHAEQAIAGAFAHQAFAJAAAKQAAALgFAJQgFAJgJAFQgIAFgLAAQgKAAgIgEgAgbgBQgGACgEAGQgDAGAAAHQAAAIADAHQAEAFAGAEQAGADAIAAQAHAAAGgDQAFgEAEgFQADgHAAgIQAAgHgDgGQgEgGgFgCQgGgEgIAAQgHAAgGAEgAhnA5IAAhkIgTAAIAHgMIAZAAIAABwgABQAkIAAgeIgfAAIAAgKIAfAAIAAgeIAMAAIAAAeIAfAAIAAAKIgfAAIAAAeg");
	this.shape.setTransform(-412.3,-186.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(629));

	// button_
	this.instance = new lib.button("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(10.8,1,1.02,1.02,0,0,0,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(629));

	// logo
	this.instance_1 = new lib.logo("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-592.4,-186.2,0.11,0.11);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(361).to({startPosition:0},0).wait(1).to({x:-592.3},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:-592.1,y:-186.1},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:-591.7,y:-186},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:-591.2,y:-185.9},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:-590.5,y:-185.7},0).wait(1).to({scaleX:0.12,scaleY:0.12,x:-589.6,y:-185.4},0).wait(1).to({scaleX:0.12,scaleY:0.12,x:-588.6,y:-185.1},0).wait(1).to({scaleX:0.12,scaleY:0.12,x:-587.4,y:-184.8},0).wait(1).to({scaleX:0.12,scaleY:0.12,x:-586.1,y:-184.5},0).wait(1).to({scaleX:0.13,scaleY:0.13,x:-584.6,y:-184.1},0).wait(1).to({scaleX:0.13,scaleY:0.13,x:-583,y:-183.6},0).wait(1).to({scaleX:0.13,scaleY:0.13,x:-581.3,y:-183.1},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:-579.4,y:-182.6},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:-577.4,y:-182.1},0).wait(1).to({scaleX:0.15,scaleY:0.15,x:-575.3,y:-181.5},0).wait(1).to({scaleX:0.15,scaleY:0.15,x:-573,y:-180.9},0).wait(1).to({scaleX:0.16,scaleY:0.16,x:-570.6,y:-180.2},0).wait(1).to({scaleX:0.16,scaleY:0.16,x:-568.2,y:-179.5},0).wait(1).to({scaleX:0.17,scaleY:0.17,x:-565.6,y:-178.8},0).wait(1).to({scaleX:0.17,scaleY:0.17,x:-563,y:-178.1},0).wait(1).to({scaleX:0.18,scaleY:0.18,x:-560.3,y:-177.3},0).wait(1).to({scaleX:0.19,scaleY:0.19,x:-557.5,y:-176.6},0).wait(1).to({scaleX:0.19,scaleY:0.19,x:-554.7,y:-175.8},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:-551.9,y:-175},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:-549,y:-174.2},0).wait(1).to({scaleX:0.21,scaleY:0.21,x:-546.2,y:-173.5},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:-543.4,y:-172.7},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:-540.6,y:-171.9},0).wait(1).to({scaleX:0.23,scaleY:0.23,x:-537.8,y:-171.1},0).wait(1).to({scaleX:0.23,scaleY:0.23,x:-535.1,y:-170.4},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:-532.5,y:-169.7},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:-530,y:-169},0).wait(1).to({scaleX:0.25,scaleY:0.25,x:-527.6,y:-168.3},0).wait(1).to({scaleX:0.25,scaleY:0.25,x:-525.4,y:-167.7},0).wait(1).to({scaleX:0.26,scaleY:0.26,x:-523.2,y:-167.1},0).wait(1).to({scaleX:0.26,scaleY:0.26,x:-521.3,y:-166.6},0).wait(1).to({scaleX:0.27,scaleY:0.27,x:-519.5,y:-166.1},0).wait(1).to({scaleX:0.27,scaleY:0.27,x:-517.8,y:-165.6},0).wait(1).to({scaleX:0.27,scaleY:0.27,x:-516.4,y:-165.2},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-515.2,y:-164.9},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-514.2,y:-164.6},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-513.4,y:-164.4},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-512.8,y:-164.2},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-512.4,y:-164.1},0).wait(1).to({regY:-0.2,x:-512.3},0).wait(223));

	// t4
	this.instance_2 = new lib.tt4("synched",0,false);
	this.instance_2.parent = this;
	this.instance_2.setTransform(-592.4,-162.9,0.39,0.39,0,0,0,-0.1,-0.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(361).to({_off:false},0).wait(1).to({regX:0,regY:-3.5,scaleX:0.39,scaleY:0.39,x:-592.3,y:-164.2,startPosition:1},0).wait(1).to({scaleX:0.39,scaleY:0.39,x:-592.1,y:-164.1,startPosition:2},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-591.7,y:-163.9,startPosition:3},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-591.2,y:-163.7,startPosition:4},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-590.6,y:-163.3,startPosition:5},0).wait(1).to({scaleX:0.41,scaleY:0.41,x:-589.8,y:-163,startPosition:6},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:-588.9,y:-162.5,startPosition:7},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-587.9,y:-162,startPosition:8},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-586.6,y:-161.4,startPosition:9},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:-585.3,y:-160.7,startPosition:10},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:-583.8,y:-160,startPosition:11},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:-582.2,y:-159.2,startPosition:12},0).wait(1).to({scaleX:0.48,scaleY:0.48,x:-580.4,y:-158.3,startPosition:13},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:-578.5,y:-157.4,startPosition:14},0).wait(1).to({scaleX:0.51,scaleY:0.51,x:-576.4,y:-156.4,startPosition:15},0).wait(1).to({scaleX:0.53,scaleY:0.53,x:-574.2,y:-155.3,startPosition:16},0).wait(1).to({scaleX:0.55,scaleY:0.55,x:-571.9,y:-154.1,startPosition:17},0).wait(1).to({scaleX:0.56,scaleY:0.56,x:-569.5,y:-153,startPosition:18},0).wait(1).to({scaleX:0.58,scaleY:0.58,x:-567,y:-151.7,startPosition:19},0).wait(1).to({scaleX:0.6,scaleY:0.6,x:-564.4,y:-150.4,startPosition:20},0).wait(1).to({scaleX:0.62,scaleY:0.62,x:-561.7,y:-149.1,startPosition:21},0).wait(1).to({scaleX:0.65,scaleY:0.65,x:-559,y:-147.7,startPosition:22},0).wait(1).to({scaleX:0.67,scaleY:0.67,x:-556.1,y:-146.4,startPosition:23},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:-553.3,y:-144.9,startPosition:24},0).wait(1).to({scaleX:0.71,scaleY:0.71,x:-550.4,y:-143.5,startPosition:25},0).wait(1).to({scaleX:0.73,scaleY:0.73,x:-547.5,y:-142,startPosition:26},0).wait(1).to({scaleX:0.76,scaleY:0.76,x:-544.6,y:-140.6,startPosition:27},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:-541.7,y:-139.2,startPosition:28},0).wait(1).to({scaleX:0.8,scaleY:0.8,x:-538.9,y:-137.8,startPosition:29},0).wait(1).to({scaleX:0.82,scaleY:0.82,x:-536.1,y:-136.4,startPosition:30},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:-533.4,y:-135.1,startPosition:31},0).wait(1).to({scaleX:0.86,scaleY:0.86,x:-530.8,y:-133.8,startPosition:32},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:-528.3,y:-132.6,startPosition:33},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:-525.9,y:-131.4,startPosition:34},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:-523.7,y:-130.3,startPosition:35},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:-521.7,y:-129.3,startPosition:36},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:-519.8,y:-128.4,startPosition:37},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:-518.1,y:-127.6,startPosition:38},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:-516.7,y:-126.9,startPosition:39},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:-515.4,y:-126.2,startPosition:40},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:-514.4,y:-125.7,startPosition:41},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:-513.6,y:-125.3,startPosition:42},0).wait(1).to({scaleX:1,scaleY:1,x:-513,y:-125,startPosition:43},0).wait(1).to({scaleX:1,scaleY:1,x:-512.6,y:-124.9,startPosition:44},0).wait(1).to({regY:0,scaleX:1,scaleY:1,x:-512.7,y:-121.4,startPosition:43},0).wait(223));

	// pic5
	this.instance_3 = new lib.pic5_1("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(-512,-1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(333).to({_off:false},0).to({alpha:1,startPosition:63,loop:false},63).wait(233));

	// top
	this.instance_4 = new lib.top("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(-510.7,-187.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(629));

	// t3
	this.instance_5 = new lib.t3("synched",0,false);
	this.instance_5.parent = this;
	this.instance_5.setTransform(-503.7,125.8,1.63,1.63,0,0,0,-0.1,0.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(157).to({_off:false},0).to({regX:0,regY:0,scaleX:1,scaleY:1,x:-503.4,y:125.6,startPosition:73},68,cjs.Ease.get(1)).wait(79).to({startPosition:74},0).to({alpha:0},29).wait(296));

	// t2
	this.instance_6 = new lib.t2("synched",0,false);
	this.instance_6.parent = this;
	this.instance_6.setTransform(-512.3,143.3);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(36).to({_off:false},0).wait(593));

	// bot
	this.instance_7 = new lib.bot("synched",0);
	this.instance_7.parent = this;
	this.instance_7.setTransform(-513.1,96.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:0.512},25).wait(90).to({startPosition:0},0).to({regY:0.1,scaleY:1.5,y:43.3,alpha:0.801},59).wait(455));

	// pic4
	this.instance_8 = new lib.pic4_1("synched",0);
	this.instance_8.parent = this;
	this.instance_8.setTransform(-512,-1,1.21,1.21);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(115).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1,startPosition:111,loop:false},110).wait(79).to({startPosition:191},0).to({alpha:0,startPosition:254},63).wait(262));

	// pic2
	this.instance_9 = new lib.pic2_1("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(-512,-1,1.21,1.21);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 114, cjs.Ease.get(1)).wait(1).to({ startPosition: 0 }, 0).to({ alpha: 0 }, 26, cjs.Ease.get(1)).to({ _off: true }, 1).wait(487));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-657.2,-243,290.5,484.2);


// stage content:
(lib._240x400 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,2,0,3).p("Ayv/PMAlfAAAMAAAA+fMglfAAAg");
	this.shape.setTransform(120,200);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// main
	this.instance = new lib.main();
	this.instance.parent = this;
	this.instance.setTransform(0,198,1,1,0,0,0,-632.5,-3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(95.2,157.9,667.9,484.2);
// library properties:
lib.properties = {
	width: 240,
	height: 400,
	fps: 40,
	color: "#000000",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/kn.png", id:"kn"},
		{src:"images/pic2.jpg", id:"pic2"},
		{src:"images/pic4.jpg", id:"pic4"},
		{src:"images/pic5.jpg", id:"pic5"},
		{src:"images/te.png", id:"te"},
		{src:"images/tuman.jpg", id:"tuman"}
	],
	preloads: [],
	onComplete: function () { 
		alert()
	}
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;