<template>
  <div class="about-page">
    <!-- Header Component -->
    <Header />

    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-content">
        <h1>Transforming Healthcare Scheduling</h1>
        <p>
          Our mission is to create seamless appointment experiences for both
          providers and patients
        </p>
      </div>
      <div class="hero-image">
        <div class="image-grid">
          <div class="grid-item">
            <img
              src="/national-cancer-institute-701-FJcjLAQ-unsplash.jpg"
              alt=""
            />
          </div>
          <div class="grid-item">
            <img src="/luis-melendez-Pd4lRfKo16U-unsplash.jpg" alt="" />
          </div>
          <div class="grid-item">
            <img
              src="/national-cancer-institute-1fvqUP-xaYQ-unsplash.jpg"
              alt=""
            />
          </div>
          <div class="grid-item">
            <img src="/piron-guillaume-U4FyCp3-KzY-unsplash.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Smart Appointment, we're dedicated to eliminating the
            frustrations of healthcare scheduling. We believe that managing
            appointments should be simple, efficient, and stress-free for
            everyone involved.
          </p>
          <p>
            Our platform bridges the gap between healthcare providers and
            patients, creating a seamless connection that saves time, reduces
            administrative burdens, and improves healthcare outcomes.
          </p>
        </div>
        <div class="mission-stats">
          <div class="stat-item">
            <div class="stat-value">200K+</div>
            <div class="stat-label">Appointments Scheduled</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">40%</div>
            <div class="stat-label">Reduction in No-Shows</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">98%</div>
            <div class="stat-label">Patient Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <h2>Our Story</h2>
          <p>
            Smart Appointment was founded in 2018 by Dr. Michael Chen and
            software engineer Sarah Johnson. After years of witnessing the
            inefficiencies in medical scheduling systems, they set out to create
            a better solution.
          </p>

          <div class="story-milestones">
            <div class="milestone">
              <div class="year">2018</div>
              <div class="event">
                Founded with a vision to transform healthcare scheduling
              </div>
            </div>
            <div class="milestone">
              <div class="year">2019</div>
              <div class="event">
                Launched first version with 10 pilot clinics
              </div>
            </div>
            <div class="milestone">
              <div class="year">2020</div>
              <div class="event">
                Expanded to support telehealth appointments during pandemic
              </div>
            </div>
            <div class="milestone">
              <div class="year">2021</div>
              <div class="event">
                Reached 500 healthcare providers nationwide
              </div>
            </div>
            <div class="milestone">
              <div class="year">2023</div>
              <div class="event">Launched AI-powered scheduling assistant</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do</p>
        </div>

        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>Patient-Centered</h3>
            <p>
              We design every feature with the patient experience in mind,
              making healthcare more accessible and less stressful.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3>Innovative</h3>
            <p>
              We constantly explore new technologies to solve age-old scheduling
              problems in healthcare.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-hand-holding-heart"></i>
            </div>
            <h3>Compassionate</h3>
            <p>
              We understand the human side of healthcare and build solutions
              with empathy.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Secure</h3>
            <p>
              We prioritize data security and compliance to protect sensitive
              health information.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="about-cta">
      <div class="container">
        <h2>Join the Scheduling Revolution</h2>
        <p>Become part of our mission to transform healthcare scheduling</p>
        <div class="cta-buttons">
          <nuxt-link to="/choose">
            <button class="btn primary">Try Now</button>
          </nuxt-link>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  head() {
    return {
      title: "About Us - Smart Appointment",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Learn about Smart Appointment and our mission to transform healthcare scheduling.",
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

// About Page Styles
.about-page {
  overflow-x: hidden;
  background-color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section
.about-hero {
  display: flex;
  align-items: center;
  min-height: 70vh;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
  padding: 40px 0;

  .hero-content {
    flex: 1;
    padding: 0 40px;

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: $dark;
      line-height: 1.2;
    }

    p {
      font-size: 1.3rem;
      margin-bottom: 30px;
      color: $gray;
      max-width: 600px;
    }
  }

  .hero-image {
    flex: 1;
    padding: 20px;

    .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 20px;
      height: 500px;

      .grid-item {
        border-radius: 12px;
        background: rgba($primary, 0.1);
        box-shadow: $shadow;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        &:nth-child(1) {
          background: linear-gradient(
            45deg,
            rgba($primary, 0.1),
            rgba($accent, 0.1)
          );
        }

        &:nth-child(2) {
          background: linear-gradient(
            45deg,
            rgba($success, 0.1),
            rgba($accent, 0.1)
          );
        }

        &:nth-child(3) {
          background: linear-gradient(
            45deg,
            rgba($warning, 0.1),
            rgba($primary, 0.1)
          );
        }

        &:nth-child(4) {
          background: linear-gradient(
            45deg,
            rgba($secondary, 0.1),
            rgba($accent, 0.1)
          );
        }
      }
    }
  }
}

// Mission Section
.mission-section {
  padding: 100px 0;
  background: white;

  .container {
    display: flex;
    gap: 50px;
    align-items: center;
  }

  .mission-content {
    flex: 2;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 30px;
      color: $dark;
    }

    p {
      font-size: 1.1rem;
      color: $gray;
      margin-bottom: 20px;
      line-height: 1.8;
    }
  }

  .mission-stats {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;

    .stat-item {
      text-align: center;
      padding: 30px;
      background: $light;
      border-radius: 12px;
      box-shadow: $shadow;
      transition: $transition;

      &:hover {
        transform: translateY(-10px);
      }

      .stat-value {
        font-size: 3rem;
        font-weight: 700;
        color: $primary;
        margin-bottom: 10px;
      }

      .stat-label {
        font-size: 1.1rem;
        color: $dark;
        font-weight: 500;
      }
    }
  }
}

