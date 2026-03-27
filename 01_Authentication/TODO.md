# Fix Token Blacklist Duplicate Key Error

## Plan Steps:
- [ ] Step 1: Update src/controllers/auth.controller.js - Fix token extraction and add exists() check before create to prevent duplicate.
- [ ] Step 2: Update src/middleware/auth.middleware.js - Fix header typo, token split, and user findById.
- [ ] Step 3: Restart server and test logout multiple times.

Progress: Starting Step 1.

