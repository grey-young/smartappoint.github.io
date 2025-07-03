<template>
  <div class="patient-signup-page">
    <div class="container">
      <!-- Header with Logo -->
      <header class="signup-header">
        <div class="logo" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M19,8H5V6H19V8M12,12H17V17H12V12Z"
            />
          </svg>
          <span>Smart<span>Appointment</span></span>
        </div>
        <div class="login-link">
          Already have an account?
          <a @click="$router.push('/login')">Sign in</a>
        </div>
      </header>

      <!-- Main Content -->
      <div class="signup-container">
        <!-- Left Side: Form -->
        <div class="form-section">
          <div class="form-header">
            <h1>Create Your Patient Account</h1>
            <p>
              Join thousands of patients managing their healthcare with Smart
              Appointment
            </p>
          </div>

          <form @submit.prevent="submitForm">
            <!-- Personal Information -->
            <div class="form-section-title">
              <span>1</span>
              <h2>Personal Information</h2>
            </div>

            <div class="form-group dual-input">
              <div class="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  v-model="formData.firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div class="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  v-model="formData.lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

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
              <label>Phone Number</label>
              <input
                type="tel"
                v-model="formData.phone"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" v-model="formData.dob" required />
            </div>

            <!-- Health Information -->
            <div class="form-section-title">
              <span>2</span>
              <h2>Health Information</h2>
            </div>

            <div class="form-group">
              <label>Primary Health Concerns</label>
              <select v-model="formData.healthConcern" required>
                <option value="" disabled selected>
                  Select your primary concern
                </option>
                <option
                  v-for="concern in healthConcerns"
                  :key="concern"
                  :value="concern"
                >
                  {{ concern }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Do you have any existing medical conditions?</label>
              <textarea
                v-model="formData.medicalConditions"
                placeholder="List any conditions (e.g. diabetes, hypertension)"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Are you currently taking any medications?</label>
              <textarea
                v-model="formData.medications"
                placeholder="List medications and dosages"
                rows="3"
              ></textarea>
            </div>

            <!-- Account Security -->
            <div class="form-section-title">
              <span>3</span>
              <h2>Account Security</h2>
            </div>

            <div class="form-group dual-input">
              <div class="input-group">
                <label>Create Password</label>
                <div class="password-container">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="formData.password"
                    placeholder="Create a strong password"
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
                <div class="password-strength" :class="passwordStrengthClass">
                  Password Strength: {{ passwordStrength }}
                </div>
              </div>
              <div class="input-group">
                <label>Confirm Password</label>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="formData.confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="form-group terms">
              <input
                type="checkbox"
                id="terms"
                v-model="formData.agreeTerms"
                required
              />
              <label for="terms">
                I agree to the <a href="#">Terms of Service</a> and
                <a href="#">Privacy Policy</a>.
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Create Account</span>
              <span v-else class="loading"
                >Creating Account <i class="fas fa-spinner fa-spin"></i
              ></span>
            </button>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
            </div>
          </form>
        </div>

        <!-- Right Side: Benefits -->
        <div class="benefits-section">
          <div class="benefits-card">
            <h3>Why Join Smart Appointment?</h3>

            <div class="benefit-item">
              <div class="benefit-icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="benefit-content">
                <h4>Easy Appointment Booking</h4>
                <p>
                  Find and book appointments with healthcare providers in
                  seconds.
                </p>
              </div>
            </div>

            <div class="benefit-item">
              <div class="benefit-icon">
                <i class="fas fa-bell"></i>
              </div>
              <div class="benefit-content">
                <h4>Smart Reminders</h4>
                <p>
                  Never miss an appointment with automated reminders via SMS and
                  email.
                </p>
              </div>
            </div>

            <div class="benefit-item">
              <div class="benefit-icon">
                <i class="fas fa-file-medical"></i>
              </div>
              <div class="benefit-content">
                <h4>Health Records Access</h4>
                <p>
                  Securely access your medical history and appointment records
                  anytime.
                </p>
              </div>
            </div>

            <div class="testimonial">
              <div class="quote">
                <i class="fas fa-quote-left"></i>
                <p>
                  "Smart Appointment made managing my family's healthcare so
                  much easier. Booking appointments is simple and I never forget
                  my visits!"
                </p>
              </div>
              <div class="author">
                <div class="author-info">
                  <strong>Maria Rodriguez</strong>
                  <span>Patient for 2 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Background -->
    <div class="wave-background"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        healthConcern: "",
        medicalConditions: "",
        medications: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      },
      healthConcerns: [
        "General Checkup",
        "Chronic Condition",
        "Mental Health",
        "Women's Health",
        "Pediatric Care",
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Gastroenterology",
        "Neurology",
        "Other",
      ],
      showPassword: false,
      showConfirmPassword: false,
      isSubmitting: false,
      passwordStrength: "Weak",
      passwordStrengthClass: "weak",
      errorMessage: "",
    };
  },
  watch: {
    "formData.password": function (newVal) {
      this.calculatePasswordStrength(newVal);
    },
  },
  methods: {
    calculatePasswordStrength(password) {
      if (password.length === 0) {
        this.passwordStrength = "Weak";
        this.passwordStrengthClass = "weak";
        return;
      }

      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      if (strength < 2) {
        this.passwordStrength = "Weak";
        this.passwordStrengthClass = "weak";
      } else if (strength < 4) {
        this.passwordStrength = "Medium";
        this.passwordStrengthClass = "medium";
      } else {
        this.passwordStrength = "Strong";
        this.passwordStrengthClass = "strong";
      }
    },

    validatePhone(phone) {
      // Remove all non-digit characters
      const digits = phone.replace(/\D/g, "");
      return digits.length >= 7;
    },

    validateDOB(dob) {
      if (!dob) return false;
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      return age >= 13;
    },

    async submitForm() {
      // Validate passwords match
      if (this.formData.password !== this.formData.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      // Validate phone number
      if (!this.validatePhone(this.formData.phone)) {
        this.errorMessage =
          "Please enter a valid phone number (at least 7 digits)";
        return;
      }

      // Validate date of birth
      if (!this.validateDOB(this.formData.dob)) {
        this.errorMessage = "You must be at least 13 years old to register";
        return;
      }

      // Validate terms agreement
      if (!this.formData.agreeTerms) {
        this.errorMessage = "You must agree to the terms and conditions";
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = "";

      try {
        // 1. Create auth user (Supabase v2: user is in data.user)
        const { data, error: authError } = await this.$supabase.auth.signUp({
          email: this.formData.email,
          password: this.formData.password,
          options: {
            data: {
              first_name: this.formData.firstName,
              last_name: this.formData.lastName,
              role: "patient",
            },
          },
        });

        if (authError) throw authError;
        const user = data?.user;
        if (!user) throw new Error("Signup failed. Please try again.");

        // 2. Store additional patient data
        const { error: dbError } = await this.$supabase
          .from("patients")
          .insert([
            {
              user_id: user.id,
              first_name: this.formData.firstName,
              last_name: this.formData.lastName,
              phone: this.formData.phone,
              dob: this.formData.dob,
              health_concern: this.formData.healthConcern,
              medical_conditions: this.formData.medicalConditions,
              medications: this.formData.medications,
            },
          ]);

        if (dbError) throw dbError;

        // 3. Store email for verification page
        localStorage.setItem("signup_email", this.formData.email);

        // 4. Redirect to verification page
        this.$router.push("/verify-email");
      } catch (error) {
        console.error("Signup error:", error);
        this.errorMessage =
          error.message || "Account creation failed. Please try again.";
      } finally {
        this.isSubmitting = false;
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
.patient-signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f0faff 0%, #e6f7ff 100%);
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
.signup-header {
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

  .login-link {
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
}

/* Main Container */
.signup-container {
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow;
}

/* Form Section */
.form-section {
  flex: 1.5;
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

.form-section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 30px 0 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid $light-gray;

  span {
    width: 30px;
    height: 30px;
    background: $primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.4rem;
    color: $dark;
  }
}

.form-group {
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: $dark;
  }

  input,
  select,
  textarea {
    width: 95%;
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

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c757d'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 16px;
  }
}

.dual-input {
  display: flex;
  gap: 20px;

  .input-group {
    flex: 1;
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

.password-strength {
  font-size: 0.85rem;
  margin-top: 5px;

  &.weak {
    color: $danger;
  }

  &.medium {
    color: $warning;
  }

  &.strong {
    color: $success;
  }
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  input {
    width: auto;
    margin-top: 5px;
  }

  label {
    font-weight: normal;
    color: $gray;

    a {
      color: $primary;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
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
  margin-top: 20px;

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

/* Benefits Section */
.benefits-section {
  flex: 1;
  background: linear-gradient(135deg, $accent 0%, $primary 100%);
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
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234cc9f0' fill-opacity='0.1' d='M0,128L48,128C96,128,192,128,288,138.7C384,149,480,171,576,165.3C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;

  i {
    font-size: 1.2rem;
  }
}

/* Responsive Design */
@media (max-width: 992px) {
  .signup-container {
    flex-direction: column;
  }

  .benefits-section {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .signup-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .form-section {
    padding: 30px;
  }

  .dual-input {
    flex-direction: column;
    gap: 15px;
  }

  .form-header {
    h1 {
      font-size: 1.8rem;
    }
  }
}

@media (max-width: 480px) {
  .form-section-title {
    h2 {
      font-size: 1.2rem;
    }
  }

  .benefit-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
