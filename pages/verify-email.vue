<template>
  <div class="verification-page">
    <div class="container">
      <div class="verification-card">
        <i class="fas fa-envelope-open-text"></i>
        <h2>Verify Your Email</h2>
        <p>
          We've sent a verification link to <strong>{{ userEmail }}</strong>
        </p>
        <p>
          Please check your inbox and click the link to activate your account.
        </p>
        <div class="actions">
          <button @click="resendVerification" class="resend-btn">
            Resend Verification Email
          </button>
          <button @click="goToLogin" class="login-btn">Return to Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "",
    };
  },
  mounted() {
    this.userEmail = localStorage.getItem("signup_email") || "";
  },
  methods: {
    async resendVerification() {
      try {
        const { error } = await this.$supabase.auth.resend({
          type: "signup",
          email: this.userEmail,
        });

        if (error) throw error;
        alert("Verification email resent successfully!");
      } catch (error) {
        console.error("Resend error:", error);
        alert("Failed to resend verification email: " + error.message);
      }
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.verification-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0faff 0%, #e6f7ff 100%);
}

.container {
  max-width: 500px;
  width: 100%;
  padding: 20px;
}

.verification-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  i {
    font-size: 4rem;
    color: #4361ee;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  p {
    color: #6c757d;
    margin-bottom: 10px;
    line-height: 1.6;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;

  button {
    padding: 15px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .resend-btn {
    background: #4361ee;
    color: white;
    border: none;

    &:hover {
      background: darken(#4361ee, 10%);
    }
  }

  .login-btn {
    background: transparent;
    color: #4361ee;
    border: 1px solid #4361ee;

    &:hover {
      background: rgba(#4361ee, 0.1);
    }
  }
}
</style>
