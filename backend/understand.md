# Backend Understand Guide

This file explains how to read, understand, and work inside the backend.

Important truth first:
- this backend is complete as a **non-database application layer**
- it is **not** a fully working production backend yet
- the missing part is mainly real database-backed persistence and the runtime verification that depends on it

So if you ask, "Is the backend complete?"
- **architecture and code organization:** yes
- **production behavior end to end:** no, because the database part is intentionally excluded

## 1. What This Backend Already Has

The backend already has these parts in place:

- Laravel-style runtime shell
- route organization by module
- request validation classes
- controllers separated from services
- shared API response handling
- exception structure
- recruiter auth module
- admin auth and review module
- portal module
- recruiter profile module
- company profile module
- dashboard module
- JNF module split into core and sub-sections
- policies and enums
- middleware for recruiter/admin separation
- basic tests and backend docs

This means the backend is no longer just folders. It is a real application structure.

## 2. What Is Still Intentionally Not Complete

These parts are still pending because you asked to exclude the database part:

- real migrations and schema
- real Eloquent relationships tied to schema
- real OTP persistence and expiry storage
- real token persistence and invalidation through database-backed auth tables
- real file/document persistence
- real audit-log persistence

So when you see placeholder arrays in some services, that is not because the architecture is unfinished.
It is because the persistence layer was intentionally left out.

## 3. Best Reading Order

If you are new, read the backend in this exact order:

1. [README.md](./README.md)
Reason:
This gives you the backend document map first.

2. [docs/backend-overview.md](./docs/backend-overview.md)
Reason:
This tells you what the backend is supposed to do at a product level.

3. [docs/backend-architecture.md](./docs/backend-architecture.md)
Reason:
This tells you why the folders and layers are shaped this way.

4. [bootstrap/app.php](./bootstrap/app.php)
Reason:
This is the real backend entry point. It shows:
- routing registration
- middleware aliases
- exception rendering

5. [routes/api.php](./routes/api.php)
Reason:
This shows the top-level API assembly and which route files are included.

6. Read route modules in this order:
- [routes/auth.php](./routes/auth.php)
- [routes/admin.php](./routes/admin.php)
- [routes/portal.php](./routes/portal.php)
- [routes/dashboard.php](./routes/dashboard.php)
- [routes/company.php](./routes/company.php)
- [routes/recruiter.php](./routes/recruiter.php)
- [routes/jnfs.php](./routes/jnfs.php)

Reason:
This tells you what endpoints exist and how access is separated.

7. Then read one full module from route to service.
Best first example:
- [routes/auth.php](./routes/auth.php)
- [app/Http/Requests/Auth](./app/Http/Requests/Auth)
- [app/Http/Controllers/Api/Auth/AuthController.php](./app/Http/Controllers/Api/Auth/AuthController.php)
- [app/Services/Auth](./app/Services/Auth)

Reason:
This teaches you the main backend pattern.

## 4. The Main Mental Model

Every request in this backend should be understood like this:

`route -> request validation -> controller -> service -> policy/model -> response`

What each layer means:

- `routes/`
Defines URLs and middleware only.

- `app/Http/Requests/`
Validates incoming data.
If input rules change, this is usually the first place to check.

- `app/Http/Controllers/`
Coordinates the request.
Controllers should stay thin.

- `app/Services/`
Holds business logic.
If a workflow is complicated, it should live here.

- `app/Policies/`
Contains authorization rules.
If ownership or workflow permissions are wrong, check here.

- `app/Models/`
Represents domain entities.
Right now they are application-level shells because the database layer is excluded.

- [app/Services/ApiResponseService.php](./app/Services/ApiResponseService.php)
Keeps success responses consistent.

## 5. The First Files You Should Actually Open

If you want fast understanding instead of reading everything, open these files first:

1. [bootstrap/app.php](./bootstrap/app.php)
Read it to understand:
- where routing is connected
- which middleware aliases exist
- how API exceptions become JSON

