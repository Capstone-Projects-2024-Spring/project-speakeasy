class RecordingWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      console.log("Processor constructed");
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
      console.log('start audio context');
    }
  
    stopRecording() {
      this.recording = false;
      console.log(`Created Blob size: ${audioBlob.size}`);
    
      if (this.chunks.length > 0) {
        console.log(`Stopping recording, processing ${this.chunks.length} chunks of audio data`);
        const mergedBuffers = this.mergeBuffers(this.chunks, this.chunks.length * this.chunks[0].length);
        const audioBuffer = this.floatTo16BitPCM(mergedBuffers);
        const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });
        console.log('Audio Blob created:', audioBlob); // Add this line
        this.port.postMessage({ audioBlob: audioBlob });  // Send the audio blob to the main thread
      } else {
        console.log("No audio data to process.");
      }
      this.chunks = [];
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
    if (this.recording) {
      const input = inputs[0];
      for (let channel = 0; channel < input.length; channel++) {
        const inputChannel = input[channel];
        if (inputChannel.length > 0) {
          console.log(`Received ${inputChannel.length} samples on channel ${channel}`);
        } else {
          console.log(`No audio data received on channel ${channel}`);
        }
        this.chunks.push(new Float32Array(inputChannel)); // Make sure to copy the data
      }
      return true;
    }
    return false;
  }

  }
  
  registerProcessor('recorder.worklet', RecordingWorkletProcessor);