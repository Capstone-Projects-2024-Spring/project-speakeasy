class RecordingWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.port.onmessage = (event) => {
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
    }
  
    stopRecording() {
      this.recording = false;
      const audioBlob = new Blob(this.chunks, { type: 'audio/webm' });
      this.port.postMessage(audioBlob, [audioBlob]);
      this.chunks = [];
    }
  
    process(inputs, outputs, parameters) {
      if (this.recording) {
        const input = inputs[0];
        const channel = input[0];
        this.chunks.push(channel);
        return true;
      }
      return true;
    }
  }
  
  registerProcessor('recorder.worklet', RecordingWorkletProcessor);