const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let options = { mimeType: 'audio/ogg' };
        //const mediaRecorder = new MediaRecorder(stream, options, workerOptions);
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
            console.log('dataavailable');
            audioChunks.push(event.data);
        });

        const start = () => {
            console.log('start');
            audioChunks = [];
            recordingTime = 0;
            mediaRecorder.start();
            recordingTimeOut = setInterval(function () {
                recordingTime++;
                recordingTimeF = moment("2000-01-01").startOf('day').seconds(recordingTime).format('mm:ss');
                let RecDuration = document.querySelector('#rec-duration');
                if (RecDuration == null) { //se cambio de vista y se sigue grabando
                    recAudio_stop(); 
                }
                else {
                    RecDuration.textContent = recordingTimeF;
                }
            }, 1000)
        };

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener('stop', () => {
                    console.log('stop');
                    const audioBlob = new Blob(audioChunks, { 'type': 'audio/ogg; codecs=opus' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    stream.getTracks().forEach(track => track.stop());
                    resolve({ audioChunks, audioBlob, audioUrl, play });
                });
                clearInterval(recordingTimeOut);
                recordingTime = 0;
                recordingTimeF = '00:00';
                let RecDuration = document.querySelector('#rec-duration');
                if (RecDuration != null) { //se cambio de vista y se sigue grabando
                    document.querySelector('#rec-duration').textContent = recordingTimeF;
                }
                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });

const workerOptions = {
    OggOpusEncoderWasmPath: this.location.origin + '/js/audio/OggOpusEncoder.wasm',
    WebMOpusEncoderWasmPath: this.location.origin + '/js/audio/WebMOpusEncoder.wasm'
};
//console.log('SITE.MASTER OpusMediaRecorder');
var audioChunks = [];
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

var recordingTime;
var recordingTimeF;
var recordingTimeOut;
var recorder;
var audio;