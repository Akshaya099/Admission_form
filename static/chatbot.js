document.addEventListener('DOMContentLoaded', function () {
    // Speech Recognition Setup
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    // DOM Elements
    var micButton = document.getElementById('mic-btn');
    var promptField = document.getElementById('prompt');
  
    // Handle Microphone Button Click
    micButton.onclick = function () {
      recognition.start();
      promptField.textContent = "Listening...";
      console.log('Ready to receive voice input.');
    };
  
    // Handle Speech Recognition Result
    recognition.onresult = async function (event) {
      var recognizedText = event.results[0][0].transcript; // Store recognized text
      promptField.textContent = recognizedText; // Display recognized text
      console.log('Recognized Text:', recognizedText);
  
      // Send recognized text to API
      const response = await sendToGroq(recognizedText);
      promptField.textContent += '\n' + response; // Display response
    };
  
    // Handle Speech End
    recognition.onspeechend = function () {
      recognition.stop();
    };
  
    // Handle Recognition Errors
    recognition.onerror = function (event) {
      promptField.textContent = 'Error: ' + event.error;
      console.error('Recognition Error:', event.error);
    };
  
    // Send Recognized Text to Chatbot API
    async function sendToGroq(userInput) {
      const apiKey = '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'; // Replace with your actual API key
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: "You're a consulting chatbot for the College admission process. (Just answer in a short way)" },
            { role: 'assistant', content: "Default:\nName of the college - Infosys Springboard University\nLocation - Coimbatore, Tamil Nadu\nContact Number - 8148786637\nFees Structure:\nArtificial Intelligence and Machine Learning (AIML) - ₹1,25,000\nComputer Science Engineering (CSE) - ₹1,20,000\nMechanical Engineering (ME) - ₹1,10,000\nElectrical Engineering (EE) - ₹1,05,000\nCivil Engineering (CE) - ₹1,00,000\nElectronics & Communication (ECE) - ₹1,15,000\nInformation Technology (IT) - ₹1,20,000\n" },
            { role: 'user', content: userInput }
          ]
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        return '';
      }
  
      const data = await response.json();
      return data.choices[0]?.message?.content || "No response received.";
    }
  });
  