2. [config/auth.php](./config/auth.php)
Read it to understand:
- guards
- providers
- how auth is expected to work

3. [routes/auth.php](./routes/auth.php)
Read it to understand:
- public recruiter auth endpoints
- protected recruiter auth endpoints

4. [app/Http/Controllers/Api/Auth/AuthController.php](./app/Http/Controllers/Api/Auth/AuthController.php)
Read it to understand:
- the standard controller style used in this backend
- how requests and services are connected

5. [app/Services/ApiResponseService.php](./app/Services/ApiResponseService.php)
Read it to understand:
- the API response shape used across modules

6. [app/Http/Controllers/Api/Jnf/JnfController.php](./app/Http/Controllers/Api/Jnf/JnfController.php)
Read it to understand:
- how a larger business module is organized

7. [routes/jnfs.php](./routes/jnfs.php)
Read it to understand:
- how JNF was split into main entity plus sub-sections

8. [app/Policies/JnfPolicy.php](./app/Policies/JnfPolicy.php)
Read it to understand:
- status-based workflow restrictions

## 6. What Each Main File/Folder Is For

### Runtime

- [artisan](./artisan)
Laravel CLI entry.
Look here only if you want to confirm the backend has a proper Laravel-style shell.

- [bootstrap/app.php](./bootstrap/app.php)
Most important runtime file.
Look here first when you want to understand application bootstrapping.

- [public/index.php](./public/index.php)
Public web entry file.
Usually not the first file to edit.

### Configuration

- [config/app.php](./config/app.php)
App name, environment-facing configuration.

- [config/auth.php](./config/auth.php)
Authentication configuration.
Very important for recruiter/admin understanding.

- [config/cors.php](./config/cors.php)
Frontend-backend cross-origin configuration.

- [config/services.php](./config/services.php)
External service configuration placeholders.

- [config/filesystems.php](./config/filesystems.php)
Storage configuration contract.

### Routes

- [routes/api.php](./routes/api.php)
Top-level API map. Start here for endpoint discovery.

- [routes/auth.php](./routes/auth.php)
Recruiter auth API.

- [routes/admin.php](./routes/admin.php)
Admin login, dashboard, review, recruiter management.

- [routes/portal.php](./routes/portal.php)
Public API for portal-facing content.

- [routes/dashboard.php](./routes/dashboard.php)
Recruiter dashboard API.

- [routes/company.php](./routes/company.php)
Recruiter company profile API.

- [routes/recruiter.php](./routes/recruiter.php)
Recruiter profile API.

- [routes/jnfs.php](./routes/jnfs.php)
Main recruiter JNF workflow API.

### Requests

- [app/Http/Requests/Auth](./app/Http/Requests/Auth)
Read this folder when login, register, OTP, or auth payload rules change.

- [app/Http/Requests/Admin](./app/Http/Requests/Admin)
Admin-side request rules.

- [app/Http/Requests/Company](./app/Http/Requests/Company)
Company profile update rules.

- [app/Http/Requests/Recruiter](./app/Http/Requests/Recruiter)
Recruiter profile update rules.

- [app/Http/Requests/Jnf](./app/Http/Requests/Jnf)
JNF module request rules, including nested section folders.

### Controllers

- [app/Http/Controllers/Api/Auth/AuthController.php](./app/Http/Controllers/Api/Auth/AuthController.php)
Best first controller to study.

- [app/Http/Controllers/Api/Admin](./app/Http/Controllers/Api/Admin)
Admin-side controller set.

- [app/Http/Controllers/Api/Portal](./app/Http/Controllers/Api/Portal)
Health and portal content controllers.

- [app/Http/Controllers/Api/Company](./app/Http/Controllers/Api/Company)
Company profile controller.

- [app/Http/Controllers/Api/Recruiter](./app/Http/Controllers/Api/Recruiter)
Recruiter profile controller.

- [app/Http/Controllers/Api/Dashboard](./app/Http/Controllers/Api/Dashboard)
Recruiter dashboard controller.

