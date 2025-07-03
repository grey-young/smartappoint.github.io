<template lang="html">
  <div class="patient-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
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
      <div class="user-info">
        <div class="user-avatar">
          {{ patientInitials }}
        </div>
        <div>
          <div class="user-name">
            {{ patient.first_name }} {{ patient.last_name }}
          </div>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </div>
    </header>

    <div class="dashboard-container">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <div class="profile-header">
          <div class="profile-avatar">
            {{ patientInitials }}
          </div>
          <h2 class="profile-name">
            {{ patient.first_name }} {{ patient.last_name }}
          </h2>
          <div class="profile-role">Patient</div>
        </div>

        <nav class="dashboard-nav">
          <div
            class="nav-item"
            :class="{ active: activeTab === 'dashboard' }"
            @click="activeTab = 'dashboard'"
          >
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </div>
          <div
            class="nav-item"
            :class="{ active: activeTab === 'book' }"
            @click="activeTab = 'book'"
          >
            <i class="fas fa-calendar-plus"></i>
            <span>Book Appointment</span>
          </div>
          <div
            class="nav-item"
            :class="{ active: activeTab === 'appointments' }"
            @click="
              activeTab = 'appointments';
              fetchAppointments();
            "
          >
            <i class="fas fa-calendar-check"></i>
            <span>My Appointments</span>
          </div>
          <div
            class="nav-item"
            :class="{ active: activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          >
            <i class="fas fa-user"></i>
            <span>My Profile</span>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Dashboard Overview -->
        <div v-if="activeTab === 'dashboard'" class="dashboard-overview">
          <h2>Welcome back, {{ patient.first_name }}</h2>
          <p class="subtitle">Here's your health dashboard</p>

          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-value">{{ upcomingAppointments.length }}</div>
              <div class="stat-label">Upcoming Appointments</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ doctors.length }}</div>
              <div class="stat-label">Available Doctors</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ pastAppointments.length }}</div>
              <div class="stat-label">Past Appointments</div>
            </div>
          </div>

          <div class="section">
            <h3>Upcoming Appointments</h3>
            <div
              v-if="upcomingAppointments.length > 0"
              class="appointment-list"
            >
              <div
                v-for="appt in upcomingAppointments"
                :key="appt.id"
                class="appointment-card"
              >
                <div class="appt-date">
                  <div class="appt-day">
                    {{ formatDate(appt.date, "dddd") }}
                  </div>
                  <div class="appt-time">
                    {{ formatDate(appt.date, "h:mm a") }}
                  </div>
                </div>
                <div class="appt-info">
                  <div class="appt-doctor">
                    Dr. {{ appt.doctor.first_name }} {{ appt.doctor.last_name }}
                  </div>
                  <div class="appt-specialty">
                    {{ appt.doctor.specialization }}
                  </div>
                  <div class="appt-location">{{ appt.doctor.workplace }}</div>
                </div>
                <button class="cancel-btn" @click="cancelAppointment(appt.id)">
                  Cancel
                </button>
              </div>
            </div>
            <div v-else class="empty-state">
              <i class="fas fa-calendar-times"></i>
              <p>No upcoming appointments</p>
              <button class="primary-btn" @click="activeTab = 'book'">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>

        <!-- Book Appointment -->
        <div v-if="activeTab === 'book'" class="book-appointment">
          <h2>Book New Appointment</h2>

          <div class="booking-steps">
            <div class="step" :class="{ active: bookingStep === 1 }">
              <div class="step-number">1</div>
              <div class="step-label">Select Doctor</div>
            </div>
            <div class="step" :class="{ active: bookingStep === 2 }">
              <div class="step-number">2</div>
              <div class="step-label">Select Date & Time</div>
            </div>
            <div class="step" :class="{ active: bookingStep === 3 }">
              <div class="step-number">3</div>
              <div class="step-label">Confirm</div>
            </div>
          </div>

          <!-- Step 1: Select Doctor -->
          <div v-if="bookingStep === 1" class="step-content">
            <div class="search-box">
              <input
                type="text"
                v-model="doctorSearch"
                placeholder="Search doctors by name or specialty..."
                @input="filterDoctors"
              />
              <i class="fas fa-search"></i>
            </div>

            <div class="doctor-grid">
              <div
                v-for="doctor in filteredDoctors"
                :key="doctor.user_id"
                class="doctor-card"
                :class="{
                  selected:
                    selectedDoctor && selectedDoctor.user_id === doctor.user_id,
                }"
                @click="selectDoctor(doctor)"
              >
                <div class="doctor-avatar">
                  {{ doctor.first_name.charAt(0)
                  }}{{ doctor.last_name.charAt(0) }}
                </div>
                <div class="doctor-info">
                  <h3>Dr. {{ doctor.first_name }} {{ doctor.last_name }}</h3>
                  <div class="doctor-specialty">
                    {{ doctor.specialization }}
                  </div>
                  <div class="doctor-exp">
                    {{ doctor.experience }} years experience
                  </div>
                  <div class="doctor-hospital">
                    <i class="fas fa-hospital"></i> {{ doctor.workplace }}
                  </div>
                </div>
              </div>
            </div>

            <div class="step-actions">
              <button
                class="next-btn"
                :disabled="!selectedDoctor"
                @click="bookingStep = 2"
              >
                Next: Select Date & Time
              </button>
            </div>
          </div>

          <!-- Step 2: Select Date & Time -->
          <div v-if="bookingStep === 2" class="step-content">
            <div class="date-time-selector">
              <div class="calendar-section">
                <h3>Select Date</h3>
                <div class="calendar">
                  <div class="calendar-header">
                    <button class="nav-btn" @click="prevMonth">
                      <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="current-month">{{ currentMonth }}</div>
                    <button class="nav-btn" @click="nextMonth">
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div class="weekdays">
                    <div
                      v-for="day in [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat',
                      ]"
                      :key="day"
                      class="weekday"
                    >
                      {{ day }}
                    </div>
                  </div>
                  <div class="days">
                    <div
                      v-for="day in daysInMonth"
                      :key="day.date"
                      class="day"
                      :class="{
                        'current-month': day.isCurrentMonth,
                        selected: isSameDay(selectedDate, day.date),
                        disabled: !isAvailable(day.date),
                      }"
                      @click="selectDate(day.date)"
                    >
                      {{ day.day }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="time-section">
                <h3>Select Time</h3>
                <div class="time-slots">
                  <div
                    v-for="slot in availableTimeSlots"
                    :key="slot"
                    class="time-slot"
                    :class="{ selected: selectedTime === slot }"
                    @click="selectedTime = slot"
                  >
                    {{ slot }}
                  </div>
                </div>
              </div>
            </div>

            <div class="step-actions">
              <button class="back-btn" @click="bookingStep = 1">
                <i class="fas fa-arrow-left"></i> Back
              </button>
              <button
                class="next-btn"
                :disabled="!selectedDate || !selectedTime"
                @click="bookingStep = 3"
              >
                Next: Confirm Appointment
              </button>
            </div>
          </div>

          <!-- Step 3: Confirm Appointment -->
          <div v-if="bookingStep === 3" class="step-content">
            <h3>Confirm Your Appointment</h3>

            <div class="appointment-summary">
              <div class="summary-item">
                <div class="summary-label">Doctor:</div>
                <div class="summary-value">
                  Dr. {{ selectedDoctor.first_name }}
                  {{ selectedDoctor.last_name }}
                </div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Specialty:</div>
                <div class="summary-value">
                  {{ selectedDoctor.specialization }}
                </div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Date:</div>
                <div class="summary-value">
                  {{ formatDate(selectedDateTime, "dddd, MMMM D, YYYY") }}
                </div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Time:</div>
                <div class="summary-value">{{ selectedTime }}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Location:</div>
                <div class="summary-value">{{ selectedDoctor.workplace }}</div>
              </div>
            </div>

            <div class="notes-section">
              <label for="appointment-notes">Additional Notes:</label>
              <textarea
                id="appointment-notes"
                v-model="appointmentNotes"
                placeholder="Any specific concerns or information for the doctor..."
              ></textarea>
            </div>

            <div class="step-actions">
              <button class="back-btn" @click="bookingStep = 2">
                <i class="fas fa-arrow-left"></i> Back
              </button>
              <button class="confirm-btn" @click="bookAppointment">
                <i class="fas fa-calendar-check"></i> Confirm Appointment
              </button>
            </div>
          </div>
        </div>

        <!-- My Appointments -->
        <div v-if="activeTab === 'appointments'" class="my-appointments">
          <h2>My Appointments</h2>

          <div class="appointment-filters">
            <button
              class="filter-btn"
              :class="{ active: appointmentFilter === 'upcoming' }"
              @click="appointmentFilter = 'upcoming'"
            >
              Upcoming
            </button>
            <button
              class="filter-btn"
              :class="{ active: appointmentFilter === 'past' }"
              @click="appointmentFilter = 'past'"
            >
              Past
            </button>
            <button
              class="filter-btn"
              :class="{ active: appointmentFilter === 'cancelled' }"
              @click="appointmentFilter = 'cancelled'"
            >
              Cancelled
            </button>
          </div>

          <div class="appointment-list">
            <div
              v-for="appt in filteredAppointments"
              :key="appt.id"
              class="appointment-card"
              :class="{
                upcoming:
                  appt.status === 'scheduled' &&
                  new Date(appt.date) > new Date(),
                past:
                  appt.status === 'completed' ||
                  new Date(appt.date) < new Date(),
                cancelled: appt.status === 'cancelled',
              }"
            >
              <div class="appt-date">
                <div class="appt-day">{{ formatDate(appt.date, "MMM D") }}</div>
                <div class="appt-time">
                  {{ formatDate(appt.date, "h:mm a") }}
                </div>
                <div class="appt-status" :class="appt.status">
                  {{ appt.status }}
                </div>
              </div>
              <div class="appt-info">
                <div class="appt-doctor">
                  Dr. {{ appt.doctor.first_name }} {{ appt.doctor.last_name }}
                </div>
                <div class="appt-specialty">
                  {{ appt.doctor.specialization }}
                </div>
                <div class="appt-notes" v-if="appt.notes">{{ appt.notes }}</div>
              </div>
              <div class="appt-location">
                <i class="fas fa-map-marker-alt"></i>
                {{ appt.doctor.workplace }}
              </div>
              <button
                v-if="
                  appt.status === 'scheduled' &&
                  new Date(appt.date) > new Date()
                "
                class="cancel-btn"
                @click="cancelAppointment(appt.id)"
              >
                Cancel
              </button>
            </div>
          </div>

          <div v-if="filteredAppointments.length === 0" class="empty-state">
            <i class="fas fa-calendar-times"></i>
            <p>No appointments found</p>
          </div>
        </div>

        <!-- My Profile -->
        <div v-if="activeTab === 'profile'" class="my-profile">
          <h2>My Profile</h2>

          <div class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="patient.first_name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="patient.last_name" />
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="patient.email" disabled />
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" v-model="patient.phone" />
            </div>

            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" v-model="patient.dob" />
            </div>

            <div class="form-group">
              <label>Primary Health Concern</label>
              <input type="text" v-model="patient.health_concern" />
            </div>

            <div class="form-group">
              <label>Medical Conditions</label>
              <textarea v-model="patient.medical_conditions"></textarea>
            </div>

            <div class="form-group">
              <label>Medications</label>
              <textarea v-model="patient.medications"></textarea>
            </div>

            <div class="form-actions">
              <button class="save-btn" @click="updateProfile">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="showNotification"
      class="notification-toast"
      :class="notificationType"
    >
      <i :class="notificationIcon"></i>
      <div class="notification-content">
        <div class="notification-title">{{ notificationTitle }}</div>
        <div class="notification-message">{{ notificationMessage }}</div>
      </div>
      <button class="close-btn" @click="showNotification = false">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "dashboard",
      patient: {
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        health_concern: "",
        medical_conditions: "",
        medications: "",
      },
      doctors: [],
      appointments: [],
      appointmentFilter: "upcoming",

      // Booking appointment data
      bookingStep: 1,
      doctorSearch: "",
      selectedDoctor: null,
      selectedDate: null,
      selectedTime: null,
      appointmentNotes: "",
      currentMonth: new Date(),
      availableTimeSlots: [
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ],

      // Notification system
      showNotification: false,
      notificationType: "success",
      notificationTitle: "",
      notificationMessage: "",
      notificationIcon: "fas fa-check-circle",
    };
  },
  computed: {
    patientInitials() {
      if (this.patient.first_name && this.patient.last_name) {
        return (
          this.patient.first_name.charAt(0) + this.patient.last_name.charAt(0)
        );
      }
      return "P";
    },
    filteredDoctors() {
      if (!this.doctorSearch) return this.doctors;
      const search = this.doctorSearch.toLowerCase();
      return this.doctors.filter(
        (doctor) =>
          doctor.first_name.toLowerCase().includes(search) ||
          doctor.last_name.toLowerCase().includes(search) ||
          doctor.specialization.toLowerCase().includes(search) ||
          doctor.workplace.toLowerCase().includes(search)
      );
    },
    selectedDateTime() {
      if (!this.selectedDate || !this.selectedTime) return null;
      const [time, modifier] = this.selectedTime.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const date = new Date(this.selectedDate);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
    upcomingAppointments() {
      const now = new Date();
      return this.appointments
        .filter(
          (appt) => appt.status === "scheduled" && new Date(appt.date) > now
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    pastAppointments() {
      const now = new Date();
      return this.appointments
        .filter(
          (appt) => appt.status === "completed" || new Date(appt.date) < now
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    filteredAppointments() {
      if (this.appointmentFilter === "upcoming")
        return this.upcomingAppointments;
      if (this.appointmentFilter === "past") return this.pastAppointments;
      return this.appointments.filter((appt) => appt.status === "cancelled");
    },
    daysInMonth() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth();

      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);

      // Days from previous month to show
      const days = [];
      const startingDayOfWeek = firstDay.getDay();

      // Previous month days
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const date = new Date(year, month - 1, day);
        days.push({
          day,
          date,
          isCurrentMonth: false,
        });
      }

      // Current month days
      const daysInMonth = lastDay.getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push({
          day: i,
          date,
          isCurrentMonth: true,
        });
      }

      // Next month days to fill the grid
      const endingDayOfWeek = lastDay.getDay();
      for (let i = 1; i < 7 - endingDayOfWeek; i++) {
        const date = new Date(year, month + 1, i);
        days.push({
          day: i,
          date,
          isCurrentMonth: false,
        });
      }

      return days;
    },
  },
  async mounted() {
    await this.fetchPatientData();
    await this.fetchDoctors();
    await this.fetchAppointments();
  },
  methods: {
    async fetchPatientData() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (user) {
          const { data, error } = await this.$supabase
            .from("patients")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (error) throw error;
          this.patient = { ...data, email: user.email };
        }
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load patient data",
          "error"
        );
      }
    },
    async fetchDoctors() {
      try {
        const { data, error } = await this.$supabase
          .from("doctors")
          .select("*");

        if (error) throw error;
        this.doctors = data;
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load doctors",
          "error"
        );
      }
    },
    async fetchAppointments() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await this.$supabase
          .from("appointments")
          .select("*, doctor:doctors(*)")
          .eq("patient_id", user.id)
          .order("date", { ascending: true });

        if (error) throw error;
        this.appointments = data;
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load appointments",
          "error"
        );
      }
    },
    async bookAppointment() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const doctorLastName = this.selectedDoctor
          ? this.selectedDoctor.last_name
          : "";

        const { error } = await this.$supabase.from("appointments").insert({
          patient_id: user.id,
          doctor_id: this.selectedDoctor.user_id,
          date: this.selectedDateTime,
          notes: this.appointmentNotes,
          status: "scheduled",
        });

        if (error) throw error;

        // Reset booking flow
        this.bookingStep = 1;
        this.selectedDoctor = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.appointmentNotes = "";

        // Refresh appointments
        await this.fetchAppointments();

        // Show success message
        this.showNotificationMessage(
          "Appointment Booked!",
          `Your appointment with Dr. ${doctorLastName} has been scheduled`,
          "success"
        );

        // Switch to appointments tab
        this.activeTab = "appointments";
      } catch (error) {
        this.showNotificationMessage(
          "Booking Failed",
          "There was an error scheduling your appointment",
          "error"
        );
      }
    },
    async cancelAppointment(appointmentId) {
      try {
        const { error } = await this.$supabase
          .from("appointments")
          .update({ status: "cancelled" })
          .eq("id", appointmentId);

        if (error) throw error;

        await this.fetchAppointments();
        this.showNotificationMessage(
          "Appointment Cancelled",
          "Your appointment has been successfully cancelled",
          "success"
        );
      } catch (error) {
        this.showNotificationMessage(
          "Cancellation Failed",
          "There was an error cancelling your appointment",
          "error"
        );
      }
    },
    async updateProfile() {
      try {
        const { error } = await this.$supabase
          .from("patients")
          .update({
            first_name: this.patient.first_name,
            last_name: this.patient.last_name,
            phone: this.patient.phone,
            dob: this.patient.dob,
            health_concern: this.patient.health_concern,
            medical_conditions: this.patient.medical_conditions,
            medications: this.patient.medications,
          })
          .eq("user_id", this.patient.user_id);

        if (error) throw error;

        this.showNotificationMessage(
          "Profile Updated",
          "Your profile information has been saved successfully",
          "success"
        );
      } catch (error) {
        this.showNotificationMessage(
          "Update Failed",
          "There was an error updating your profile",
          "error"
        );
      }
    },
    async logout() {
      try {
        const { error } = await this.$supabase.auth.signOut();
        if (error) throw error;
        this.$router.push("/login");
      } catch (error) {
        this.showNotificationMessage("Error", "Failed to log out", "error");
      }
    },
    selectDoctor(doctor) {
      this.selectedDoctor = doctor;
    },
    filterDoctors() {
      // The filteredDoctors computed property handles the filtering
    },
    prevMonth() {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        1
      );
    },
    selectDate(date) {
      if (this.isAvailable(date)) {
        this.selectedDate = date;
      }
    },
    isAvailable(date) {
      // In a real app, this would check doctor's availability
      // For demo, just disallow weekends and past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.getDay() !== 0 && date.getDay() !== 6 && date >= today;
    },
    isSameDay(date1, date2) {
      if (!date1 || !date2) return false;
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    },
    formatDate(date, format) {
      if (!date) return "";
      const d = new Date(date);

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      if (format === "dddd") {
        return d.toLocaleDateString("en-US", { weekday: "long" });
      }
      if (format === "h:mm a") {
        return d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      }
      if (format === "MMM D") {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      if (format === "dddd, MMMM D, YYYY") {
        return d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      return d.toLocaleDateString("en-US", options);
    },
    showNotificationMessage(title, message, type) {
      this.notificationTitle = title;
      this.notificationMessage = message;
      this.notificationType = type;

      if (type === "success") {
        this.notificationIcon = "fas fa-check-circle";
      } else if (type === "error") {
        this.notificationIcon = "fas fa-exclamation-circle";
      } else {
        this.notificationIcon = "fas fa-info-circle";
      }

      this.showNotification = true;

      // Auto hide after 5 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
$primary: #4361ee;
$secondary: #3f37c9;
$success: #4cc9f0;
$light: #f8f9fa;
$dark: #212529;
$gray: #6c757d;
$light-gray: #e9ecef;
$danger: #e63946;
$warning: #ffaa00;
$card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
$transition: all 0.3s ease;

.patient-dashboard {
  background-color: #f0f2f5;
  min-height: 100vh;
  color: $dark;
  line-height: 1.6;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: $card-shadow;
  margin-bottom: 25px;

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
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, $primary, $secondary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 18px;
    }

    .user-name {
      font-weight: 500;
      font-size: 16px;
    }

    .logout-btn {
      background: $light-gray;
      border: none;
      padding: 6px 15px;
      border-radius: 20px;
      font-size: 14px;
      cursor: pointer;
      transition: $transition;

      &:hover {
        background: darken($light-gray, 5%);
      }
    }
  }
}

.dashboard-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 25px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: $card-shadow;
  height: fit-content;

  @media (max-width: 992px) {
    display: none;
  }
}

