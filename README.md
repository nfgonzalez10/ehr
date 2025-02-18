# EHR SYSTEM

This project aims to address the challenge of mapping various Electronic Health Record (EHR) systems. To tackle this problem, I employed a multitenancy design pattern, where each EHR serves as a tenant within a shared physical infrastructure, while maintaining distinct logic through dedicated mappers.

The project is divided into two main components:

- **EHR Backend**
- **EHR Frontend**

### EHR Backend

For the backend implementation, I utilized NestJS, employing a hexagonal architecture and dependency injection to minimize significant code alterations.

The backend features a REST API that allows internal users to perform CRUD operations related to mapping. Additionally, it includes an endpoint for testing the mappings.

For security management, I incorporated Passport JWT, providing verification and an additional layer of protection for the resources.

### EHR Frontend

The frontend was developed using ReactJS and React Bootstrap to facilitate quicker design implementation. It consists of four key pages:

- **EHR Configuration:** This page allows internal users to set new mapping variables for the system, such as name, gender, address, etc.
- **Hospitals:** Here, users can add new hospitals (tenants). This page also provides a redirect option to the Mapping Hospitals section.
- **Mapping Hospital:** On this page, users can map EHR variables to the corresponding variables in the systems.
- **Test Mapping:** In this section, users can fill out a form with test values and see the data the system will send to the selected hospital.

This structure provides a clear pathway for managing EHR mappings, enhancing usability and functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
docker
```

### Installing

In the root of the project run

```
docker compose up
```

Wait that docker build the whole project

Go to your prefered navigator and open the following page

```
http:/localhost:3001/
```

Click on the login button

## Scalability

1. Establish a caching system using Redis.
2. Adopt the CQRS (Command Query Responsibility Segregation) pattern to separate writing and querying operations.
3. Utilize a NoSQL database for handling queries.
4. Implement an event-driven architecture and transition to a microservices approach.
5. Set up a publish/subscribe system and evaluate the most suitable technology for our needs, considering options such as Kafka, RabbitMQ, or Redis Pub/Sub.
   6.Ensure that asynchronous operations function effectively.

## Testing Strategy

For testing, the ideal approach is to start with Test-Driven Development (TDD). This allows us to test each class and function in the system under different scenarios. I plan to implement the testing process in three distinct stages:

1. **Unit Testing**

   - Test mapping functions
   - EHR adapters
   - Database insertions
   - Error handling
   - Security
   - Use Jest to test React components

2. **Integration Testing**

   - Use Postman for manual testing of the API to verify that CRUD operations are performed correctly in the database.
   - Use K6 to test the load on the API.

3. **End-to-End Testing**
   - Use Cypress to simulate a user logging in and updating EHR mappings.

## Built With

- [Nestjs](https://nestjs.com/) - The web framework
- [Postgres](https://www.postgresql.org/) - Database
- [React.Js](https://react.dev/) - Library frontente
- [React bootstrap](https://react-bootstrap.netlify.app/) - UI framework

## Author

- **Nicolas Gonzalez**
