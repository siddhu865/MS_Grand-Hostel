// ── SMOOTH SCROLL for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── STICKY NAV shadow on scroll ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ── ENQUIRY FORM submission ──
const form = document.getElementById('enquiry-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const room = document.getElementById('f-room').value;
    const date = document.getElementById('f-date').value;

    if (!name || !phone || !email || !room || !date) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }

    // Replace this block with your actual backend/email API call
    showAlert(`Thank you, ${name}! We received your enquiry and will contact you within 24 hours.`, 'success');
    form.reset();
  });
}

// ── ALERT helper ──
function showAlert(message, type) {
  const existing = document.getElementById('form-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.id = 'form-alert';
  alert.textContent = message;
  alert.style.cssText = `
    padding: 12px 16px;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 12px;
    font-weight: 500;
    background: ${type === 'success' ? '#e6f9ec' : '#fce8e8'};
    color: ${type === 'success' ? '#1a7a30' : '#c0392b'};
    border: 1px solid ${type === 'success' ? '#b2dfbc' : '#f5c6c6'};
  `;

  const btn = document.getElementById('submit-btn');
  btn.parentNode.insertBefore(alert, btn.nextSibling);

  setTimeout(() => alert.remove(), 5000);
}

// ── AVAILABILITY live update (demo) ──
// You can replace this with a real API call to your backend
const availability = {
  'Single Room': { status: 'available', label: 'Available' },
  'Double Sharing': { status: 'available', label: 'Available' },
  'Triple Sharing': { status: 'limited', label: '2 Left' },
  'Dormitory (6-bed)': { status: 'full', label: 'Full' },
};

function renderAvailability() {
  document.querySelectorAll('.avail-row').forEach(row => {
    const roomName = row.querySelector('.room-name').textContent;
    const badge = row.querySelector('.badge');
    const data = availability[roomName];
    if (!data) return;
    badge.textContent = data.label;
    badge.className = 'badge';
    if (data.status === 'available') badge.classList.add('badge-green');
    else if (data.status === 'limited') badge.classList.add('badge-amber');
    else badge.classList.add('badge-red');
  });
}

renderAvailability();
