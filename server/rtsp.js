const Stream = require('node-rtsp-stream');
const streamUrl = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov";

stream = new Stream({
  name: 'foscam_stream',
  streamUrl: streamUrl,
  wsPort: 9999,
  width: 240,
  height: 160
});

// const Stream = require('node-rtsp-stream-es6')

// const options = {
//   name: 'ㅁㄴㅇㄹ',
//   url: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
//   port: 9999
// }

// stream = new Stream(options)

// stream.start()