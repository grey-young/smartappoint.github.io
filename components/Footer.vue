<template lang="">
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="logo-section">
          <div class="logo-icon"></div>
          <div class="logo-text">
            <span class="logo-main">Smart</span>
            <span class="logo-accent">Appointment</span>
          </div>
        </div>
        <p class="footer-description">
          Modern appointment scheduling for healthcare professionals and
          patients.
        </p>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h4>Links</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/choose">
            <button>Try Now</button>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Smart Appointment. All rights reserved.</p>
      <div class="legal-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
$primary: #4361ee;
$secondary: #3f37c9;
$accent: #4cc9f0;
$light: #f8f9fa;
$dark: #212529;
$gray: #6c757d;
$light-gray: #e9ecef;
$success: #4caf50;
$warning: #ffb703;
$danger: #e63946;

$shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
$transition: all 0.3s ease;

// Footer
.footer {
  background: $dark;
  color: white;
  padding-top: 80px;

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px 60px;
  }

  .footer-brand {
    flex: 2;
    min-width: 300px;

    .logo-section {
      margin-bottom: 20px;

      .logo-main {
        color: white;
      }
    }

    .footer-description {
      color: rgba(white, 0.7);
      margin-bottom: 30px;
      max-width: 400px;
    }

    .social-links {
      display: flex;
      gap: 15px;

      a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(white, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $transition;

        &:hover {
          background: $primary;
          transform: translateY(-3px);
        }

        i {
          color: white;
        }
      }
    }
  }

  .footer-links {
    flex: 3;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

    .link-group {
      min-width: 180px;

      h4 {
        font-size: 1.2rem;
        margin-bottom: 20px;
        position: relative;
        padding-bottom: 10px;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: $primary;
        }
      }

      a {
        display: block;
        color: rgba(white, 0.7);
        text-decoration: none;
        margin-bottom: 12px;
        transition: $transition;

        button {
          padding: 10px 40px;
          font-weight: bold;
          border-radius: 5px;
          border: none;
        }

        &:hover {
          color: white;
          transform: translateX(5px);
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(white, 0.1);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;

    p {
      color: rgba(white, 0.6);
      font-size: 0.9rem;
    }

    .legal-links {
      display: flex;
      gap: 20px;

      a {
        color: rgba(white, 0.6);
        text-decoration: none;
        font-size: 0.9rem;
        transition: $transition;

        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
