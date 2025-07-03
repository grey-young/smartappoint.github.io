<template>
  <header class="smart-header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M19,8H5V6H19V8M12,12H17V17H12V12Z"
            />
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-main">Smart</span>
          <span class="logo-accent">Appointment</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="main-nav">
        <ul>
          <li><a href="#" class="nav-link active">Dashboard</a></li>
          <li><a href="#" class="nav-link">Appointments</a></li>
          <li><a href="#" class="nav-link">Patients</a></li>
          <li><a href="#" class="nav-link">Calendar</a></li>
          <li><a href="#" class="nav-link">Reports</a></li>
        </ul>
      </nav>

      <!-- User Actions -->
      <div class="user-actions">
        <button class="action-btn">
          <i class="fas fa-search"></i>
        </button>

        <button class="action-btn notification-btn">
          <i class="fas fa-bell"></i>
          <span class="notification-badge">3</span>
        </button>

        <div class="user-profile" @click="toggleProfileMenu">
          <div class="avatar">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Dr. Sarah Johnson"
            />
          </div>
          <span class="user-name">Dr. Sarah Johnson</span>
          <i class="fas fa-chevron-down"></i>

          <div v-if="profileMenuOpen" class="profile-menu">
            <a href="#"><i class="fas fa-user"></i> My Profile</a>
            <a href="#"><i class="fas fa-cog"></i> Settings</a>
            <a href="#"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
          </div>
        </div>

        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="mobile-nav">
      <a href="#" class="mobile-nav-link active">Dashboard</a>
      <a href="#" class="mobile-nav-link">Appointments</a>
      <a href="#" class="mobile-nav-link">Patients</a>
      <a href="#" class="mobile-nav-link">Calendar</a>
      <a href="#" class="mobile-nav-link">Reports</a>
    </div>
  </header>
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
.smart-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: $shadow;
  z-index: 1000;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
}

// Logo Section
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;

  .logo-icon {
    width: 40px;
    height: 40px;
    background: $primary;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
      fill: white;
    }
  }

  .logo-text {
    font-size: 1.4rem;
    font-weight: 700;

    .logo-main {
      color: $dark;
    }

    .logo-accent {
      color: $primary;
    }
  }
}

// Main Navigation
.main-nav {
  ul {
    display: flex;
    list-style: none;
    gap: 25px;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    color: $gray;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    padding: 8px 0;
    position: relative;
    transition: $transition;

    &:hover {
      color: $primary;
    }

    &.active {
      color: $primary;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: $primary;
        border-radius: 2px;
      }
    }
  }
}

// User Actions
.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;

  .action-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: none;
    border: none;
    color: $gray;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $transition;

    &:hover {
      background: $light-gray;
      color: $primary;
    }
  }

  .notification-btn {
    position: relative;

    .notification-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      background: $danger;
      color: white;
      font-size: 10px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
    position: relative;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 30px;
    transition: $transition;

    &:hover {
      background: $light-gray;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .user-name {
      font-weight: 500;
      color: $dark;
      font-size: 0.9rem;
    }

    .fa-chevron-down {
      font-size: 12px;
      color: $gray;
    }

    .profile-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: $shadow;
      width: 200px;
      padding: 10px 0;
      margin-top: 10px;
      overflow: hidden;
      z-index: 100;

      a {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        text-decoration: none;
        color: $dark;
        font-size: 0.95rem;
        transition: $transition;

        i {
          margin-right: 10px;
          width: 20px;
          color: $gray;
        }

        &:hover {
          background: $light-gray;
          color: $primary;

          i {
            color: $primary;
          }
        }
      }
    }
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.4rem;
    color: $gray;
    cursor: pointer;
    transition: $transition;

    &:hover {
      color: $primary;
    }
  }
}

// Mobile Navigation
.mobile-nav {
  display: none;
  background: white;
  padding: 15px 20px;
  border-top: 1px solid $light-gray;

  .mobile-nav-link {
    display: block;
    padding: 12px 0;
    text-decoration: none;
    color: $dark;
    font-weight: 500;
    border-bottom: 1px solid $light-gray;

    &:last-child {
      border-bottom: none;
    }

    &.active {
      color: $primary;
      font-weight: 600;
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
}

@media (max-width: 480px) {
  .logo-section {
    .logo-text {
      display: none;
    }
  }
}
</style>
