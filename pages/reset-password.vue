<template>
  <div class="reset-password-page">
    <div class="container">
      <div class="reset-card">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below</p>

        <form @submit.prevent="updatePassword">
          <div class="form-group">
            <label>New Password</label>
            <div class="password-container">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="newPassword"
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
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            Update Password
          </button>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      isSubmitting: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = "";

      try {
        const { error } = await this.$supabase.auth.updateUser({
          password: this.newPassword,
        });

        if (error) throw error;

        this.successMessage =
          "Password updated successfully! Redirecting to login...";
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        this.errorMessage = error.message || "Failed to update password";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
}

.container {
  max-width: 500px;
  width: 100%;
  padding: 20px;
}

.reset-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    color: #6c757d;
    margin-bottom: 30px;
  }
}

/* Reuse styles from login page as needed */
</style>
