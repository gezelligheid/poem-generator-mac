const WEBHOOK_URL = 'https://alainvanrijn.app.n8n.cloud/webhook/da485ec0-3788-49ac-afb1-7448dc958302';

const form = document.getElementById('keywordForm');
const submitButton = document.getElementById('submitButton');
const statusMessage = document.getElementById('statusMessage');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const keyword = document.getElementById('keyword').value.trim();
  const style = document.getElementById('poemStyle').value;
  const length = document.getElementById('poemLength').value;
  const mood = document.getElementById('poemMood').value;

  const payload = {
    keyword: keyword,
    style: style,
    length: length,
    mood: mood,
    sourcePlatform: 'macOS Safari/Chrome',
    submittedAt: new Date().toISOString()
  };

  submitButton.disabled = true;
  submitButton.textContent = 'Generating...';
  statusMessage.textContent = 'Sending your request to n8n...';

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    const text = await response.text();
    localStorage.setItem('webhookResponse', text || 'Your workflow completed, but no poem text was returned.');
    localStorage.setItem('webhookRequest', JSON.stringify(payload));
    window.location.href = 'results.html';
  } catch (error) {
    console.error('Webhook error:', error);
    statusMessage.textContent = 'The request failed. Double-check the n8n test webhook and try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Generate Poem';
  }
});
