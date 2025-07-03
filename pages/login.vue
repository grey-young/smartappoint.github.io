<template>
  <div class="signin-page">
    <div class="container">
      <!-- Header with Logo -->
      <header class="signin-header">
        <div class="logo" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M19,8H5V6H19V8M12,12H17V17H12V12Z"
            />
          </svg>
          <span>Smart<span>Appointment</span></span>
        </div>
      </header>

      <!-- Main Content -->
      <div class="signin-container">
        <!-- Left Side: Form -->
        <div class="form-section">
          <div class="form-header">
            <h1>Sign In to Your Account</h1>
            <p>Access your healthcare management dashboard</p>
          </div>

          <!-- Role Selection -->
          <div class="role-selection">
            <div
              class="role-option"
              :class="{ active: activeRole === 'doctor' }"
              @click="activeRole = 'doctor'"
            >
              <i class="fas fa-user-md"></i>
              <span>Healthcare Professional</span>
            </div>
            <div
              class="role-option"
              :class="{ active: activeRole === 'patient' }"
              @click="activeRole = 'patient'"
            >
              <i class="fas fa-user-injured"></i>
              <span>Patient</span>
            </div>
          </div>

          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Email Address</label>
              <input
                type="email"
                v-model="formData.email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="password-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <i
                    :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"
                  ></i>
                </button>
              </div>
            </div>

            <div class="form-options">
              <div class="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  v-model="formData.rememberMe"
                />
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="forgot-password" @click.prevent="resetPassword"
                >Forgot password?</a
              >
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Sign In</span>
              <span v-else class="loading"
                >Signing In <i class="fas fa-spinner fa-spin"></i
              ></span>
            </button>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
            </div>

            <div class="signup-link">
              Don't have an account? <a @click="navigateToSignup">Sign up</a>
            </div>
          </form>
        </div>

        <!-- Right Side: Benefits -->
        <div class="benefits-section">
          <div class="benefits-card">
            <h3>Smart Appointment Benefits</h3>

            <div class="benefit-item" v-if="activeRole === 'doctor'">
              <div class="benefit-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="benefit-content">
                <h4>Streamlined Scheduling</h4>
                <p>
                  Manage your appointments with our intelligent calendar system.
                </p>
              </div>
            </div>

            <div class="benefit-item" v-if="activeRole === 'doctor'">
              <div class="benefit-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="benefit-content">
                <h4>Patient Management</h4>
                <p>
                  Access patient histories and preferences all in one place.
                </p>
              </div>
            </div>

            <div class="benefit-item" v-if="activeRole === 'patient'">
              <div class="benefit-icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="benefit-content">
                <h4>Easy Booking</h4>
                <p>
                  Find and book appointments with healthcare providers in
                  seconds.
                </p>
              </div>
            </div>

            <div class="benefit-item" v-if="activeRole === 'patient'">
              <div class="benefit-icon">
                <i class="fas fa-bell"></i>
              </div>
              <div class="benefit-content">
                <h4>Smart Reminders</h4>
                <p>Never miss an appointment with automated reminders.</p>
              </div>
            </div>

            <div class="benefit-item">
              <div class="benefit-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="benefit-content">
                <h4>Health Insights</h4>
                <p>Track your health journey with personalized analytics.</p>
              </div>
            </div>

            <div class="testimonial">
              <div class="quote">
                <i class="fas fa-quote-left"></i>
                <p v-if="activeRole === 'doctor'">
                  "Smart Appointment saved our clinic over 15 hours per week in
                  administrative work."
                </p>
                <p v-else>
                  "Booking appointments has never been easier. I can manage my
                  family's healthcare in one place!"
                </p>
              </div>
              <div class="author">
                <div class="avatar"></div>
                <div class="author-info">
                  <strong v-if="activeRole === 'doctor'"
                    >Dr. Sarah Johnson</strong
                  >
                  <strong v-else>Maria Rodriguez</strong>
                  <span v-if="activeRole === 'doctor'">Cardiologist</span>
                  <span v-else>Patient for 2 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Background -->
    <div class="wave-background"></div>

    <!-- Password Reset Modal -->
    <div v-if="showResetModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="showResetModal = false">
          <i class="fas fa-times"></i>
        </button>
        <h2>Reset Password</h2>
        <p>Enter your email to receive password reset instructions</p>
        <div class="form-group">
          <input
            type="email"
            v-model="resetEmail"
            placeholder="your.email@example.com"
          />
          <div v-if="resetError" class="error-message">
            {{ resetError }}
          </div>
          <div v-if="resetSuccess" class="success-message">
            Password reset email sent successfully!
          </div>
        </div>
        <button class="submit-btn" @click="sendResetEmail">
          Send Reset Instructions
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeRole: "doctor", // Default to doctor
      formData: {
        email: "",
        password: "",
        rememberMe: false,
      },
      showPassword: false,
      isSubmitting: false,
      errorMessage: "",
      showResetModal: false,
      resetEmail: "",
      resetError: "",
      resetSuccess: false,
    };
  },
  // Removed mounted() as setSessionPersistence is not a Supabase function
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.errorMessage = "";

      try {
        // Sign in with Supabase
        const { data, error } = await this.$supabase.auth.signInWithPassword({
          email: this.formData.email,
          password: this.formData.password,
        });

        if (error) throw error;

        // Check if email is verified
        if (!data.user.confirmed_at) {
          await this.$supabase.auth.signOut();
          throw new Error("Please verify your email before logging in");
        }

        // Get user role
        const role = data.user.user_metadata?.role || "patient";

        // Redirect based on role
        if (role === "doctor") {
          this.$router.push("/doctor");
        } else {
          this.$router.push("/patient");
        }
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = this.getErrorMessage(error.message);
      } finally {
        this.isSubmitting = false;
      }
    },

    getErrorMessage(error) {
      const errorMap = {
        "Invalid login credentials": "Invalid email or password",
        "Email not confirmed": "Please verify your email first",
        "Email rate limit exceeded":
          "Too many attempts. Please try again later",
      };
      return errorMap[error] || "Login failed. Please try again.";
    },

    navigateToSignup() {
      this.$router.push("/choose");
    },

    resetPassword() {
      this.resetEmail = this.formData.email;
      this.showResetModal = true;
      this.resetError = "";
      this.resetSuccess = false;
    },

    async sendResetEmail() {
      if (!this.resetEmail) {
        this.resetError = "Please enter your email address";
        return;
      }

      try {
        const { error } = await this.$supabase.auth.resetPasswordForEmail(
          this.resetEmail,
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );

        if (error) throw error;

        this.resetSuccess = true;
        setTimeout(() => {
          this.showResetModal = false;
          this.resetSuccess = false;
        }, 3000);
      } catch (error) {
        this.resetError = error.message || "Failed to send reset email";
      }
    },
  },
};
</script>