.profile-header {
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid $light-gray;

  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary, $secondary);
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: white;
    font-weight: 600;
  }

  .profile-name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .profile-role {
    color: $gray;
    font-size: 14px;
    background: $light-gray;
    padding: 4px 12px;
    border-radius: 20px;
    display: inline-block;
  }
}

.dashboard-nav {
  .nav-item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    border-radius: 10px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: $transition;
    color: $gray;

    i {
      margin-right: 12px;
      width: 24px;
      text-align: center;
    }

    &:hover {
      background: rgba($primary, 0.1);
      color: $primary;
    }

    &.active {
      background: $primary;
      color: white;
      font-weight: 500;
    }
  }
}

.main-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: $card-shadow;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: $dark;
  }

  .subtitle {
    color: $gray;
    margin-bottom: 25px;
    font-size: 16px;
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .stat-card {
    background: linear-gradient(135deg, $primary, lighten($secondary, 10%));
    color: white;
    border-radius: 15px;
    padding: 25px;
    text-align: center;
    box-shadow: $card-shadow;

    .stat-value {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 16px;
      opacity: 0.9;
    }
  }
}

.section {
  background: $light;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: $dark;
    display: flex;
    align-items: center;
    gap: 10px;

    i {
      color: $primary;
    }
  }
}

