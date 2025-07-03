<template lang="html">
  <div class="doctor-dashboard">
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
          {{ doctorInitials }}
        </div>
        <div>
          <div class="user-name">
            Dr. {{ doctor.first_name }} {{ doctor.last_name }}
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
            {{ doctorInitials }}
          </div>
          <h2 class="profile-name">
            Dr. {{ doctor.first_name }} {{ doctor.last_name }}
          </h2>
          <div class="profile-role">Doctor</div>
          <div class="profile-specialty">{{ doctor.specialization }}</div>
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
            :class="{ active: activeTab === 'schedule' }"
            @click="
              activeTab = 'schedule';
              fetchAppointments();
            "
          >
            <i class="fas fa-calendar-alt"></i>
            <span>My Schedule</span>
          </div>
          <div
            class="nav-item"
            :class="{ active: activeTab === 'patients' }"
            @click="
              activeTab = 'patients';
              fetchPatients();
            "
          >
            <i class="fas fa-user-injured"></i>
            <span>My Patients</span>
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
          <h2>Welcome back, Dr. {{ doctor.last_name }}</h2>
          <p class="subtitle">Your practice overview</p>

          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-value">{{ upcomingAppointments.length }}</div>
              <div class="stat-label">Upcoming Appointments</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ patients.length }}</div>
              <div class="stat-label">Active Patients</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ todaysAppointments.length }}</div>
              <div class="stat-label">Appointments Today</div>
            </div>
          </div>

          <div class="section">
            <h3>Today's Appointments</h3>
            <div v-if="todaysAppointments.length > 0" class="appointment-list">
              <div
                v-for="appt in todaysAppointments"
                :key="appt.id"
                class="appointment-card"
              >
                <div class="appt-date">
                  <div class="appt-time">
                    {{ formatDate(appt.date, "h:mm a") }}
                  </div>
                </div>
                <div class="appt-info">
                  <div class="appt-patient">
                    {{ appt.patient.first_name }} {{ appt.patient.last_name }}
                  </div>
                  <div class="appt-concern">
                    {{ appt.patient.health_concern }}
                  </div>
                  <div class="appt-notes" v-if="appt.notes">
                    {{ appt.notes }}
                  </div>
                </div>
                <div class="appt-actions">
                  <button
                    v-if="appt.status === 'scheduled'"
                    class="complete-btn"
                    @click="updateAppointmentStatus(appt.id, 'completed')"
                  >
                    Mark Complete
                  </button>
                  <button
                    v-if="appt.status === 'scheduled'"
                    class="cancel-btn"
                    @click="updateAppointmentStatus(appt.id, 'cancelled')"
                  >
                    Cancel
                  </button>
                  <span
                    v-if="appt.status === 'completed'"
                    class="badge completed"
                    >Completed</span
                  >
                  <span
                    v-if="appt.status === 'cancelled'"
                    class="badge cancelled"
                    >Cancelled</span
                  >
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <i class="fas fa-calendar-times"></i>
              <p>No appointments scheduled for today</p>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div v-if="activeTab === 'schedule'" class="my-schedule">
          <h2>My Appointment Schedule</h2>

          <div class="schedule-header">
            <div class="date-navigation">
              <button class="nav-btn" @click="prevWeek">
                <i class="fas fa-chevron-left"></i> Previous Week
              </button>
              <div class="current-week">{{ weekRange }}</div>
              <button class="nav-btn" @click="nextWeek">
                Next Week <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <div class="view-options">
              <button
                class="view-btn"
                :class="{ active: scheduleView === 'day' }"
                @click="scheduleView = 'day'"
              >
                Day
              </button>
              <button
                class="view-btn"
                :class="{ active: scheduleView === 'week' }"
                @click="scheduleView = 'week'"
              >
                Week
              </button>
              <button
                class="view-btn"
                :class="{ active: scheduleView === 'month' }"
                @click="scheduleView = 'month'"
              >
                Month
              </button>
            </div>
          </div>

          <!-- Week View -->
          <div v-if="scheduleView === 'week'" class="week-view">
            <div class="week-grid">
              <div class="time-column">
                <div class="time-header"></div>
                <div v-for="hour in hours" :key="hour" class="time-slot">
                  {{ hour }}:00
                </div>
              </div>
              <div
                v-for="day in weekDays"
                :key="day.date"
                class="day-column"
                :class="{ today: isToday(day.date) }"
              >
                <div class="day-header">
                  <div class="day-name">{{ day.name }}</div>
                  <div class="day-date">
                    {{ formatDate(day.date, "MMM d") }}
                  </div>
                </div>
                <div
                  v-for="hour in hours"
                  :key="hour"
                  class="time-slot"
                  @click="openNewAppointment(day.date, hour)"
                >
                  <div
                    v-for="appt in getAppointmentsForDayAndHour(day.date, hour)"
                    :key="appt.id"
                    class="appointment-block"
                    :class="appt.status"
                  >
                    <div class="appt-time">
                      {{ formatDate(appt.date, "h:mm a") }}
                    </div>
                    <div class="appt-patient">
                      {{ appt.patient.first_name }} {{ appt.patient.last_name }}
                    </div>
                    <div class="appt-status">{{ appt.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="appointment-list">
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

            <div
              v-for="appt in filteredAppointments"
              :key="appt.id"
              class="appointment-card"
            >
              <div class="appt-date">
                <div class="appt-day">{{ formatDate(appt.date, "MMM d") }}</div>
                <div class="appt-time">
                  {{ formatDate(appt.date, "h:mm a") }}
                </div>
                <div class="appt-status" :class="appt.status">
                  {{ appt.status }}
                </div>
              </div>
              <div class="appt-info">
                <div class="appt-patient">
                  {{ appt.patient.first_name }} {{ appt.patient.last_name }}
                </div>
                <div class="appt-phone">
                  <i class="fas fa-phone"></i> {{ appt.patient.phone }}
                </div>
                <div class="appt-concern">
                  Concern: {{ appt.patient.health_concern }}
                </div>
                <div class="appt-notes" v-if="appt.notes">{{ appt.notes }}</div>
              </div>
              <div class="appt-actions">
                <button
                  v-if="appt.status === 'scheduled'"
                  class="complete-btn"
                  @click="updateAppointmentStatus(appt.id, 'completed')"
                >
                  Complete
                </button>
                <button
                  v-if="appt.status === 'scheduled'"
                  class="cancel-btn"
                  @click="updateAppointmentStatus(appt.id, 'cancelled')"
                >
                  Cancel
                </button>
                <button
                  class="details-btn"
                  @click="viewPatientDetails(appt.patient.user_id)"
                >
                  View Patient
                </button>
              </div>
            </div>

            <div v-if="filteredAppointments.length === 0" class="empty-state">
              <i class="fas fa-calendar-times"></i>
              <p>No appointments found</p>
            </div>
          </div>
        </div>

        <!-- Patients -->
        <div v-if="activeTab === 'patients'" class="my-patients">
          <h2>My Patients</h2>

          <div class="search-box">
            <input
              type="text"
              v-model="patientSearch"
              placeholder="Search patients by name..."
              @input="filterPatients"
            />
            <i class="fas fa-search"></i>
          </div>

          <div class="patient-grid">
            <div
              v-for="patient in filteredPatients"
              :key="patient.user_id"
              class="patient-card"
            >
              <div class="patient-avatar">
                {{ patient.first_name.charAt(0)
                }}{{ patient.last_name.charAt(0) }}
              </div>
              <div class="patient-info">
                <h3>{{ patient.first_name }} {{ patient.last_name }}</h3>
                <div class="patient-dob">
                  DOB: {{ formatDate(patient.dob, "MMM d, yyyy") }}
                </div>
                <div class="patient-phone">
                  <i class="fas fa-phone"></i> {{ patient.phone }}
                </div>
                <div class="patient-concern">
                  Primary Concern: {{ patient.health_concern }}
                </div>
              </div>
              <div class="patient-actions">
                <button
                  class="details-btn"
                  @click="viewPatientDetails(patient.user_id)"
                >
                  View Details
                </button>
                <button
                  class="appointment-btn"
                  @click="bookForPatient(patient)"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredPatients.length === 0" class="empty-state">
            <i class="fas fa-user-times"></i>
            <p>No patients found</p>
          </div>
        </div>

        <!-- My Profile -->
        <div v-if="activeTab === 'profile'" class="my-profile">
          <h2>My Profile</h2>

          <div class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" v-model="doctor.first_name" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" v-model="doctor.last_name" />
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="doctor.email" disabled />
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" v-model="doctor.phone" />
            </div>

            <div class="form-group">
              <label>Specialization</label>
              <input type="text" v-model="doctor.specialization" />
            </div>

            <div class="form-group">
              <label>License Number</label>
              <input type="text" v-model="doctor.license" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Years of Experience</label>
                <input type="number" v-model="doctor.experience" />
              </div>
              <div class="form-group">
                <label>Workplace/Hospital</label>
                <input type="text" v-model="doctor.workplace" />
              </div>
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

    <!-- Patient Detail Modal -->
    <div
      v-if="showPatientModal"
      class="modal-backdrop"
      @click.self="closePatientModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3>Patient Details</h3>
          <button class="close-btn" @click="closePatientModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" v-if="selectedPatient">
          <div class="patient-detail-header">
            <div class="patient-avatar-large">
              {{ selectedPatient.first_name.charAt(0)
              }}{{ selectedPatient.last_name.charAt(0) }}
            </div>
            <div>
              <h2>
                {{ selectedPatient.first_name }} {{ selectedPatient.last_name }}
              </h2>
              <div class="patient-contact">
                <div>
                  <i class="fas fa-phone"></i> {{ selectedPatient.phone }}
                </div>
                <div>
                  <i class="fas fa-envelope"></i> {{ selectedPatient.email }}
                </div>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>Personal Information</h4>
            <div class="detail-row">
              <div class="detail-label">Date of Birth:</div>
              <div class="detail-value">
                {{ formatDate(selectedPatient.dob, "MMM d, yyyy") }}
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Age:</div>
              <div class="detail-value">
                {{ calculateAge(selectedPatient.dob) }}
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>Health Information</h4>
            <div class="detail-row">
              <div class="detail-label">Primary Concern:</div>
              <div class="detail-value">
                {{ selectedPatient.health_concern }}
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Medical Conditions:</div>
              <div class="detail-value">
                {{ selectedPatient.medical_conditions || "None reported" }}
              </div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Medications:</div>
              <div class="detail-value">
                {{ selectedPatient.medications || "None reported" }}
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h4>Appointment History</h4>
            <div class="appointment-history">
              <div
                v-for="appt in patientAppointments"
                :key="appt.id"
                class="history-item"
              >
                <div class="history-date">
                  {{ formatDate(appt.date, "MMM d, yyyy h:mm a") }}
                </div>
                <div class="history-status" :class="appt.status">
                  {{ appt.status }}
                </div>
                <div class="history-notes" v-if="appt.notes">
                  {{ appt.notes }}
                </div>
              </div>
              <div
                v-if="patientAppointments.length === 0"
                class="empty-history"
              >
                No appointment history found
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button
              class="appointment-btn"
              @click="bookForPatient(selectedPatient)"
            >
              Book New Appointment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Appointment Modal -->
    <div
      v-if="showAppointmentModal"
      class="modal-backdrop"
      @click.self="closeAppointmentModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3>New Appointment</h3>
          <button class="close-btn" @click="closeAppointmentModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Patient</label>
            <div class="patient-display">
              <div class="patient-avatar-small">
                {{ newAppointmentPatient.first_name.charAt(0)
                }}{{ newAppointmentPatient.last_name.charAt(0) }}
              </div>
              <div>
                {{ newAppointmentPatient.first_name }}
                {{ newAppointmentPatient.last_name }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Date</label>
              <input type="date" v-model="newAppointmentDate" />
            </div>
            <div class="form-group">
              <label>Time</label>
              <select v-model="newAppointmentTime">
                <option
                  v-for="time in availableTimes"
                  :key="time"
                  :value="time"
                >
                  {{ time }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Notes</label>
            <textarea
              v-model="newAppointmentNotes"
              placeholder="Reason for appointment..."
            ></textarea>
          </div>

          <div class="modal-actions">
            <button class="cancel-btn" @click="closeAppointmentModal">
              Cancel
            </button>
            <button class="confirm-btn" @click="createAppointment">
              Book Appointment
            </button>
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
      doctor: {
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        specialization: "",
        license: "",
        experience: "",
        workplace: "",
      },
      appointments: [],
      patients: [],
      scheduleView: "week",
      appointmentFilter: "upcoming",
      currentWeek: new Date(),
      hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      patientSearch: "",

      // Modals
      showPatientModal: false,
      selectedPatient: null,
      patientAppointments: [],
      showAppointmentModal: false,
      newAppointmentPatient: null,
      newAppointmentDate: "",
      newAppointmentTime: "",
      newAppointmentNotes: "",

      // Notification system
      showNotification: false,
      notificationType: "success",
      notificationTitle: "",
      notificationMessage: "",
      notificationIcon: "fas fa-check-circle",
    };
  },
  computed: {
    doctorInitials() {
      if (this.doctor.first_name && this.doctor.last_name) {
        return (
          this.doctor.first_name.charAt(0) + this.doctor.last_name.charAt(0)
        );
      }
      return "D";
    },
    weekDays() {
      const days = [];
      const startDate = new Date(this.currentWeek);
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        days.push({
          name: date.toLocaleDateString("en-US", { weekday: "short" }),
          date: date.toISOString().split("T")[0],
        });
      }
      return days;
    },
    weekRange() {
      const start = new Date(this.weekDays[0].date);
      const end = new Date(this.weekDays[6].date);
      return `${this.formatDate(start, "MMM d")} - ${this.formatDate(end, "MMM d, yyyy")}`;
    },
    filteredAppointments() {
      const now = new Date();
      if (this.appointmentFilter === "upcoming") {
        return this.appointments
          .filter(
            (appt) => appt.status === "scheduled" && new Date(appt.date) > now
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      if (this.appointmentFilter === "past") {
        return this.appointments
          .filter(
            (appt) => appt.status === "completed" || new Date(appt.date) < now
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return this.appointments
        .filter((appt) => appt.status === "cancelled")
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    filteredPatients() {
      if (!this.patientSearch) return this.patients;
      const search = this.patientSearch.toLowerCase();
      return this.patients.filter(
        (patient) =>
          patient.first_name.toLowerCase().includes(search) ||
          patient.last_name.toLowerCase().includes(search) ||
          patient.phone.includes(search)
      );
    },
    upcomingAppointments() {
      const now = new Date();
      return this.appointments
        .filter(
          (appt) => appt.status === "scheduled" && new Date(appt.date) > now
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    todaysAppointments() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return this.appointments
        .filter((appt) => {
          const apptDate = new Date(appt.date);
          return apptDate >= today && apptDate < tomorrow;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    availableTimes() {
      return [
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ];
    },
  },
  async mounted() {
    await this.fetchDoctorData();
    await this.fetchAppointments();
  },
  methods: {
    async fetchDoctorData() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (user) {
          const { data, error } = await this.$supabase
            .from("doctors")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (error) throw error;
          this.doctor = { ...data, email: user.email };
        }
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load doctor data",
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
          .select("*, patient:patients(*)")
          .eq("doctor_id", user.id)
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
    async fetchPatients() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (!user) return;

        // Get unique patients from appointments
        const patientIds = [
          ...new Set(this.appointments.map((appt) => appt.patient_id)),
        ];

        if (patientIds.length > 0) {
          const { data, error } = await this.$supabase
            .from("patients")
            .select("*")
            .in("user_id", patientIds);

          if (error) throw error;
          this.patients = data;
        }
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load patients",
          "error"
        );
      }
    },
    async updateAppointmentStatus(appointmentId, status) {
      try {
        const { error } = await this.$supabase
          .from("appointments")
          .update({ status })
          .eq("id", appointmentId);

        if (error) throw error;

        // Refresh appointments
        await this.fetchAppointments();

        this.showNotificationMessage(
          "Appointment Updated",
          `Appointment status changed to ${status}`,
          "success"
        );
      } catch (error) {
        this.showNotificationMessage(
          "Update Failed",
          "There was an error updating the appointment",
          "error"
        );
      }
    },
    async updateProfile() {
      try {
        const { error } = await this.$supabase
          .from("doctors")
          .update({
            first_name: this.doctor.first_name,
            last_name: this.doctor.last_name,
            phone: this.doctor.phone,
            specialization: this.doctor.specialization,
            license: this.doctor.license,
            experience: this.doctor.experience,
            workplace: this.doctor.workplace,
          })
          .eq("user_id", this.doctor.user_id);

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
    async viewPatientDetails(patientId) {
      try {
        // Fetch patient details
        const { data: patientData, error: patientError } = await this.$supabase
          .from("patients")
          .select("*")
          .eq("user_id", patientId)
          .single();

        if (patientError) throw patientError;

        // Fetch patient appointments
        const { data: appointmentsData, error: appointmentsError } =
          await this.$supabase
            .from("appointments")
            .select("*")
            .eq("patient_id", patientId)
            .order("date", { ascending: false });

        if (appointmentsError) throw appointmentsError;

        this.selectedPatient = patientData;
        this.patientAppointments = appointmentsData;
        this.showPatientModal = true;
      } catch (error) {
        this.showNotificationMessage(
          "Error",
          "Failed to load patient details",
          "error"
        );
      }
    },
    async createAppointment() {
      try {
        const {
          data: { user },
        } = await this.$supabase.auth.getUser();
        if (!user) return;

        // Combine date and time
        const [time, modifier] = this.newAppointmentTime.split(" ");
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        const date = new Date(this.newAppointmentDate);
        date.setHours(hours);
        date.setMinutes(minutes);

        const { error } = await this.$supabase.from("appointments").insert({
          patient_id: this.newAppointmentPatient.user_id,
          doctor_id: user.id,
          date: date,
          notes: this.newAppointmentNotes,
          status: "scheduled",
        });

        if (error) throw error;

        // Close modal and refresh
        this.closeAppointmentModal();
        await this.fetchAppointments();

        this.showNotificationMessage(
          "Appointment Booked!",
          `Appointment for ${this.newAppointmentPatient.first_name} has been scheduled`,
          "success"
        );
      } catch (error) {
        this.showNotificationMessage(
          "Booking Failed",
          "There was an error scheduling the appointment",
          "error"
        );
      }
    },
    bookForPatient(patient) {
      this.newAppointmentPatient = patient;

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.newAppointmentDate = tomorrow.toISOString().split("T")[0];

      // Set default time
      this.newAppointmentTime = this.availableTimes[0];
      this.newAppointmentNotes = "";

      this.showAppointmentModal = true;
    },
    getAppointmentsForDayAndHour(day, hour) {
      return this.appointments.filter((appt) => {
        const apptDate = new Date(appt.date);
        const apptDay = apptDate.toISOString().split("T")[0];
        const apptHour = apptDate.getHours();
        return apptDay === day && apptHour === hour;
      });
    },
    openNewAppointment(day, hour) {
      // Set date to the selected day
      this.newAppointmentDate = day;

      // Set time to the selected hour
      const hourText = hour < 12 ? `${hour}:00 AM` : `${hour % 12}:00 PM`;
      this.newAppointmentTime = hourText;

      // Reset patient and notes
      this.newAppointmentPatient = null;
      this.newAppointmentNotes = "";

      this.showAppointmentModal = true;
    },
    closePatientModal() {
      this.showPatientModal = false;
      this.selectedPatient = null;
      this.patientAppointments = [];
    },
    closeAppointmentModal() {
      this.showAppointmentModal = false;
      this.newAppointmentPatient = null;
      this.newAppointmentDate = "";
      this.newAppointmentTime = "";
      this.newAppointmentNotes = "";
    },
    prevWeek() {
      const newWeek = new Date(this.currentWeek);
      newWeek.setDate(newWeek.getDate() - 7);
      this.currentWeek = newWeek;
    },
    nextWeek() {
      const newWeek = new Date(this.currentWeek);
      newWeek.setDate(newWeek.getDate() + 7);
      this.currentWeek = newWeek;
    },
    isToday(dateString) {
      const today = new Date();
      const date = new Date(dateString);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    formatDate(date, format) {
      if (!date) return "";
      const d = new Date(date);

      if (format === "dddd") {
        return d.toLocaleDateString("en-US", { weekday: "long" });
      }
      if (format === "h:mm a") {
        return d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      }
      if (format === "MMM d") {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      if (format === "MMM d, yyyy") {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      if (format === "MMM d, yyyy h:mm a") {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
      }

      return d.toLocaleDateString("en-US");
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
$primary: #3a86ff;
$secondary: #4361ee;
$success: #4cc9f0;
$light: #f8f9fa;
$dark: #212529;
$gray: #6c757d;
$light-gray: #e9ecef;
$danger: #e63946;
$warning: #ffaa00;
$card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
$transition: all 0.3s ease;

.doctor-dashboard {
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
    margin-bottom: 8px;
  }

  .profile-specialty {
    color: $primary;
    font-weight: 500;
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
    background: linear-gradient(135deg, $primary, $secondary);
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

    .appt-patient,
    .appt-doctor {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .appt-specialty,
    .appt-concern {
      color: $primary;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .appt-location,
    .appt-phone {
      color: $gray;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 5px;
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

  .appt-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 150px;

    button {
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: $transition;
      border: none;

      &.complete-btn {
        background: rgba($success, 0.1);
        color: darken($success, 20%);

        &:hover {
          background: rgba($success, 0.2);
        }
      }

      &.cancel-btn {
        background: rgba($danger, 0.1);
        color: $danger;

        &:hover {
          background: rgba($danger, 0.2);
        }
      }

      &.details-btn {
        background: rgba($primary, 0.1);
        color: $primary;

        &:hover {
          background: rgba($primary, 0.2);
        }
      }
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
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;

  .date-navigation {
    display: flex;
    align-items: center;
    gap: 15px;

    .nav-btn {
      background: $light;
      border: 1px solid $light-gray;
      padding: 8px 15px;
      border-radius: 30px;
      font-size: 14px;
      cursor: pointer;
      transition: $transition;
      display: flex;
      align-items: center;
      gap: 5px;

      &:hover {
        background: $light-gray;
      }
    }

    .current-week {
      font-weight: 600;
    }
  }

  .view-options {
    display: flex;
    gap: 10px;

    .view-btn {
      background: $light;
      border: 1px solid $light-gray;
      padding: 8px 15px;
      border-radius: 30px;
      font-size: 14px;
      cursor: pointer;
      transition: $transition;

      &:hover,
      &.active {
        background: $primary;
        color: white;
        border-color: $primary;
      }
    }
  }
}

.week-view {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: $card-shadow;
}

.week-grid {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
}

.time-column,
.day-column {
  border-right: 1px solid $light-gray;
  border-bottom: 1px solid $light-gray;

  &:last-child {
    border-right: none;
  }
}

.time-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: $light;
}

.day-header {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $light;
  font-weight: 600;

  .day-name {
    font-size: 14px;
    color: $gray;
  }

  .day-date {
    font-size: 16px;
  }
}

.day-column.today {
  .day-header {
    background: rgba($primary, 0.1);

    .day-date {
      color: $primary;
      font-weight: 600;
    }
  }
}

.time-slot {
  height: 60px;
  border-bottom: 1px solid $light-gray;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
}

.appointment-block {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: rgba($primary, 0.1);
  border-left: 3px solid $primary;
  border-radius: 6px;
  padding: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: rgba($primary, 0.2);
  }

  &.completed {
    background: rgba($success, 0.1);
    border-left-color: $success;
  }

  &.cancelled {
    background: rgba($danger, 0.1);
    border-left-color: $danger;
  }

  .appt-time {
    font-size: 10px;
    color: $gray;
  }

  .appt-patient {
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .appt-status {
    font-size: 10px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: white;
    padding: 2px 5px;
    border-radius: 10px;
  }
}

.patient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.patient-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: $card-shadow;
  display: flex;
  flex-direction: column;

  .patient-avatar {
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
    margin-bottom: 15px;
  }

  .patient-info {
    flex: 1;

    h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .patient-dob,
    .patient-concern {
      font-size: 14px;
      color: $gray;
      margin-bottom: 5px;
    }

    .patient-phone {
      display: flex;
      align-items: center;
      gap: 5px;
      color: $dark;
      margin-bottom: 10px;
    }
  }

  .patient-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    button {
      flex: 1;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: $transition;
      border: none;

      &.details-btn {
        background: rgba($primary, 0.1);
        color: $primary;

        &:hover {
          background: rgba($primary, 0.2);
        }
      }

      &.appointment-btn {
        background: rgba($success, 0.1);
        color: darken($success, 20%);

        &:hover {
          background: rgba($success, 0.2);
        }
      }
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
    select,
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

.modal-backdrop {
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
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid $light-gray;

    h3 {
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: $gray;

      &:hover {
        color: $dark;
      }
    }
  }

  .modal-body {
    padding: 20px;
  }
}

.patient-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;

  .patient-avatar-large {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary, $secondary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 32px;
    flex-shrink: 0;
  }

  .patient-contact {
    margin-top: 10px;
    color: $gray;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 5px;
    }
  }
}

.detail-section {
  margin-bottom: 25px;

  h4 {
    font-size: 18px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid $light-gray;
  }
}

.detail-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  margin-bottom: 10px;

  .detail-label {
    font-weight: 500;
    color: $gray;
  }
}

.appointment-history {
  max-height: 200px;
  overflow-y: auto;

  .history-item {
    padding: 12px;
    border-bottom: 1px solid $light-gray;

    &:last-child {
      border-bottom: none;
    }
  }

  .history-date {
    font-weight: 500;
  }

  .history-status {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 12px;
    margin: 5px 0;

    &.scheduled {
      background: rgba($primary, 0.1);
      color: $primary;
    }

    &.completed {
      background: rgba($success, 0.1);
      color: darken($success, 20%);
    }

    &.cancelled {
      background: rgba($danger, 0.1);
      color: $danger;
    }
  }

  .history-notes {
    background: $light;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 8px;
  }

  .empty-history {
    text-align: center;
    padding: 20px;
    color: $gray;
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;
    border: none;

    &.cancel-btn {
      background: $light;
      color: $dark;

      &:hover {
        background: $light-gray;
      }
    }

    &.confirm-btn,
    &.appointment-btn {
      background: $primary;
      color: white;

      &:hover {
        background: darken($primary, 5%);
      }
    }
  }
}

.patient-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: $light;
  border-radius: 10px;

  .patient-avatar-small {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary, $secondary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
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
