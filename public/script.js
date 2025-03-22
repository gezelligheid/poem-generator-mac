document.getElementById('keywordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Gather all input values
  const keyword = document.getElementById('keyword').value;
  const style = document.getElementById('poemStyle').value;
  const length = document.getElementById('poemLength').value;
  const mood = document.getElementById('poemMood').value;
  
  // Create the payload with additional options
  const payload = {
    keyword: keyword,
    style: style,
    length: length,
    mood: mood
  };

  // POST the payload to your webhook
  fetch('https://n8n.typeworkflowinternal.org/webhook/da485ec0-3788-49ac-afb1-7448dc958302', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.text())
  .then(text => {
    localStorage.setItem('webhookResponse', text);
    window.location.href = 'results.html';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Check the console for details.');
  });
});