.appointment-list {
  display: grid;
  gap: 15px;
}

.appointment-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: $card-shadow;
  transition: $transition;
  border-left: 4px solid $primary;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .appt-date {
    text-align: center;
    padding-right: 20px;
    border-right: 1px solid $light-gray;
    min-width: 100px;

    .appt-day {
      font-size: 18px;
      font-weight: 600;
      color: $primary;
    }

    .appt-time {
      font-size: 14px;
      color: $gray;
    }

    .appt-status {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 5px;
      background: $light-gray;
      color: $gray;

      &.scheduled {
        background: rgba($success, 0.2);
        color: darken($success, 20%);
      }

      &.completed {
        background: rgba($primary, 0.2);
        color: darken($primary, 10%);
      }

      &.cancelled {
        background: rgba($danger, 0.2);
        color: darken($danger, 10%);
      }
    }
  }

  .appt-info {
    flex: 1;
    padding: 0 20px;

    .appt-doctor {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .appt-specialty {
      color: $primary;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .appt-location {
      color: $gray;
      font-size: 14px;
    }

    .appt-notes {
      margin-top: 10px;
      padding: 10px;
      background: $light;
      border-radius: 8px;
      font-size: 14px;
      color: $dark;
    }
  }

  .cancel-btn {
    background: rgba($danger, 0.1);
    color: $danger;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: $transition;

    &:hover {
      background: rgba($danger, 0.2);
    }
  }
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: $gray;

  i {
    font-size: 48px;
    margin-bottom: 15px;
    color: lighten($gray, 20%);
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .primary-btn {
    background: $primary;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;

    &:hover {
      background: darken($primary, 5%);
      transform: translateY(-2px);
    }
  }
}

.booking-steps {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background: $light-gray;
    z-index: 1;
  }

  .step {
    text-align: center;
    position: relative;
    z-index: 2;

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $light-gray;
      color: $gray;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 10px;
      font-weight: 600;
      border: 2px solid $light-gray;
    }

    .step-label {
      font-size: 14px;
      color: $gray;
    }

    &.active {
      .step-number {
        background: white;
        border-color: $primary;
        color: $primary;
      }

      .step-label {
        color: $dark;
        font-weight: 500;
      }
    }
  }
}

