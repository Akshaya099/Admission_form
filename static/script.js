document.addEventListener('DOMContentLoaded', function () {
    const micButtons = document.querySelectorAll('.mic-btn');

    micButtons.forEach(button => {
        button.addEventListener('click', function () {
            const fieldId = this.getAttribute('data-field'); 
            startVoiceRecognition(fieldId); 
        });
    });

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    function startVoiceRecognition(fieldId) {
        // Clear previous transcription
        document.getElementById(fieldId).value = '';

        recognition.start();

        recognition.onresult = function (event) {
            let transcript = event.results[0][0].transcript.trim();

            if (fieldId === 'email') {
                transcript = transcript.replace(/\bat\b/g, '@').replace(/\s+/g, '').toLowerCase();
            } else if (fieldId === 'password') {
                transcript = transcript.replace(/\bspace\b/g, ' ');
            } else if (fieldId === 'gender') { // Capture gender input
                transcript = transcript.replace(/\bmail\b/g, 'male').replace(/^\w/, c => c.toUpperCase()); // Replace 'mail' with 'male'
            }

            document.getElementById(fieldId).value = transcript; // Update input field
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
            alert('An error occurred during voice recognition. Please try again.');
        };

        recognition.onend = function () {
            console.log('Speech recognition ended');
        };
    }
});
