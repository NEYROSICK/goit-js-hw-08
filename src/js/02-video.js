import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log(`localStorage's time updating with an interval of 1000ms`);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    // data is an object containing properties specific to that event
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(data.seconds)
    );
    console.log(JSON.stringify(data.seconds));
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
