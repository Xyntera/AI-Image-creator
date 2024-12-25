document.getElementById('generateImageButton').addEventListener('click', async function() {
  const prompt = document.getElementById('promptInput').value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Disable the button while processing
  const button = document.getElementById('generateImageButton');
  button.disabled = true;
  button.textContent = 'Generating...';

  try {
    // Send the prompt to the server to generate an image
    const response = await fetch('https://api.oasis.ai/enterprise/create', {
      method: 'POST',
      headers: {
        'Authorization': '389893ed31bb6ab5748fa420ae7dd52b', // Your new API key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'textToImage',
        model: 'fluxDev',
        args: {
          nsfw: false,
          prompt: prompt,
          seed: 123456,
          numInferenceSteps: 15,
          guidanceScale: 6.0,
          executionContext: 'create'
        }
      })
    });

    const data = await response.json();

    if (data.id) {
      // Show request ID and status
      document.getElementById('result').innerHTML = `
        <p>Image generated! Request ID: ${data.id}</p>
        <p>Tracking or displaying image will be available with ID.</p>
      `;
    } else {
      document.getElementById('result').innerHTML = '<p>Failed to generate image.</p>';
    }

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerHTML = '<p>Failed to generate image. Please try again.</p>';
  }

  // Re-enable button after the process
  button.disabled = false;
  button.textContent = 'Generate Image';
});
