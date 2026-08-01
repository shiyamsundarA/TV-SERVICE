(function () {
  // NOTE: header hide/show, hamburger menu, and .reveal scroll animation
  // are already handled by script.js (loaded before this file). This file
  // only covers behavior specific to the enquiry form.

  document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Service type toggle (Home Visit / Drop at Center) ---------- */
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const serviceTypeInput = document.getElementById('serviceType');
    const addressGroup = document.getElementById('addressGroup');

    function updateAddressVisibility(value) {
      addressGroup.classList.toggle('collapsed', value !== 'home');
    }

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const value = btn.dataset.value;
        serviceTypeInput.value = value;
        updateAddressVisibility(value);
      });
    });

    /* ---------- File input label ---------- */
    const photoInput = document.getElementById('photo');
    const fileLabel = document.getElementById('fileLabel');
    photoInput?.addEventListener('change', () => {
      fileLabel.textContent = photoInput.files.length ? photoInput.files[0].name : 'Choose a file';
    });

    /* ---------- Form validation + submit ---------- */
    const form = document.getElementById('enquiryForm');
    const enquiryCard = document.getElementById('enquiryCard');
    const successEl = document.getElementById('enquirySuccess');
    const resetBtn = document.getElementById('resetForm');

    function setInvalid(el, invalid) {
      el.classList.toggle('invalid', invalid);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('name');
      const nameValid = name.value.trim().length > 1;
      setInvalid(name.closest('.form-group'), !nameValid);
      if (!nameValid) valid = false;

      const phone = document.getElementById('phone');
      const phoneValid = /^[0-9]{10}$/.test(phone.value.trim());
      setInvalid(phone.closest('.form-group'), !phoneValid);
      if (!phoneValid) valid = false;

      const issue = document.getElementById('issue');
      const issueValid = issue.value !== '';
      setInvalid(issue.closest('.form-group'), !issueValid);
      if (!issueValid) valid = false;

      if (serviceTypeInput.value === 'home') {
        const address = document.getElementById('address');
        const addressValid = address.value.trim().length > 3;
        setInvalid(addressGroup, !addressValid);
        if (!addressValid) valid = false;
      }

      const consent = document.getElementById('consent');
      enquiryCard.classList.toggle('consent-invalid', !consent.checked);
      if (!consent.checked) valid = false;

      if (!valid) return;

      // TODO: connect to a backend/email service here, e.g.:
      // fetch('/api/enquire', { method: 'POST', body: new FormData(form) })
      //   .then(() => showSuccess())
      //   .catch(() => alert('Something went wrong, please call us directly.'));

      showSuccess();
    });

    function showSuccess() {
      form.hidden = true;
      successEl.hidden = false;
    }

    resetBtn?.addEventListener('click', () => {
      form.reset();
      form.hidden = false;
      successEl.hidden = true;
      enquiryCard.classList.remove('consent-invalid');
      document.querySelectorAll('.form-group.invalid').forEach((el) => el.classList.remove('invalid'));
      toggleBtns.forEach((b) => b.classList.remove('active'));
      document.querySelector('.toggle-btn[data-value="home"]').classList.add('active');
      serviceTypeInput.value = 'home';
      updateAddressVisibility('home');
      fileLabel.textContent = 'Choose a file';
    });

  });
})();
