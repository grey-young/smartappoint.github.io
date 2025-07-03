<template>
  <header class="smart-header">
    <div class="header-container">
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

      <nav class="main-nav desktop-only">
        <ul>
          <li>
            <NuxtLink to="/" class="nav-link" exact-active-class="active"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/services"
              class="nav-link"
              exact-active-class="active"
              >Services</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="nav-link" exact-active-class="active"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact" class="nav-link" exact-active-class="active"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <div class="user-actions desktop-only">
        <NuxtLink to="/choose">
          <button>Try Now</button>
        </NuxtLink>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <transition name="fade">
      <div v-if="mobileMenuOpen" class="mobile-nav">
        <NuxtLink to="/" class="mobile-nav-link" exact-active-class="active"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/appointments"
          class="mobile-nav-link"
          exact-active-class="active"
          >Appointments</NuxtLink
        >
        <NuxtLink
          to="/services"
          class="mobile-nav-link"
          exact-active-class="active"
          >Services</NuxtLink
        >
        <NuxtLink
          to="/providers"
          class="mobile-nav-link"
          exact-active-class="active"
          >Providers</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="mobile-nav-link"
          exact-active-class="active"
          >Contact</NuxtLink
        >
        <NuxtLink to="/choose" class="mobile-nav-link">Try Now</NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
const mobileMenuOpen = ref(false);
</script>

<style lang="scss" scoped>
$primary: #4361ee;
$dark: #212529;
$gray: #6c757d;
$light-gray: #e9ecef;
$shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
$transition: all 0.3s ease;

.smart-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: $shadow;
  z-index: 1000;
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

.main-nav ul {
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

.user-actions button {
  padding: 10px 40px;
  background: black;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  border: none;
}

.mobile-toggle {
  background: none;
  border: none;
  display: none;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    color: $dark;
  }
}

.mobile-nav {
  display: none;
  flex-direction: column;
  background: white;
  padding: 20px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