<style lang="scss">
/* Variables */
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

/* Base Styles */
.signin-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
  padding: 20px 0;

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    z-index: 2;
  }
}

/* Header */
.signin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    font-weight: 700;
    color: $dark;
    cursor: pointer;

    span {
      color: $primary;
    }

    svg {
      width: 36px;
      height: 36px;
      fill: $primary;
    }
  }
}

/* Main Container */
.signin-container {
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow;
}

/* Form Section */
.form-section {
  flex: 1;
  padding: 50px;

  .form-header {
    margin-bottom: 40px;

    h1 {
      font-size: 2.2rem;
      color: $dark;
      margin-bottom: 10px;
    }

    p {
      color: $gray;
      font-size: 1.1rem;
    }
  }
}

/* Role Selection */
.role-selection {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  .role-option {
    flex: 1;
    padding: 20px;
    border: 2px solid $light-gray;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: $transition;

    i {
      font-size: 2rem;
      margin-bottom: 15px;
      color: $gray;
    }

    span {
      font-weight: 600;
      color: $gray;
    }

    &:hover,
    &.active {
      border-color: $primary;
      background: rgba($primary, 0.05);

      i,
      span {
        color: $primary;
      }
    }
  }
}

/* Form Elements */
.form-group {
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: $dark;
  }

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid $light-gray;
    border-radius: 10px;
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
}

.password-container {
  position: relative;

  .password-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: $gray;
    cursor: pointer;
    font-size: 1.1rem;
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  .remember-me {
    display: flex;
    align-items: center;
    gap: 10px;

    input {
      width: auto;
    }

    label {
      margin: 0;
      color: $gray;
      font-weight: normal;
    }
  }

  .forgot-password {
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    transition: $transition;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 18px;
  background: $primary;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: $transition;
  margin-bottom: 25px;

  &:hover {
    background: darken($primary, 10%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba($primary, 0.3);
  }

  &:disabled {
    background: lighten($primary, 20%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}

.signup-link {
  text-align: center;
  color: $gray;

  a {
    color: $primary;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: $transition;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* Benefits Section */
.benefits-section {
  flex: 1;
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  color: white;
  padding: 50px 40px;
}

.benefits-card {
  h3 {
    font-size: 1.8rem;
    margin-bottom: 40px;
    text-align: center;
  }
}

.benefit-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  .benefit-icon {
    width: 60px;
    height: 60px;
    background: rgba(white, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 1.8rem;
      color: white;
    }
  }

  .benefit-content {
    h4 {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    p {
      color: rgba(white, 0.8);
      line-height: 1.6;
    }
  }
}

.testimonial {
  margin-top: 50px;
  padding: 25px;
  background: rgba(white, 0.1);
  border-radius: 15px;

  .quote {
    position: relative;
    padding-left: 30px;
    margin-bottom: 20px;

    i {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 1.5rem;
      opacity: 0.3;
    }

    p {
      font-style: italic;
      line-height: 1.7;
    }
  }

  .author {
    display: flex;
    align-items: center;
    gap: 15px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(white, 0.2);
    }

    .author-info {
      strong {
        display: block;
        margin-bottom: 3px;
      }

      span {
        font-size: 0.9rem;
        opacity: 0.8;
      }
    }
  }
}

/* Wave Background */
.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234361ee' fill-opacity='0.1' d='M0,128L48,128C96,128,192,128,288,138.7C384,149,480,171,576,165.3C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: cover;
  background-position: bottom;
  z-index: 1;
}

/* Error Message */
.error-message {
  color: $danger;
  background: rgba($danger, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;

  i {
    font-size: 1.2rem;
  }
}

/* Success Message */
.success-message {
  color: $success;
  background: rgba($success, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
}

/* Password Reset Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    color: $gray;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: $gray;
    cursor: pointer;
  }
}

/* Responsive Design */
@media (max-width: 992px) {
  .signin-container {
    flex-direction: column;
  }

  .benefits-section {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .signin-header {
    justify-content: center;
  }

  .form-section {
    padding: 30px;
  }

  .role-selection {
    flex-direction: column;
    gap: 10px;
  }

  .form-header {
    h1 {
      font-size: 1.8rem;
    }
  }
}

@media (max-width: 480px) {
  .testimonial {
    padding: 20px;
  }

  .modal-content {
    padding: 20px;
  }
}
</style>
