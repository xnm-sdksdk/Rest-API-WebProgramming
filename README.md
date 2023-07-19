# REST API

# User Registration

- Student
- Service Facilitator
- Administrator

# Events and Accommodations

- Showcase information about events and accommodations.

# Search Offers

Allow users to search offers by criteria:

- Geographical area
- Availability
- Price range
- Number of beds
- Number of persons
- Classification
- Type of room
- Amenities

# Search Events

Allow users to search events related to:

- Leisure
- Cultural
- Academic

Search criteria may include:

- Date
- Type of event

# Accommodation Reservation

- Students can reserve accommodations.

# Reservation Validation

- Service Facilitators can validate reservations.

# Admin Access

- Administrators have access to a reserved area.
- Administrators can manage users.
- Administrators can manage outdated events.
- Administrators can manage poorly-rated accommodations.

# Event Participation and Accommodation Rating

- Students can express interest in participating in events.
- Students can rate the accommodation they stayed in.

## Accommodations API

### Get all Accommodations

- **URL:** `/api/v1/accommodations`
- **Method:** GET
- **Description:** Retrieve all accommodations.
- **Response:** Array of accommodation objects.

### Get Accommodation by ID

- **URL:** `/api/v1/accommodations/:id`
- **Method:** GET
- **Description:** Retrieve a specific accommodation by ID.
- **Response:** Accommodation object.

### Create Accommodation

- **URL:** `/api/v1/accommodations`
- **Method:** POST
- **Description:** Create a new accommodation.
- **Request Body:** Accommodation details (title, description, location, price, rating, number_beds, room_type, amenities).
- **Response:** Created accommodation object.

### Update Accommodation by ID

- **URL:** `/api/v1/accommodations/:id`
- **Method:** PUT
- **Description:** Update a specific accommodation by ID.
- **Request Body:** Updated accommodation details.
- **Response:** Updated accommodation object.

### Delete Accommodation by ID

- **URL:** `/api/v1/accommodations/:id`
- **Method:** DELETE
- **Description:** Delete a specific accommodation by ID.
- **Response:** Success message.

### Search Accommodations

- **URL:** `/api/v1/accommodations/search`
- **Method:** GET
- **Description:** Search accommodations based on specific criteria (title, location, price, rating, numberOfBeds).
- **Query Parameters:** title, location, price, rating, numberOfBeds.
- **Response:** Array of matching accommodations.

## Events API

### Get all Events

- **URL:** `/api/v1/events`
- **Method:** GET
- **Description:** Retrieve all events.
- **Response:** Array of event objects.

### Get Event by ID

- **URL:** `/api/v1/events/:id`
- **Method:** GET
- **Description:** Retrieve a specific event by ID.
- **Response:** Event object.

### Create Event

- **URL:** `/api/v1/events`
- **Method:** POST
- **Description:** Create a new event.
- **Request Body:** Event details (title, description, location, date, time, type).
- **Response:** Created event object.

### Update Event by ID

- **URL:** `/api/v1/events/:id`
- **Method:** PUT
- **Description:** Update a specific event by ID.
- **Request Body:** Updated event details.
- **Response:** Updated event object.

### Delete Event by ID

- **URL:** `/api/v1/events/:id`
- **Method:** DELETE
- **Description:** Delete a specific event by ID.
- **Response:** Success message.

### Search Events

- **URL:** `/api/v1/events/search`
- **Method:** GET
- **Description:** Search events based on specific criteria (title, location, date).
- **Query Parameters:** title, location, date.
- **Response:** Array of matching events.

## Reservations API

### Get all Reservations

- **URL:** `/api/v1/reservations`
- **Method:** GET
- **Description:** Retrieve all reservations.
- **Response:** Array of reservation objects.

### Get Reservation by ID

- **URL:** `/api/v1/reservations/:id`
- **Method:** GET
- **Description:** Retrieve a specific reservation by ID.
- **Response:** Reservation object.

### Create Reservation

- **URL:** `/api/v1/reservations`
- **Method:** POST
- **Description:** Create a new reservation.
- **Request Body:** Reservation details (accommodationId, checkInDate, checkOutDate, numberGuests).
- **Response:** Created reservation object.

### Update Reservation by ID

- **URL:** `/api/v1/reservations/:id`
- **Method:** PUT
- **Description:** Update a specific reservation by ID.
- **Request Body:** Updated reservation details.
- **Response:** Updated reservation object.

### Delete Reservation by ID

- **URL:** `/api/v1/reservations/:id`
- **Method:** DELETE
- **Description:** Delete a specific reservation by ID.
- **Response:** Success message.

## Users API

### Register User

- **URL:** `/api/v1/users`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:** User details (name, email, password, role).
- **Response:** Registered user object.

### Login User

- **URL:** `/api/v1/users/login`
- **Method:** POST
- **Description:** User login.
- **Request Body:** User credentials (email, password).
- **Response:** Success message and access token.

### Get all Users

- **URL:** `/api/v1/users`
- **Method:** GET
- **Description:** Retrieve all users.
- **Response:** Array of user objects.

### Get User by ID

- **URL:** `/api/v1/users/:id`
- **Method:** GET
- **Description:** Retrieve a specific user by ID.
- **Response:** User object.

### Update User by ID

- **URL:** `/api/v1/users/:id`
- **Method:** PUT
- **Description:** Update a specific user by ID.
- **Request Body:** Updated user details.
- **Response:** Updated user object.

### Delete User by ID

- **URL:** `/api/v1/users/:id`
- **Method:** DELETE
- **Description:** Delete a specific user by ID.
- **Response:** Success message.
