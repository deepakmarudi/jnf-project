# API Response Format

This document defines the standard API response shape for the JNF Portal backend.

## Success Response

Successful responses should use this structure:

```json
{
  "message": "Optional human-readable message",
  "data": {},
  "meta": {}
}
```
## Validation Error Response

```json
{
  "message": "Validation failed.",
  "errors": {
    "field_name": ["Error message"]
  }
}
```