- [app/Http/Controllers/Api/Jnf](./app/Http/Controllers/Api/Jnf)
Largest business module controller set.

### Services

- [app/Services/ApiResponseService.php](./app/Services/ApiResponseService.php)
Shared response shape builder.

- [app/Services/Auth](./app/Services/Auth)
OTP, recruiter auth, and recruiter session logic.

- [app/Services/Admin](./app/Services/Admin)
Admin auth, review, and recruiter status logic.

- [app/Services/Portal](./app/Services/Portal)
Portal-facing content logic.

- [app/Services/Company](./app/Services/Company)
Company profile logic.

- [app/Services/Recruiter](./app/Services/Recruiter)
Recruiter profile logic.

- [app/Services/Dashboard](./app/Services/Dashboard)
Dashboard aggregation logic.

- [app/Services/Jnf](./app/Services/Jnf)
JNF core and section-level logic.

### Authorization and Rules

- [app/Policies/RecruiterPolicy.php](./app/Policies/RecruiterPolicy.php)
Ownership and recruiter-level actions.

- [app/Policies/CompanyPolicy.php](./app/Policies/CompanyPolicy.php)
Company ownership checks.

- [app/Policies/JnfPolicy.php](./app/Policies/JnfPolicy.php)
JNF workflow/state-based permissions.

- [app/Enums/JnfStatus.php](./app/Enums/JnfStatus.php)
JNF workflow states.

- [app/Enums/RecruiterStatus.php](./app/Enums/RecruiterStatus.php)
Recruiter lifecycle states.

### Models

- [app/Models/Recruiter.php](./app/Models/Recruiter.php)
- [app/Models/Admin.php](./app/Models/Admin.php)
- [app/Models/Company.php](./app/Models/Company.php)
- [app/Models/Jnf.php](./app/Models/Jnf.php)
- [app/Models/AuditLog.php](./app/Models/AuditLog.php)

Read these to understand the domain objects, but remember:
- they are intentionally light right now
- the database layer is the missing part, not the architecture

### Tests

- [tests/Feature/HealthEndpointTest.php](./tests/Feature/HealthEndpointTest.php)
- [tests/Feature/Auth/RecruiterAuthEndpointsTest.php](./tests/Feature/Auth/RecruiterAuthEndpointsTest.php)
- [tests/Unit/ApiResponseServiceTest.php](./tests/Unit/ApiResponseServiceTest.php)

Read tests to understand expected behavior quickly.

## 7. How To Understand Each Module

Use this pattern every time:

1. read the route file
2. read the request class or request folder
3. read the controller
4. read the service
5. read related policy or enum if behavior depends on status/ownership

Do not start from models first.
In this backend, behavior is easier to understand from routes and services first.

## 8. If You Want To Work On A Specific Area

### If you want to work on recruiter auth

Look at:
- [routes/auth.php](./routes/auth.php)
- [app/Http/Requests/Auth](./app/Http/Requests/Auth)
- [app/Http/Controllers/Api/Auth/AuthController.php](./app/Http/Controllers/Api/Auth/AuthController.php)
- [app/Services/Auth](./app/Services/Auth)

Look in this way:
- first endpoint list
- then payload validation
- then controller method
- then service logic

### If you want to work on admin review

Look at:
- [routes/admin.php](./routes/admin.php)
- [app/Http/Controllers/Api/Admin/AdminReviewController.php](./app/Http/Controllers/Api/Admin/AdminReviewController.php)
- [app/Http/Requests/Admin](./app/Http/Requests/Admin)
- [app/Services/Admin/AdminReviewService.php](./app/Services/Admin/AdminReviewService.php)
- [app/Policies/JnfPolicy.php](./app/Policies/JnfPolicy.php)

Look in this way:
- first route actions
- then review request rules
- then service transitions
- then workflow restrictions in policy and enums

### If you want to work on recruiter profile or company profile

