# Nexus Social Security Specification

## Data Invariants
1. A post must have a valid `authorId` matching the authenticated user.
2. A like can only be created by the authenticated user for themselves.
3. Users cannot modify other users' profiles.
4. Messages can only be read/written by participants of the chat.
5. `createdAt` and `updatedAt` must be server-validated timestamps.

## The "Dirty Dozen" Payloads (Denial Expected)
1. Creating a post as another user: `{ "authorId": "attacker_id", "content": "hi" }`
2. Updating a post's `authorId` to take ownership.
3. Injecting a massive 2MB string into a post `content`.
4. Deleting a post not owned by the user.
5. Creating a like for another user: `posts/post1/likes/victim_id`.
6. Reading another user's private notification subcollection.
7. Modifying `likesCount` directly (must be done via atomic triggers/logic, but here we protect it via strict `affectedKeys`).
8. Creating a user profile with an admin role (if admin existed).
9. Sending a message in a chat where the user is not a participant.
10. Spoofing `email_verified` in a profile update.
11. Bypassing `isValidId` with a 10KB junk-character document ID.
12. Updating `createdAt` on an existing post.

## The Test Runner
(I'll output the `firestore.rules` directly following the instructions, as I don't have a direct test runner tool, but I will simulate the logic).
