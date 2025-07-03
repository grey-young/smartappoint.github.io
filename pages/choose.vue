<template>
  <div class="login-select-page">
    <div class="container">
      <div class="main-content">
        <h1 class="title">Welcome to Smart Appointment</h1>
        <p class="subtitle">Select your account type to continue</p>

        <div class="selection-cards">
          <nuxt-link to="/registerasdoctor" style="text-decoration: none">
            <div class="card doctor">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M14.84,16.26C17.86,16.83 20,18.29 20,20V22H4V20C4,18.29 6.14,16.83 9.16,16.26L12,21L14.84,16.26M8,8H16V10A4,4 0 0,1 12,14A4,4 0 0,1 8,10V8M8,7L8.41,2.9C8.46,2.39 8.89,2 9.41,2H14.6C15.11,2 15.54,2.39 15.59,2.9L16,7H8M12,3H11V4H10V6H11V7H13V6H14V4H13V3H12Z"
                  />
                </svg>
              </div>
              <div class="card-content">
                <h3>Healthcare Professional</h3>
                <p>
                  Access patient schedules, manage appointments, and update
                  availability.
                </p>
              </div>
              <div class="action-button">
                Continue as Doctor
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                  />
                </svg>
              </div>
            </div>
          </nuxt-link>

          <nuxt-link to="/registeraspatient" style="text-decoration: none">
            <div class="card user">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </div>
              <div class="card-content">
                <h3>Patient / User</h3>
                <p>
                  Book appointments, view medical history, and manage your
                  healthcare.
                </p>
              </div>
              <div class="action-button">
                Continue as Patient
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                  />
                </svg>
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="alternative-options">
          <p>
            Already have an account?

            <nuxt-link to="/login">Sign In</nuxt-link>
          </p>
        </div>
      </div>

      <div class="wave-background"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.login-select-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  position: relative;

  .container {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    z-index: 2;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.8rem;
      font-weight: 700;
      color: #2c3e50;

      span {
        color: #4361ee;
      }

      svg {
        width: 36px;
        height: 36px;
        fill: #4361ee;
      }
    }
  }

  .main-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }

  .title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6c757d;
    margin-bottom: 50px;
  }

  .selection-cards {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-bottom: 40px;
    //flex-wrap: wrap;
  }

  .card {
    flex: 1;
    min-width: 300px;
    max-width: 380px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(67, 97, 238, 0.15);
    }

    &.active {
      border-color: #4361ee;
      box-shadow: 0 15px 40px rgba(67, 97, 238, 0.2);
    }

    .icon {
      padding: 30px;
      background: rgba(67, 97, 238, 0.05);

      svg {
        width: 80px;
        height: 80px;
        fill: #4361ee;
      }
    }

    &.user .icon {
      background: rgba(76, 201, 240, 0.05);

      svg {
        fill: #4cc9f0;
      }
    }

    .card-content {
      padding: 25px;

      h3 {
        font-size: 1.6rem;
        color: #2c3e50;
        margin-bottom: 15px;
      }

      p {
        color: #6c757d;
        line-height: 1.6;
      }
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 18px;
      background: #4361ee;
      color: white;
      font-weight: 600;
      transition: all 0.3s ease;

      svg {
        width: 20px;
        height: 20px;
        fill: white;
        transition: transform 0.3s ease;
      }

      &:hover {
        background: #3a56d4;

        svg {
          transform: translateX(5px);
        }
      }
    }

    &.user .action-button {
      background: #4cc9f0;

      &:hover {
        background: #3bb5d9;
      }
    }
  }

  .divider {
    position: relative;
    margin: 40px 0;

    span {
      display: inline-block;
      padding: 0 15px;
      background: #f0f5ff;
      position: relative;
      z-index: 1;
      color: #6c757d;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #dee2e6;
      z-index: 0;
    }
  }

  .alternative-options {
    color: #6c757d;
    position: relative;
    z-index: 20;

    p {
      margin: 10px 0;
    }

    a {
      color: #4361ee;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        color: #3a56d4;
        text-decoration: underline;
      }
    }
  }

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

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .selection-cards {
      flex-direction: column;
      align-items: center;
    }

    .card {
      width: 100%;
      max-width: 450px;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 1.8rem;
    }

    .logo {
      font-size: 1.5rem;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
