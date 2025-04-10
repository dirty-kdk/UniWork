# API Tests for the University Job Platform

This directory contains automated tests for the University Job Platform API. These tests verify that the API endpoints function correctly and handle errors appropriately.

## Tests Overview

The tests cover the following functionality:

1. **User Registration and Authentication**
   - Successful user registration
   - Handling duplicate email registrations
   - Successful user login
   - Handling invalid login credentials

2. **User Profile Management**
   - Updating user profiles

3. **Jobs Management**
   - Retrieving job listings

4. **Applications Management**
   - Applying for jobs
   - Handling duplicate job applications
   - Retrieving user's applications
   - Fetching specific application details
   - Canceling applications

## Running the Tests

Make sure the API server is running before executing the tests.

```bash
# Start the API server
npm run dev

# In a different terminal, run the tests
npm test
```

## Test Dependencies

- Mocha: Test runner
- Chai: Assertion library
- Axios: HTTP client for making API requests

## Configuration

The tests use the following configuration:

- API URL: http://localhost:8000/api (configurable in the test file)
- Test database: The tests can be configured to use a separate test database by setting the `MONGO_URI_TEST` environment variable

## Notes for Test Maintenance

- The tests run in sequence and depend on each other (the application test depends on the job ID retrieved from the job listing test, etc.)
- Each time the tests run, a new user is created with a unique email
- The tests do not clean up the database after running, which means multiple test runs will create multiple test users 