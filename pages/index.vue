<template>
  <div class="homepage">
    <Header />
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Smart Scheduling for Modern Healthcare</h1>
        <p>
          Streamline your appointments, reduce no-shows, and enhance patient
          experience with our intelligent scheduling platform.
        </p>
        <div class="hero-buttons">
          <nuxt-link to="/choose">
            <button class="btn primary">Book Appointment</button>
          </nuxt-link>
          <nuxt-link to="/about">
            <button class="btn secondary">Learn More</button>
          </nuxt-link>
        </div>
      </div>
      <div class="hero-image">
        <img
          src="/amina-atar-tAPxuPCThxY-unsplash.jpg"
          alt="Healthcare Providers"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-header">
        <h2>Why Choose Smart Appointment</h2>
        <p>
          Our platform is designed to simplify healthcare scheduling for both
          providers and patients
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <h3>Easy Scheduling</h3>
          <p>
            Book appointments in seconds with our intuitive interface and
            real-time availability.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-bell"></i>
          </div>
          <h3>Smart Reminders</h3>
          <p>Reduce no-shows with automated SMS and email reminders.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h3>Mobile Friendly</h3>
          <p>
            Access your schedule from anywhere with our responsive mobile
            design.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="section-header">
        <h2>How It Works</h2>
        <p>Simple steps to manage your appointments</p>
      </div>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Create Account</h3>
          <p>Sign up as a provider or patient in minutes.</p>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <h3>Set Availability</h3>
          <p>Providers define their schedule and availability.</p>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <h3>Book Appointment</h3>
          <p>Patients find and book available slots.</p>
        </div>

        <div class="step">
          <div class="step-number">4</div>
          <h3>Manage & Attend</h3>
          <p>Both parties get reminders and can manage appointments.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="section-header">
        <h2>What Our Users Say</h2>
        <p>Real experiences from healthcare professionals and patients</p>
      </div>

      <div class="testimonial-cards">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              Smart Appointment has reduced our no-show rate by 40% and saved
              our staff hours of administrative work.
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>Grey Young</h4>
              <span>Cardiologist</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              As a patient, I love how easy it is to find available appointments
              and reschedule when needed.
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>lIvan Dekportor</h4>
              <span>Patient</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              The analytics dashboard has helped us optimize our scheduling and
              reduce wait times significantly.
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>Lisa Rodriguez</h4>
              <span>Clinic Manager</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Transform Your Appointment Scheduling?</h2>
        <p>
          Join thousands of healthcare providers using Smart Appointment today
        </p>
        <div class="cta-buttons">
          <nuxt-link to="/choose">
            <button class="btn primary">Get Started Now</button>
          </nuxt-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileMenuOpen: false,
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleProfileMenu() {
      this.profileMenuOpen = !this.profileMenuOpen;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style lang="scss">
// Variables
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

// Base styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: $dark;
  line-height: 1.6;
}

.homepage {
  overflow-x: hidden;
}

// Hero Section
.hero {
  display: flex;
  align-items: center;
  min-height: 80vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);

  .hero-content {
    flex: 1;
    max-width: 600px;
    padding: 40px;

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: $dark;
      line-height: 1.2;

      span {
        color: $primary;
      }
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: $gray;
    }

    .hero-buttons {
      display: flex;
      gap: 15px;
    }
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  }
}

// Button Styles
.btn {
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: $transition;
  border: none;

  &.primary {
    background: $primary;
    color: white;

    &:hover {
      background: darken($primary, 10%);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: white;
    color: $primary;
    border: 2px solid $primary;

    &:hover {
      background: $light;
      transform: translateY(-2px);
    }
  }

  &.light {
    background: white;
    color: $primary;

    &:hover {
      background: $light;
      transform: translateY(-2px);
    }
  }
}

// Section Header
.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: $dark;
  }

  p {
    font-size: 1.2rem;
    color: $gray;
  }
}

// Features Section
.features {
  padding: 100px 20px;
  background: white;

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: $light;
    border-radius: 12px;
    padding: 40px 30px;
    text-align: center;
    transition: $transition;

    &:hover {
      transform: translateY(-10px);
      box-shadow: $shadow;
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: rgba($primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;

      i {
        font-size: 2rem;
        color: $primary;
      }
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: $dark;
    }

    p {
      color: $gray;
    }
  }
}

// How It Works
.how-it-works {
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  .steps {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step {
    flex: 1;
    min-width: 250px;
    max-width: 280px;
    text-align: center;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: $shadow;

    .step-number {
      width: 60px;
      height: 60px;
      background: $primary;
      color: white;
      font-size: 1.8rem;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: $dark;
    }

    p {
      color: $gray;
    }
  }
}

// Testimonials
.testimonials {
  padding: 100px 20px;
  background: white;

  .testimonial-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .testimonial-card {
    background: $light;
    border-radius: 12px;
    padding: 30px;
    transition: $transition;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow;
    }

    .testimonial-content {
      position: relative;
      padding: 20px 0;
      margin-bottom: 30px;

      i {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 3rem;
        color: rgba($primary, 0.1);
      }

      p {
        font-size: 1.1rem;
        color: $dark;
        line-height: 1.8;
        padding-left: 40px;
      }
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }

      h4 {
        font-size: 1.1rem;
        margin-bottom: 5px;
        color: $dark;
      }

      span {
        color: $gray;
        font-size: 0.9rem;
      }
    }
  }
}

// Call to Action
.cta {
  padding: 100px 20px;
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  color: white;
  text-align: center;

  .cta-content {
    max-width: 700px;
    margin: 0 auto;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
  }
}

// Responsive Design
@media (max-width: 992px) {
  .main-nav {
    display: none;
  }

  .user-actions {
    .mobile-menu-toggle {
      display: block;
    }
  }

  .hero {
    flex-direction: column;
    text-align: center;
    padding: 60px 20px;

    .hero-content {
      padding: 20px;
      margin-bottom: 40px;

      h1 {
        font-size: 2.8rem;
      }

      .hero-buttons {
        justify-content: center;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
    height: 60px;
  }

  .logo-section {
    .logo-text {
      font-size: 1.2rem;
    }
  }

  .user-actions {
    .user-profile {
      .user-name {
        display: none;
      }

      .fa-chevron-down {
        display: none;
      }
    }
  }

  .mobile-nav {
    display: block;
  }

  .section-header {
    h2 {
      font-size: 2rem;
    }
  }

  .features {
    padding: 60px 20px;
  }

  .how-it-works {
    padding: 60px 20px;
  }

  .testimonials {
    padding: 60px 20px;
  }

  .cta {
    padding: 60px 20px;

    .cta-content {
      h2 {
        font-size: 2rem;
      }
    }
  }

  .footer-bottom {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .logo-section {
    .logo-text {
      display: none;
    }
  }

  .hero {
    .hero-content {
      h1 {
        font-size: 2.2rem;
      }

      .hero-buttons {
        flex-direction: column;
      }
    }
  }

  .cta {
    .cta-buttons {
      flex-direction: column;
    }
  }
}
</style>
