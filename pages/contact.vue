<template>
  <div class="contact-page">
    <!-- Header Component -->
    <Header />

    <!-- Contact Hero -->
    <section class="contact-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Get in Touch</h1>
          <p>
            We're here to help you with any questions about Smart Appointment
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-container">
          <!-- Contact Form -->
          <div class="contact-form">
            <h2>Send Us a Message</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">Your Message</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="6"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn primary"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info">
            <h2>Contact Information</h2>
            <p>
              We'd love to hear from you! Reach out through any of these
              channels:
            </p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="method-details">
                  <h3>Our Office</h3>
                  <p>Abeka Junction<br />Tesano, Accra Ghana</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="method-details">
                  <h3>Phone</h3>
                  <p>+233 25 751 8046<br />Mon-Fri, 9am-5pm PST</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="method-details">
                  <h3>Email</h3>
                  <p>1realgrey@gmail.com<br />1realgrey@gmail.com</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-comments"></i>
                </div>
                <div class="method-details">
                  <h3>Live Chat</h3>
                  <p>
                    Available during business hours<br />Click the chat icon in
                    the corner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about Smart Appointment</p>
        </div>

        <div class="faq-container">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <i
                :class="[
                  'fas',
                  activeFaqIndex === index ? 'fa-minus' : 'fa-plus',
                ]"
              ></i>
            </div>
            <div class="faq-answer" v-show="activeFaqIndex === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isSubmitting: false,
      activeFaqIndex: null,
      faqs: [
        {
          question: "How do I get started with Smart Appointment?",
          answer:
            "Getting started is easy! Simply sign up for an account on our website, choose a plan that fits your needs, and follow our setup wizard to configure your scheduling preferences.",
        },

        {
          question: "Can patients cancel or reschedule appointments?",
          answer:
            "Yes, our patient portal allows patients to view, cancel, or reschedule appointments according to your practice's cancellation policy.",
        },
        {
          question: "Do you offer mobile apps?",
          answer:
            "Yes, we offer native iOS and Android apps for both providers and patients. The apps are available for download on the App Store and Google Play.",
        },
        {
          question: "What kind of support do you provide?",
          answer:
            "We offer 24/7 email support and live chat during business hours. Premium support plans with phone support are available for enterprise customers.",
        },
      ],
    };
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;

      // Simulate form submission
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.");
        this.formData = {
          name: "",
          email: "",
          subject: "",
          message: "",
        };
        this.isSubmitting = false;
      }, 1500);
    },
    toggleFaq(index) {
      if (this.activeFaqIndex === index) {
        this.activeFaqIndex = null;
      } else {
        this.activeFaqIndex = index;
      }
    },
  },
  head() {
    return {
      title: "Contact Us - Smart Appointment",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Get in touch with the Smart Appointment team. Contact us for support, sales inquiries, or partnership opportunities.",
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

// Contact Page Styles
.contact-page {
  overflow-x: hidden;
  background-color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section
.contact-hero {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  color: white;
  padding: 100px 0;
  text-align: center;

  .hero-content {
    max-width: 700px;
    margin: 0 auto;

    h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
    }
  }
}

// Contact Section
.contact-section {
  padding: 100px 0;

  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }
}

.contact-form {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: $shadow;

  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: $dark;
  }

  .form-group {
    margin-bottom: 25px;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
      color: $dark;
    }

    input,
    textarea {
      width: 100%;
      padding: 15px;
      border: 1px solid $light-gray;
      border-radius: 8px;
      font-size: 1rem;
      transition: $transition;

      &:focus {
        border-color: $primary;
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
        outline: none;
      }

      &::placeholder {
        color: lighten($gray, 20%);
      }
    }

    textarea {
      resize: vertical;
    }
  }

  .btn {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
  }
}

.contact-info {
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: $dark;
  }

  p {
    color: $gray;
    margin-bottom: 40px;
    line-height: 1.7;
  }
}

.contact-methods {
  .contact-method {
    display: flex;
    gap: 20px;
    padding: 25px 0;
    border-bottom: 1px solid $light-gray;

    &:last-child {
      border-bottom: none;
    }

    .method-icon {
      width: 60px;
      height: 60px;
      background: rgba($primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.5rem;
        color: $primary;
      }
    }

    .method-details {
      h3 {
        font-size: 1.3rem;
        margin-bottom: 8px;
        color: $dark;
      }

      p {
        color: $gray;
        margin-bottom: 0;
        line-height: 1.6;
      }
    }
  }
}

.social-links {
  margin-top: 50px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: $dark;
  }

  .social-icons {
    display: flex;
    gap: 15px;

    a {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $light;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition;

      i {
        font-size: 1.3rem;
        color: $primary;
      }

      &:hover {
        background: $primary;
        transform: translateY(-5px);

        i {
          color: white;
        }
      }
    }
  }
}

// FAQ Section
.faq-section {
  padding: 100px 0;
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
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: $shadow;
  overflow: hidden;

  .faq-question {
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: $transition;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: $dark;
      margin: 0;
    }

    i {
      color: $primary;
      font-size: 1.2rem;
    }

    &:hover {
      background: rgba($primary, 0.05);
    }
  }

  .faq-answer {
    padding: 0 30px 25px;

    p {
      color: $gray;
      line-height: 1.8;
    }
  }
}

// Map Section
.map-section {
  .map-container {
    height: 500px;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
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

    &:hover:not(:disabled) {
      background: darken($primary, 10%);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

// Responsive Design
@media (max-width: 992px) {
  .contact-section {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }

  .contact-info {
    margin-top: 60px;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 80px 0;

    .hero-content {
      h1 {
        font-size: 2.8rem;
      }

      p {
        font-size: 1.1rem;
      }
    }
  }

  .contact-section,
  .faq-section {
    padding: 60px 0;
  }

  .contact-form {
    padding: 30px;
  }

  .contact-method {
    flex-direction: column;
    align-items: flex-start;
  }

  .map-section {
    .map-container {
      height: 400px;
    }
  }

  .section-header {
    h2 {
      font-size: 2rem !important;
    }

    p {
      font-size: 1.1rem !important;
    }
  }
}

@media (max-width: 480px) {
  .contact-hero {
    padding: 60px 0;

    .hero-content {
      h1 {
        font-size: 2.3rem;
      }
    }
  }

  .faq-question {
    padding: 20px !important;

    h3 {
      font-size: 1.1rem !important;
    }
  }

  .map-section {
    .map-container {
      height: 300px;
    }
  }
}
</style>
