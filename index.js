function submitForm() {
  let name = document.getElementById('input-name').value;
  let email = document.getElementById('input-email').value;
  let phoneNumber = document.getElementById('input-phone-number').value;
  let subject = document.getElementById('input-subject').value;
  let message = document.getElementById('input-message').value;

  if (!name || !email || !phoneNumber || !subject || !message) {
    return alert('All input fields must be not empty');
  }

  const emailReciver = 'mail@agun.com';
  const a = document.createElement('a');
  a.href = `mailto:${emailReciver}?subject=${subject}&body=Hello my name ${name}, ${subject}, ${message}`;
  a.click();
}