.step-content {
  background: $light;
  border-radius: 15px;
  padding: 30px;
}

.search-box {
  position: relative;
  margin-bottom: 25px;

  input {
    width: 100%;
    padding: 15px 20px 15px 50px;
    border: 1px solid $light-gray;
    border-radius: 50px;
    font-size: 16px;
    transition: $transition;

    &:focus {
      border-color: $primary;
      outline: none;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
  }

  i {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: $gray;
  }
}

.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.doctor-card {
  display: flex;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: $card-shadow;
  transition: $transition;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border-color: $primary;
    background: rgba($primary, 0.05);
  }

  .doctor-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary, $secondary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .doctor-info {
    h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .doctor-specialty {
      color: $primary;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .doctor-exp {
      color: $gray;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .doctor-hospital {
      color: $dark;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.date-time-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.calendar {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: $card-shadow;

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .current-month {
      font-weight: 600;
      font-size: 18px;
    }

    .nav-btn {
      background: $light;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      transition: $transition;

      &:hover {
        background: $light-gray;
      }
    }
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    color: $gray;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;

    .day {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      transition: $transition;
      font-weight: 500;

      &:hover {
        background: $light;
      }

      &.current-month {
        color: $dark;
      }

      &:not(.current-month) {
        color: $light-gray;
        cursor: default;
      }

      &.selected {
        background: $primary;
        color: white;
      }

      &.disabled {
        color: lighten($gray, 30%);
        cursor: not-allowed;
        text-decoration: line-through;
      }
    }
  }
}

.time-section {
  h3 {
    margin-bottom: 15px;
  }
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.time-slot {
  padding: 12px 10px;
  background: white;
  border: 1px solid $light-gray;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: $transition;
  font-weight: 500;

  &:hover {
    border-color: $primary;
    background: rgba($primary, 0.05);
  }

  &.selected {
    background: $primary;
    color: white;
    border-color: $primary;
  }
}

.appointment-summary {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: $card-shadow;
}

.summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid $light-gray;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .summary-label {
    width: 120px;
    font-weight: 500;
    color: $gray;
  }

  .summary-value {
    flex: 1;
    font-weight: 500;
  }
}

.notes-section {
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
  }

  textarea {
    width: 100%;
    min-height: 120px;
    padding: 15px;
    border: 1px solid $light-gray;
    border-radius: 15px;
    font-size: 16px;
    transition: $transition;

    &:focus {
      border-color: $primary;
      outline: none;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
  }
}

.step-actions {
  display: flex;
  justify-content: space-between;

  .back-btn {
    background: $light;
    border: none;
    padding: 12px 25px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: $transition;

    &:hover {
      background: $light-gray;
    }
  }

  .next-btn,
  .confirm-btn {
    background: $primary;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;

    &:hover {
      background: darken($primary, 5%);
      transform: translateY(-2px);
    }

    &:disabled {
      background: $light-gray;
      color: $gray;
      cursor: not-allowed;
      transform: none;
    }
  }

  .confirm-btn {
    background: $success;

    &:hover {
      background: darken($success, 5%);
    }
  }
}

.appointment-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  .filter-btn {
    background: $light;
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: $transition;

    &:hover,
    &.active {
      background: $primary;
      color: white;
    }
  }
}

.my-appointments {
  .appointment-card {
    position: relative;

    &.upcoming {
      border-left-color: $success;
    }

    &.past {
      border-left-color: $primary;
      opacity: 0.8;
    }

    &.cancelled {
      border-left-color: $danger;
      opacity: 0.7;
    }

    .appt-location {
      margin-right: 15px;
      color: $gray;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.profile-form {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input,
    textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid $light-gray;
      border-radius: 10px;
      font-size: 16px;
      transition: $transition;

      &:focus {
        border-color: $primary;
        outline: none;
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
      }
    }

    textarea {
      min-height: 100px;
    }
  }

  .form-actions {
    text-align: right;
    margin-top: 20px;

    .save-btn {
      background: $primary;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: $transition;

      &:hover {
        background: darken($primary, 5%);
        transform: translateY(-2px);
      }
    }
  }
}

.notification-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  max-width: 400px;

  i {
    font-size: 24px;
    margin-right: 15px;
  }

  .notification-content {
    flex: 1;

    .notification-title {
      font-weight: 600;
      margin-bottom: 5px;
    }

    .notification-message {
      font-size: 14px;
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-left: 15px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  &.success {
    background: #d4edda;
    color: #155724;
    border-left: 5px solid #28a745;
  }

  &.error {
    background: #f8d7da;
    color: #721c24;
    border-left: 5px solid #dc3545;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
