# LOG

> Building a **Job Application Tracker** from scratch.

---

## Stage 0 - Prerequisites

- Project Idea + Flow
- Java Basics
- How web works

---

## Stage 1 — Working API (in-memory)

> REST API using an ArrayList. No database yet.

**What I built:** Created Job class and Job controller

**Where I got stuck:** 
- Extracting request data when required - like RequestBody and PathVariable
- returning Response - ResponseEntity class

**What clicked:**
- Revising HTTP request 
- Exploring ResponseEntity class

---

## Stage 2 — Real Database (PostgreSQL + JPA)

> Same API, but data survives a server restart.


**What I built:** Added Job repository and injected into Job controller

**Where I got stuck:** Handling output when data is not found
- No job found in getJob() and deleteJob()

**What clicked:**
- new concept unlocked -> Optional class

---

## Stage 3 — Service Layer + DTOs

> Controller no longer touches the repository. Business logic has a home.

**What I built:** Added request and response DTOs for job and service layer. Updated controller to use service layer.

**Where I got stuck:**
- What a DTO is and why it is required
- Converting DTO to Job and vice versa

**What clicked:**
- DTO is like a template which contains what is exactly needed (without handling whole entity) 
- 2 ways - implemented manual mapping

---

## Stage 4 — Validation + Error Handling

> Bad input gets rejected with clear errors, not stack traces.


**What I built:** Added validation for Request and Response, Created GlobalExceptionHandler with clear errors

**Where I got stuck:**
- No when invalid or malformed request hits - with all validations, exception handlers being added
    - invalid data --> unintended fields added in request ( should have only fields in dto )
    - missing data --> fields with empty strings

**What clicked:**
- ```spring.jackson.deserialization.fail-on-unknown-properties = true``` --> adding this raises exception when there is some invalid data or missing data or any exceptional cases.


---

## Stage 5 — Relationships (JPA)

> Users, Jobs — connected. N+1 problems hit here.


**What I built:** 
- Added User entity, repo
- connected with job through 
    - one to many replationship from user to job
    - many to one relationship from job to user
- Added user request and response DTOs
- Added user controller and service layers

**Where I got stuck:** 
- AI suggested to add @JsonIgnore to jobs list in User entity
- ```Cannot invoke "java.util.List.stream()" because the return value of "com.jobtracker.entity.User.getJobs()" is null```  - when POST user

**What clicked:**
- Understanding Jackson working - makes @JsonIgnore necessary
    - Explanation by AI
      ```
        - What is @JsonIgnore:
            It tells Jackson — the library that converts Java objects to JSON — to skip this field completely when serializing.

        - Why need it here:
            When Jackson serializes a User object, it calls every getter including getJobs(). That triggers JPA to load the jobs list from the database. Each Job has a User. Jackson then tries to serialize that User. That User has getJobs(). Jackson loads jobs again. Infinite loop. App crashes with a stack overflow.
            Even if it doesn't infinite loop — if the session is already closed when Jackson tries to call getJobs(), gets LazyInitializationException instead. Also a crash, different reason.

        - Why this specific situation causes it:
            You set fetch = FetchType.LAZY on the relationship — which is correct. Lazy means "don't load jobs until someone asks for them." But Jackson asks for them the moment it touches the User object, which defeats the lazy loading entirely.

        - The fix: 
            @JsonIgnore tells Jackson "never touch this field." The relationship still       exists in the database, JPA still uses it internally, but it never appears in any JSON response.

        You'll only ever expose jobs through JobResponseDTO which already maps exactly what you want. You never need User.jobs to appear in JSON directly.

      ```
- Saving and agin retrieving from DB works
    - Reason
      ```
        - What: 
            After save(), instead of mapping the in-memory newUser object directly, you fetch the saved user back from the database with findById() and map that instead.
        
        - Why the in-memory object has null jobs:
            When you do User newUser = toUser(userRequest), you create a plain Java object. Its jobs field is initialized as new ArrayList<>() in the entity — correct. But save() returns a new object that JPA manages. At this point the jobs field on that managed object is null because JPA hasn't populated it — there's no database query to load it yet since you just created the user and lazy loading hasn't been triggered.
            
            When you call user.getJobs().stream() on that object — null pointer.
        
        - Why re-fetching fixes it:
            findById() loads a fresh managed entity from the database. At that point jobs is an empty list [] not null — JPA knows this user exists and initializes the collection properly even though it's empty.
        
        - The broader lesson: Never trust the in-memory state of a JPA entity after save() for relationships. Always re-fetch if you need the full object back. This is a mistake almost every JPA beginner makes.
      ```
    - Actual fix: missing initialization in User entity


**Identified bugs:**
- 500 Internal server error when hitting endpoint like 
    - ``` GET - localhost:8080/jobs/wvwonvw```
    - ```DELETE - localhost:8080/jobs/ownvowm```

**Fixes:**
- Added method arg type mismatch exception handler with bad request - returns 400 instead of 500

---

## Stage 6 — Authentication (JWT + Spring Security)

> Every endpoint locked. Token required. Data scoped per user.


**What I built:**
- New UserNotFound Exception instead of RuntimeException

**Where I got stuck:**

**What clicked:**

---

## Stage 7 — React Frontend

> Login, job list, add form. API was built first — wiring UI to it last.

**What I built:**

**Where I got stuck:**

**What clicked:**

---

## Stage 8 — Deployment

> Live on the internet.


**What I built:**

**Where I got stuck:**

**What clicked:**

---

## General Notes

> Anything that doesn't fit a stage