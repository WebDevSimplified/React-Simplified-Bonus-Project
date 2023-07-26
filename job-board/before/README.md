# Before Getting Started

This project is going to be structured much differently than any other project you have ever done. That is because this project is entirely built around trying to replicate how work is done in the real world. That is why when you look at the starting code for this project you will see that it is already filled with rather complex code. You will need to spend a considerable amount of time reading through the code to understand it before you can truly build upon it. This is a very important skill to learn as most developers spend the majority of their time reading code and not writing it.

Another thing about this project that is different is how the tasks will be presented to you. Instead of explaining exactly what the code does and telling you exactly what to do, you will be given multiple tasks/features that need built and you will need to figure out how to do them on your own. These features will come with mockups of what the final design should look like, but there will be no HTML files/CSS files given to you that show the final output. This is also very important to learn as most developers are not given exact instructions on what to do and how to do it. They are given a task and they need to figure out how to do it on their own.

Finally, the last major difference about this project is how things will be explained about the existing code. Instead of me laying out everything you need to know about the project I will instead treat you as if you are a brand new developer on a team working on this project. This means that the instructions for how the code works will come in the form of the team lead for the project introducing you to the code and project. This is also very important to learn as most developers are not given a full explanation of how the code works. They are given a brief overview of the project and then they need to figure out how the code works on their own.

PS: You may notice this repository is archived. The main reason for that is so no one can create/edit the issues for this project. I want to make sure that the issues are not changed in any way since they are used as the tasks for this project.

## Team Lead Introduction

Hey! Welcome to the team. I am excited to have you on board. I'm not sure if you have had any time to look at the code yet, but overall this application is a fairly complex task board. It started out pretty simple, but over time we have added more and more features as demand increased and now we are ready to really take this project to the next level and actually start earning some money from it. That is where you come in. I am swamped with maintaining the existing app, fixing bugs, and dealing with some other teams so you will be in charge of building out the new features that we need.

Inside the repo you will notice 2 folders. The `api` folder is handled by our backend team so you shouldn't need to mess with any of the code there, beyond setting up your dev environment. The entire API for the new features have already been built out so there may be some code there that you can use, such as the types and schemas for the various API endpoints, but the backend team should be able to let you know more about what is important in this folder as I don't really deal with the backend.

The other folder is the `client` folder which is where you will be spending most of your time. Our application is built using React with Vite and our styles are handled by TailwindCSS. We also use a few other libraries such as React Router, React Hook Form, and Zod. I will explain more in depth how each of these libraries work in our overall application as we get to the code that uses them.

For now to get started all you should need to do is copy the `.env` file into `.env.local` file and run `npm i` followed by `npm run dev`. You will see that our application only has a few pages right now. The main page is the task board which shows all of a users tasks. These tasks are stored in local storage since we didn't want to have to deal with user accounts when we started this application. These tasks can be edited/deleted by clicking on the triple dots on the right of each task row. New tasks can also be created with the new task button in the top right corner of the page. Overall these pages are not too complex, but we have a lot of code behind the scenes that will make it easier to add new features.

When you open up the code you will see a bunch of config files in the root of the `client` folder. You can pretty much ignore these. The only file you will need to modify is the `.env` file to integrate things like API connections and Stripe. Also, there are a few import aliases you can use. `@/<folder>` will import from the `src` folder. This means if you wrote `@/components/ui/Button` it would import the `Button` component from the `ui` folder inside the `components` folder. The other import is the `@backend/<folder>` import. This will import from the `api/src` folder and is mainly used for importing types and schemas from the backend. This means if you wrote `@backend/constants/types` it would import the `types` file from the `api/src/constants` folder.

Inside the `src` folder we have a bunch of folders and then a few files at the root. The files at the root mainly just handle routing and you shouldn't really need to mess with anything besides the `routes` file.

### `components`

The `components` folder currently just contains a `ui` folder which our design system team works on. They have already gone through the mockups for the new features and have created the components that you will need to build them. You shouldn't need any additional UI components but if you want to learn about how to use the UI components there should be plenty of examples in the code base you can look at. If that is not enough, the components are build using Shadcn so you can view the documentation for Shadcn to see how they are used. Also, all icons for this project use the `lucide-react` library. If you need to use an icon for your tasks make sure you use it from that package.

### `constants`

This folder contains all our config/data files. Right now it just has the `config.ts` file which contains all of our environment variables. If you need to add a new environment variable to the project you should add it here. This makes it so we get type safety with our environment variables and also makes it easier to find them all in one place. If you need to import an environment variable make sure you import it from this file and not with `import.meta.env`.

### `features`

The features folder is our most complex folder as it contains all the features for our application. Right now our only feature is `task-list` for handling all our tasks. Inside each feature the folder structure from `src` is replicated as you can see. The only important thing to know about this folder is that we only allow you to import from the `index.ts` file within each feature. This is to make it easier to find where things are coming from and also to make it easier to refactor things later on. If you need to import something from a feature make sure you import it from the `index.ts` file.

We even have an Eslint rule for this, but VSCode doesn't always like this rule. You may have noticed when opening certain files that you get a bunch of import errors. This is because VSCode's Eslint plugin doesn't always work well with this rule. This is why I have included a `.vscode` folder in the project to help fix this issue. Essentially what you need to know is have a `.vscode` folder open at the root of the folder you have open in VSCode. Inside that `settings.json` file you need to set the `directory` option to the path to the client folder. If you have this setup correctly you should see the import errors go away.

