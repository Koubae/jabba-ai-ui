<template>
  <div class="user-profile-container">
    <h1>User Profile</h1>

    <div class="content-container">
      <div class="success-message">
        <div class="success-icon">✅</div>
        <p>User data loaded successfully!</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.user-profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

/* Loading Styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

/* Error Styles */
.error-container {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #721c24;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  color: #721c24;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.error-message {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  word-break: break-word;
}

.retry-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: #c82333;
}

.retry-button:active {
  transform: translateY(1px);
}

/* Success Styles */
.content-container {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #155724;
  font-size: 1.1rem;
}

.success-icon {
  font-size: 1.5rem;
}

.refresh-button {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.refresh-button:hover {
  background: #218838;
}

.refresh-button:active {
  transform: translateY(1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-profile-container {
    padding: 1rem;
  }

  .loading-container,
  .error-container,
  .content-container {
    padding: 1.5rem;
  }
}
</style>