// Story Section
.story-section {
  padding: 100px 0;
  background: $light;

  .story-content {
    max-width: 800px;
    margin: 0 auto;

    h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 50px;
      color: $dark;
    }

    p {
      font-size: 1.1rem;
      color: $gray;
      margin-bottom: 40px;
      line-height: 1.8;
      text-align: center;
    }
  }

  .story-milestones {
    position: relative;
    padding-left: 30px;
    margin-left: 100px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: $primary;
      border-radius: 2px;
    }

    .milestone {
      position: relative;
      padding: 30px 0 30px 40px;

      &::before {
        content: "";
        position: absolute;
        left: -38px;
        top: 40px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $primary;
        border: 4px solid white;
        box-shadow: 0 0 0 2px $primary;
      }

      .year {
        font-size: 1.5rem;
        font-weight: 700;
        color: $primary;
        margin-bottom: 10px;
      }

      .event {
        font-size: 1.1rem;
        color: $dark;
        line-height: 1.6;
      }
    }
  }
}

// Team Section
.team-section {
  padding: 100px 0;
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

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .team-member {
    text-align: center;
    padding: 30px;
    background: $light;
    border-radius: 12px;
    transition: $transition;

    &:hover {
      transform: translateY(-10px);
      box-shadow: $shadow;
    }

    .member-photo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: rgba($primary, 0.1);
      margin: 0 auto 25px;
      overflow: hidden;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba($primary, 0.2),
          rgba($accent, 0.2)
        );
      }
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: $dark;
    }

    .position {
      color: $primary;
      font-weight: 600;
      margin-bottom: 15px;
    }

    p {
      color: $gray;
      font-size: 0.95rem;
    }
  }
}

// Values Section
.values-section {
  padding: 100px 0;
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

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .value-card {
    text-align: center;
    padding: 40px 30px;
    background: white;
    border-radius: 12px;
    box-shadow: $shadow;
    transition: $transition;

    &:hover {
      transform: translateY(-10px);
    }

    .value-icon {
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
      margin-bottom: 20px;
      color: $dark;
    }

    p {
      color: $gray;
      line-height: 1.7;
    }
  }
}

// CTA Section
.about-cta {
  padding: 100px 0;
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  color: white;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 40px;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
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
    background: white;
    color: $primary;

    &:hover {
      background: $light;
      transform: translateY(-2px);
    }
  }

  &.light {
    background: transparent;
    color: white;
    border: 2px solid rgba(white, 0.3);

    &:hover {
      background: rgba(white, 0.1);
      transform: translateY(-2px);
    }
  }
}

// Responsive Design
@media (max-width: 992px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
    padding: 60px 20px;

    .hero-content {
      padding: 20px;
      margin-bottom: 40px;

      h1 {
        font-size: 2.8rem;
      }

      p {
        margin: 0 auto 30px;
      }
    }
  }

  .mission-section {
    .container {
      flex-direction: column;
    }
  }

  .story-section {
    .story-milestones {
      margin-left: 50px;
    }
  }
}

@media (max-width: 768px) {
  .about-hero {
    .hero-content {
      h1 {
        font-size: 2.3rem;
      }
    }

    .hero-image {
      .image-grid {
        height: 400px;
      }
    }
  }

  .mission-section,
  .story-section,
  .team-section,
  .values-section,
  .about-cta {
    padding: 60px 0;
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
  .story-section {
    .story-milestones {
      margin-left: 20px;
      padding-left: 20px;

      .milestone {
        padding-left: 30px;

        &::before {
          left: -28px;
        }
      }
    }
  }

  .about-hero {
    .hero-content {
      h1 {
        font-size: 2rem;
      }
    }

    .hero-image {
      .image-grid {
        height: 300px;
      }
    }
  }
}
</style>
