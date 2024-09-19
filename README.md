# Sleep App design

## Database Schema
---
![Database Schema](./assests/db.svg)

- goals is prepopulated table with goals
- user and sleep tables have one-to-many relationship
- a sleep record is associated with a goal at a time hence one-to-many relationship

## REST API design
1. User signup
    - `POST` /api/v1/users/signup
    - Request Body:
        ```json
        {
            "nickname": "string",
            "password": "string"
        }
        ```

    - Response Body:

        status_code: 201

        ```json
        {
            "id": "uuid",
            "nickname": "string",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
        ```

2. Fetch goals
    - `GET` /api/v1/goals
    - Response Body:

        status_code: 200
        ```json
        [
            {
                "id": "uuid",
                "text": "string",
                "created_at": "timestamp",
                "updated_at": "timestamp"
            }
        ]
        ```
3. Create sleep record

    - `POST` /api/v1/sleep
    - Request Body:

        ```json
        {
            "user_id": "uuid",
            "goal_id": "uuid",
            "struggle_duration": "string",
            "bed_time": "timestamp",
            "wake_time": "timestamp",
            "average_sleep_duration": "duration_in_hours",
            "sleep_efficiency": "decimal_number"
        }
        ```
        *Note: `struggle_duration` is an enum with values `['less_than_2_weeks', '2_to_8_weeks', 'more_than_8_weeks']`*

    - Response Body:

        status_code: 201

        ```json
        {
            "id": "uuid",
            "goal_id": "uuid",
            "user_id": "uuid",
            "struggle_duration": "string",
            "bed_time": "timestamp",
            "wake_time": "timestamp",
            "average_sleep_duration": "duration_in_hours",
            "sleep_efficiency": "decimal_number",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
        ```

## Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database

    User->>Frontend: Enter nickname and password
    Frontend->>API: POST /api/v1/users/signup
    API->>Database: Create user record
    Database-->>API: Confirm user creation
    API-->>Frontend: Return user details (201 Created)
    Frontend-->>User: Display success message

    User->>Frontend: Request goals
    Frontend->>API: GET /api/v1/goals
    API->>Database: Fetch predefined goals
    Database-->>API: Return goals
    API-->>Frontend: Return goals list (200 OK)
    Frontend-->>User: Display goals

    User->>Frontend: Select goal and enter sleep data
    Frontend->>API: POST /api/v1/sleep
    API->>Database: Create sleep record
    Database-->>API: Confirm sleep record creation
    API-->>Frontend: Return sleep record details (201 Created)
    Frontend-->>User: Display efficiency