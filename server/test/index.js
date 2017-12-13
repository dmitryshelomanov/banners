const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim')
const imageminPngquant = require('imagemin-pngquant');

imagemin(['1362943008624.jpg', 'RRZEEF.png'], 'images', {
	plugins: [
		imageminJpegoptim({max: '0'}),
		imageminPngquant({quality: '50'})
	]
}).then(files => {
	console.log(files);
});