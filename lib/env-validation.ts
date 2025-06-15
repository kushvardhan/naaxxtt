/**
 * Environment variable validation for deployment
 * This helps catch missing environment variables early
 */

export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'MONGODB_URL',
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    } else {
      console.warn('⚠️  App may not function correctly without these variables');
    }
  } else {
    console.log('✅ All required environment variables are present');
  }
}

// Validate on import in development
if (process.env.NODE_ENV !== 'production') {
  validateEnvironmentVariables();
}
