<template>
  <div class="services-page">
    <!-- Header Component -->
    <Header />

    <!-- Services Hero Section -->
    <section class="services-hero">
      <div class="hero-content">
        <h1>Our Comprehensive Services</h1>
        <p>
          Discover how Smart Appointment can transform your healthcare
          scheduling experience with our specialized services
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-grid">
      <div class="section-header">
        <h2>Specialized Solutions</h2>
        <p>Tailored services to meet your healthcare scheduling needs</p>
      </div>

      <div class="services-container">
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <h3>Online Appointment Scheduling</h3>
          <p>
            Allow patients to book appointments 24/7 through your website or
            mobile app with real-time availability.
          </p>
          <ul class="service-features">
            <li><i class="fas fa-check-circle"></i> Real-time availability</li>
            <li><i class="fas fa-check-circle"></i> Automated confirmations</li>
            <li>
              <i class="fas fa-check-circle"></i> Patient self-service portal
            </li>
          </ul>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h3>Mobile Patient App</h3>
          <p>
            Offer patients a dedicated mobile app to manage their appointments
            and healthcare.
          </p>
          <ul class="service-features">
            <li><i class="fas fa-check-circle"></i> Appointment management</li>
            <li><i class="fas fa-check-circle"></i> Digital intake forms</li>
            <li><i class="fas fa-check-circle"></i> Secure messaging</li>
          </ul>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-users"></i>
          </div>
          <h3>Provider Management</h3>
          <p>
            Easily manage provider schedules, availability, and preferences in
            one place.
          </p>
          <ul class="service-features">
            <li><i class="fas fa-check-circle"></i> Custom scheduling rules</li>
            <li><i class="fas fa-check-circle"></i> Time-off management</li>
            <li><i class="fas fa-check-circle"></i> Multi-location support</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="service-testimonials">
      <div class="section-header">
        <h2>Trusted by Healthcare Professionals</h2>
        <p>See what our clients say about our services</p>
      </div>

      <div class="testimonial-cards">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              "Since implementing Smart Appointment, our no-show rate dropped by
              35% and our front desk staff saves 10+ hours per week on
              scheduling."
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>Dr. Grey Young</h4>
              <span>Family Medicine Practice</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              "The automated reminders have been a game-changer. Patients
              appreciate the notifications, and we've seen a significant
              improvement in appointment adherence."
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>lIvan Dekportor</h4>
              <span>Clinic Administrator</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>
              "The analytics dashboard helped us identify bottlenecks in our
              scheduling process. We've optimized our provider schedules and
              reduced patient wait times by 25%."
            </p>
          </div>
          <div class="testimonial-author">
            <div>
              <h4>Michael Rodriguez</h4>
              <span>Medical Group COO</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="service-cta">
      <div class="cta-content">
        <h2>Ready to Transform Your Practice?</h2>
        <p>
          Join thousands of healthcare providers using Smart Appointment to
          streamline their scheduling
        </p>
        <div class="cta-buttons">
          <button class="btn primary">Start Now</button>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: "ServicesPage",
  head() {
    return {
      title: "Our Services - Smart Appointment",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Discover comprehensive healthcare scheduling solutions with Smart Appointment services.",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
// Variables (should match your existing theme)
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

// Services Page Styles
.services-page {
  overflow-x: hidden;
  background-color: #ffffff;
}

.services-hero {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;

    h1 {
      font-size: 3.2rem;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.services-grid {
  padding: 100px 20px;
  background: $light;

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

  .services-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .service-card {
    background: white;
    border-radius: 12px;
    padding: 40px 30px;
    box-shadow: $shadow;
    transition: $transition;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .service-icon {
      width: 80px;
      height: 80px;
      background: rgba($primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;

      i {
        font-size: 2.5rem;
        color: $primary;
      }
    }

    h3 {
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 20px;
      color: $dark;
    }

    p {
      color: $gray;
      text-align: center;
      margin-bottom: 25px;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 0;
        border-bottom: 1px solid $light-gray;
        display: flex;
        align-items: center;

        i {
          color: $success;
          margin-right: 10px;
          font-size: 1.2rem;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

.service-comparison {
  padding: 100px 20px;
  background: white;

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

  .comparison-table {
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: $shadow;

    .comparison-header {
      display: flex;
      background: $primary;
      color: white;

      .feature-column {
        flex: 2;
        padding: 25px 20px;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .plan-column {
        flex: 1;
        padding: 25px 20px;
        text-align: center;
        border-left: 1px solid rgba(white, 0.1);

        .plan-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .plan-price {
          font-size: 1.8rem;
          font-weight: 700;

          span {
            font-size: 1rem;
            font-weight: normal;
          }
        }
      }
    }

    .comparison-row {
      display: flex;
      background: white;
      border-bottom: 1px solid $light-gray;

      &:nth-child(even) {
        background: $light;
      }

      .feature-column {
        flex: 2;
        padding: 20px;
        font-weight: 500;
      }

      .plan-column {
        flex: 1;
        padding: 20px;
        text-align: center;
        border-left: 1px solid $light-gray;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: $success;
          font-size: 1.2rem;
        }
      }
    }

    .comparison-footer {
      display: flex;
      background: white;
      padding: 20px;

      .feature-column {
        flex: 2;
      }

      .plan-column {
        flex: 1;
        text-align: center;
        border-left: 1px solid $light-gray;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.service-testimonials {
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

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

  .testimonial-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .testimonial-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: $shadow;
    transition: $transition;

    &:hover {
      transform: translateY(-5px);
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

.service-cta {
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

  &.outline {
    background: transparent;
    color: $primary;
    border: 2px solid $primary;

    &:hover {
      background: rgba($primary, 0.1);
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

// Responsive Design
@media (max-width: 992px) {
  .services-hero {
    padding: 80px 20px;

    .hero-content {
      h1 {
        font-size: 2.8rem;
      }
    }
  }

  .comparison-table {
    .comparison-header,
    .comparison-row,
    .comparison-footer {
      flex-direction: column;

      .feature-column,
      .plan-column {
        flex: none;
        width: 100%;
        text-align: left;
        border-left: none;
        border-bottom: 1px solid $light-gray;
      }
    }
  }
}

@media (max-width: 768px) {
  .services-hero {
    padding: 60px 20px;

    .hero-content {
      h1 {
        font-size: 2.3rem;
      }

      p {
        font-size: 1.1rem;
      }
    }
  }

  .services-grid {
    padding: 60px 20px;

    .services-container {
      grid-template-columns: 1fr;
    }
  }

  .service-comparison,
  .service-testimonials,
  .service-cta {
    padding: 60px 20px;
  }

  .section-header {
    h2 {
      font-size: 2rem !important;
    }

    p {
      font-size: 1.1rem !important;
    }
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .services-hero {
    .hero-content {
      h1 {
        font-size: 2rem;
      }
    }
  }

  .service-card {
    padding: 30px 20px !important;
  }
}
</style>
