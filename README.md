## Knowabunga app

Web app for the tretton37 Knowabunga event.

The frontend is a PWA built with React.js and Vite.
The backend is on AWS and deployed via AWS CDK. Requests are routed via Api Gateway to Node.js Lambda functions and DynamoDB is used for storage.
EventBridge takes care for scheduling server sent notifications.
Typescript is used throughout the project and pnpm is used as the package manager.

### Run locally

#### Setup Google Oauth

- Go to Google developer console and obtain an Oauth client ID

#### Deploy AWS backend

- Setup the AWS CDK CLI

In `aws` run

- `cp .env.example .env`
- Fill in the .env variables:
  - GOOGLE_CLIENT_ID - needed for sign in with google to work. Go to Google developer console, create a project and obtain an Oauth Client ID.
  - LEET_API_TOKEN - the app uses leet API to match employees to their offices. Optional.
  - VAPID_KEYS - used for server sent notifications. You can generate them usign an online tool.
- `pnpm deploy:dev`
- Note the api url in the console, you will need it later

#### Setup frontend

In `frontend` run

- `cp .env-example .env`
- Fill in the.env variables:
  - VITE_GOOGLE_CLIENT_ID - this is the same as GOOGLE_CLIENT_ID on the backend
  - VITE_API_URL - this is the backend url that `pnpm deploy:dev` returned
  - VITE_PUBLIC_VAPID_KEY - this is the PUBLIC_VAPID_KEY from above
- run `pnpm install`
- run `pnpm dev`
- visit `http://localhost:5173`

#### Development mode

If you set VITE_ENV to `dev` and deploy cdk with `pnpm deploy:dev` you get access to some development helpers:

- On login page you will have buttons to login as different user types to quickly test functionality that is restricted to a specific role.
- The current time of `Date` will be set to after the last talk in the schedule, so you can rate and view feedback for any talk.
- You are able to change the current time in the user menu to test time related features.
- You can send a test server sent notification through the user menu.

### How to

#### Update the schedule?

Edit `data/schedule.ts`

#### Modify the feedback form?

Edit the `feedbackSchema` variable in `data/feedbackSchema.ts`

#### Add a new type of feedback?

- First add a new key to the `feedbackTypes` object in `data/feedbackSchema.ts`. The key will be used as the name for this feedback type. You should also define a validation rule - this project uses `zod` for validation.
- Then create a input component in `frontend/src/components/feedback/input` and name it `{type}FeedbackInput` where `{type}` matches the key you added to `feedbackTypes` in the previous step.
  This component will be used when collecting feedback in the feedback form. Refer to the existing `*FeedbackInput` components for how exactly it should work. In short you get the `value` prop and emit the new value with `onChange(newValue)`.
- Then create a view component in `frontend/src/components/feedback/review` and name it `${type}FeedbackReview` where `{type}` matches the key you added to `feedbackTypes` in the previous step.
  This component will be used when viewing the feedback and as such it will need to aggregate multiple values. Refer to the existing `*FeedbackReview` components for how exactly it should work. In short it will recieve a `values`prop which is an array of items containing information about the user who posted the feedback and the actual value of the feedback in the form of `{user: {...} value: ...}`.
- Now your new feedback type is ready to be used. Add a new item to the `feedbackSchema` variable in `data/feedbackSchema.ts` with the `type` equal to the name of the new type.