### `hooks`

This folder contains any global hooks that are used across our entire application. If a hook is only used in a particular feature it should go in the feature folder instead.

### `layouts`

This folder contains any layouts that are used across our entire application. If a layout is only used in a particular feature it should go in the feature folder instead.

### `pages`

This folder contains all of our pages. In general we like to nest our pages in a folder structure that closely resembles the actual URL path to those files as it makes it easier to find the correct page for a given path.

### `utils`

This folder contains any global utilities we have. If a utility is only used in a particular feature it should go in the feature folder instead.

## Backend Lead Introduction

Hey. I am the backend lead for this project. You shouldn't have to mess much with the backend, but I wanted to give you a quick overview of how things work. We use a library called `Prisma` to handle our database connections. You shouldn't really need to interact with it at all.

To get the backend setup you will need to do the following:

1. Install Sqlite on your machine
2. Run `npm i`
3. Copy the `.env.example` file to `.env`
4. Run `npx prisma db push`
5. Run `npm run dev`

Now I know you don't really care about the backend, but there are a few folders/files that you may need to use on the client.

1. `constants` - The constants folder contains all our types/schemas on the backend which you may need on the frontend for things like form validation.
2. `utils/getJobListingPriceInCents.ts` - This file is something you will need to determine the price of the job listing.

Other than those few files all you really need to know is how the API works.

### API Documentation

Overall the API is broken down into 3 main routes which will each help you tackle a different task.

#### User Routes

1. `POST /users/login` - This takes a simple email/password and will return the user id/email if the credentials are correct. It will also set a cookie in the browser with the user's session. As long as you ensure you always pass the cookie up with each request you will be authenticated. This cookie stays valid for a week which means you can close the browser and come back later and still be logged in.
2. `POST /users/signup` - This route works pretty much identically to the login route, but it will create a brand new user as long as their password meets all requirements. It will also return the user id/email and set a cookie in the browser.
3. `DELETE /users/logout` - This route will clear the cookie in the browser and log the user out.
4. `GET /users/session` - This route will return the user id/email of the currently logged in user. This is useful for getting the user id/email if they leave the page and come back later while their session cookie is still active.

#### Job Listing Routes

1. `GET /job-listings/published` - This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
2. `GET /job-listings/my-listings` - This route will return all the job listings for the currently logged in user (even if they are not published).
3. `POST /job-listings` - This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
4. `PUT /job-listings/:id` - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
5. `DELETE /job-listings/:id` - This route will delete the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the deleted job listing.
6. `POST /job-listings/:id/create-publish-payment-intent` - This route is used as part of our Stripe integration to create a payment intent for the job listing with the given id. This needs to be given a duration for how long to post the job listing for. This will only work if the user is authenticated and the owner of the job listing. It will return the payment intent to be used with Stripe. If you want to learn more checkout the documentation on Stripe for [accepting payments](https://stripe.com/docs/payments/quickstart).

#### Stripe Routes

1. `POST /stripe-webhooks/job-listing-order-complete` - This is not a route that you will need to directly call. Stripe will call this route for us whenever a payment is successfully made and it will update the job listing with the new expiration date. Our dev ops team will set up this webhook in production, but to test this webhook locally you will need to use Stripe's CLI. I will explain more about that in the next section.

### Stripe Setup

I already mentioned a little bit about the Stripe setup, but I wanted to go into a little more detail here. We use Stripe to handle all of our payments. This means that you will need to create a Stripe account to test the application. Stripe will ask you for a bunch of information in order to accept payment in production, but you can skip most of that as your account will only ever be needed for testing in development. The most important thing you will need from Stripe is your secret API key. This should be saved in your .env file as `STRIPE_SECRET_KEY`. You will see that we have a `.env.example` file that you can copy to get the basic env variables setup.

#### Webhook Setup

You may notice that this project comes with 3 stripe files in the root of the project. These are the 3 versions of the Stripe CLI that you can use if the version from Stripe's site does not work properly. These are used to help with testing the webhook locally. You can read more about how to test webhooks [here](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local). You must have a Stipe account and be logged in to view this page.

For our particular use case you will want to run the following commands to test the webhook locally:

```bash
stripe login
stripe listen --forward-to localhost:3000/stripe-webhooks/job-listing-order-complete
```

Just replace `stripe` with the correct version of the CLI you are using. For example, if you are one a Mac you should use `stripeMac` instead of `stripe`. If you download and use the CLI directly from Stripe's site you should be able to just use `stripe` as the command.

Once you run the `stripe listen` command you should see a webhook signing secret printed out in the terminal. You will need to copy this and add it to your `.env` file as `STRIPE_ORDER_COMPLETE_WEBHOOK_SECRET`. Once that is done you should be able to test publishing jobs as long as the stripe CLI listen command is running.

### Other Environment Variables

The only other thing you need to change is the `SESSION_SECRET`. This should be set to something random. For testing purposes you can leave it as is or just create something like a random UUID, but in production our devops team will create a unique secrets for us to use.

## Tasks

The tasks you need to complete are saved as issues on the GitHub repository. They will include all the information you need about the tasks as well as any mockups. You can find the issues [here](https://github.com/WebDevSimplified/React-Simplified-Bonus-Project/issues). I would recommend tackling the issues in the following order but it is entirely up to you.

1. Navbar and Light/Dark mode.
2. User Authentication
3. Create/Edit/Delete Job Listings
4. Job Listing Payments
5. Job Board/Filtering