Look at:
- [routes/recruiter.php](./routes/recruiter.php)
- [routes/company.php](./routes/company.php)
- [app/Http/Controllers/Api/Recruiter/RecruiterController.php](./app/Http/Controllers/Api/Recruiter/RecruiterController.php)
- [app/Http/Controllers/Api/Company/CompanyController.php](./app/Http/Controllers/Api/Company/CompanyController.php)
- [app/Http/Requests/Recruiter](./app/Http/Requests/Recruiter)
- [app/Http/Requests/Company](./app/Http/Requests/Company)
- [app/Services/Recruiter/RecruiterProfileService.php](./app/Services/Recruiter/RecruiterProfileService.php)
- [app/Services/Company/CompanyProfileService.php](./app/Services/Company/CompanyProfileService.php)

### If you want to work on JNF

Read in this order:
- [routes/jnfs.php](./routes/jnfs.php)
- [app/Http/Controllers/Api/Jnf/JnfController.php](./app/Http/Controllers/Api/Jnf/JnfController.php)
- [app/Services/Jnf/JnfService.php](./app/Services/Jnf/JnfService.php)
- [app/Http/Requests/Jnf](./app/Http/Requests/Jnf)
- [app/Http/Controllers/Api/Jnf](./app/Http/Controllers/Api/Jnf)
- [app/Services/Jnf](./app/Services/Jnf)
- [app/Policies/JnfPolicy.php](./app/Policies/JnfPolicy.php)
- [app/Enums/JnfStatus.php](./app/Enums/JnfStatus.php)

Look in this way:
- understand the main JNF resource first
- only then read contacts, skills, eligibility, salary, rounds, declaration, and documents

## 9. What To Edit For Different Kinds Of Changes

If you need to:

- change endpoint path or grouping
  - edit `routes/*.php`

- change request payload rules
  - edit `app/Http/Requests/**`

- change request coordination
  - edit `app/Http/Controllers/**`

- change business logic
  - edit `app/Services/**`

- change permission or ownership logic
  - edit `app/Policies/**`

- change workflow states
  - edit `app/Enums/**`

- change response structure
  - edit [app/Services/ApiResponseService.php](./app/Services/ApiResponseService.php)
  - review [docs/response-format.md](./docs/response-format.md)

- change authentication configuration
  - edit [config/auth.php](./config/auth.php)
  - check [bootstrap/app.php](./bootstrap/app.php)

## 10. What Not To Misunderstand

Do not misunderstand these points:

- an intentionally light model does not mean the backend is low quality
- a service returning placeholder arrays does not mean the module structure is incomplete
- the real missing part is persistence, because the database layer was excluded by requirement

This backend is already strong in:
- module boundaries
- separation of concerns
- route organization
- request/service/controller layering

## 11. Fastest Practical Understanding Path

If you only have 20 minutes, read exactly these:

1. [bootstrap/app.php](./bootstrap/app.php)
2. [routes/api.php](./routes/api.php)
3. [routes/auth.php](./routes/auth.php)
4. [app/Http/Controllers/Api/Auth/AuthController.php](./app/Http/Controllers/Api/Auth/AuthController.php)
5. [app/Services/Auth](./app/Services/Auth)
6. [app/Services/ApiResponseService.php](./app/Services/ApiResponseService.php)
7. [routes/jnfs.php](./routes/jnfs.php)
8. [app/Http/Controllers/Api/Jnf/JnfController.php](./app/Http/Controllers/Api/Jnf/JnfController.php)
9. [app/Services/Jnf/JnfService.php](./app/Services/Jnf/JnfService.php)
10. [app/Policies/JnfPolicy.php](./app/Policies/JnfPolicy.php)

## 12. Final Summary

The correct way to think about this backend is:

- it is **architecturally complete** for the non-database scope
- it is **not product-complete** because the database-backed behavior is still excluded
- the best way to understand it is to read from routes to requests to controllers to services

If you follow that order, the backend will make sense quickly.
