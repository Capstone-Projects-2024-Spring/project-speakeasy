class RecordingWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    console.log("Processor constructed");
    this.port.onmessage = (event) => {
        console.log(`Message received: ${event.data.action}`); // Log incoming messages
        if (event.data.action === 'start') {
            this.startRecording();
        } else if (event.data.action === 'stop') {
            this.stopRecording();
        }
    };
}

  
startRecording() {
  this.recording = true;
  this.chunks = [];
  console.log('Recording started, recording status:', this.recording);
}

stopRecording() {
  this.recording = false;
  console.log('Recording stopped, recording status:', this.recording);
}

  
  
  floatTo16BitPCM(input) {
      var buffer = new ArrayBuffer(input.length * 2); // each sample is 2 bytes
      var view = new DataView(buffer);
      for (let i = 0, offset = 0; i < input.length; i++, offset += 2) {
          var s = Math.max(-1, Math.min(1, input[i]));
          view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      return buffer;
  }
  
  
 
  process(inputs, outputs, parameters) {
    if (!this.recording) return false; // Do nothing if not recording

    const input = inputs[0];
    for (let channel = 0; channel < input.length; channel++) {
        const inputChannel = input[channel];
        if (inputChannel.length > 0) {
            this.chunks.push(new Float32Array(inputChannel));
        }
    }
    return true; // Continue processing while recording is true
}


  }
  
  registerProcessor('recorder.worklet', RecordingWorkletProcessor);