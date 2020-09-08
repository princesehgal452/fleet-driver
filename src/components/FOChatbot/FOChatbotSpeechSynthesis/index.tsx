import React from 'react';


export class FOChatbotSpeechSynthesis {
  currentUtterance: SpeechSynthesisUtterance | null = null;

  newUtt = new SpeechSynthesisUtterance();

  async push(text: string) {
    if (!text) {
      return;
    }
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    await this.speak();
  }

  speak() {
    return new Promise((resolve, reject) => {
      if (this.currentUtterance) {
        speechSynthesis.speak(this.currentUtterance);
        this.currentUtterance.addEventListener('end', () => {
          resolve();
        });
      }
    });
  }

  cancel() {
    speechSynthesis.cancel();
  }
}
