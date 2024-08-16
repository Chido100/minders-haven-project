
# Minders Haven (Childminder Booking System)

Minders Haven is a comprehensive web application that facilitates the process of booking childminders. It’s designed with both parents and childminders in mind, offering a user-friendly platform where parents can easily book childminders, read and write reviews, and stay informed through the blog.


## Screenshots

![App Screenshot](https://github.com/Chido100/minders-haven-project/blob/minders/minders_haven_git_image.png)


## Features


#### User Authentication: 
Secure user login and registration with JWT authentication.

#### Social Authentication: 
Login via popular social platforms (Google).

#### Childminder Booking:
Easy and intuitive childminder booking system.

Childminder Ratings and Reviews: Rate and review childminders after booking.

#### Blog:
Stay updated with the latest news and tips through the blog.

#### Admin Dashboard:
Manage users, childminders, and bookings.
## Tech Stack

**Client:** Next.js, Redux, TailwindCSS

**Server:** Django, Django Rest Framework, Celery, Redis

**Database:** PostgreSQL

**Image Storage:** Cloudinary

**Containerization:** Docker

**Testing:** Postman


## Installation

Follow these steps to get the project up and running on your local machine.


**Clone the Repository:**
```bash
  git clone https://github.com/Chido100/minders-haven-project.git
cd minders-haven-project
```
**Create and configure environment variables:** See Environment variables

**Build and run Docker containers:**
```bash
  docker-compose up --build
```

**Apply migrations and create superuser:**
```bash
  docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

**Access the Application:** http://localhost:8080
    
## Environment Variables

Create a .env file in the root directory of the project and configure the following variables:

**Django settings:**

`SECRET_KEY`

`DEBUG=True`

**Database settings:**

`POSTGRES_DB`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_HOST`


**Cloudinary settings:**

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

**Redis settings:**

`REDIS_HOST`

`REDIS_PORT`

**Celery settings:**

`CELERY_BROKER_URL`

`CELERY_RESULT_BACKEND`

**Social Authentication settings:**

`SOCIAL_AUTH_GOOGLE_OAUTH2_KEY`

`SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET`




## How It Works
### Overview
#### Authentication and Social Authentication:
- Users can register and log in using traditional email/password methods.

- Social authentication is available for Google, making it easier for users to sign up and log in.

#### Childminder Booking:
- Users can browse through available childminders and select the one that suits their needs.
- The booking process involves selecting a date, time, number of kids, location etc. after which the user receives a confirmation.

#### Childminder Ratings and Reviews:
- After a booking is completed, users can rate and review the childminder.
- These ratings and reviews help other users make informed decisions.

#### Blog:
- The blog provides useful information, news, and tips related to child care.
- Users can read blog posts to stay updated.

#### Frontend
- The frontend is built using Next.js and TailwindCSS.
- It provides a responsive and user-friendly interface, making it easy for users to navigate and use the application.

#### Backend
- The backend is developed using Django and Django Rest Framework, ensuring a robust and scalable API.
- Celery and Redis are used for background tasks such as sending emails and processing payments.

#### Testing
- All API endpoints have been tested and verified using Postman.