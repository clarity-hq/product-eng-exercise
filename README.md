# Overview

The purpose of this application is to surface product feedback about Clarity to the team and allow us to explore the data based on different filters.

The data exists in our "database" (`api/data.json`) and is surfaced in a data table via our web application:
![preview screenshot](/preview.png)

This is helpful to view all of our data at once, but falls short when we want a more granular view of the feedback list.

The goal of this exercise is to build a filter menu similar to Linear's:
![linear preview video](/linear_preview.gif)

We'll leave it up to you to decide what filters make sense here.

# Setup

Ensure that `node` is installed on your system (`node -v`) and that `npm` is up to date (`npm install -g npm@latest` on macOS)

- Fork this repository and clone it onto your machine
- Run `npm i` from the repository root to install dependencies
- Run `npm run dev` from the repository root to start up the client + server
- Save your changes to hot-reload the client or server

# Implementation

For this exercise, we'll do all of the filtering on the server. Since this feedback will be resulting from all of a company's customer interactions, there is to much data to store it all on the client.

There are two `TODO`s in the codebase: one on the client (creating filter menus + state) and one on the server (using the filter data passed to the endpoint).

Client / server communication should work out of the box, so you can focus on the filter functionality.

Some guidance on approach:

- We care more about quality than speed for this exercise. Try to write code that's legible and would be easy for someone to read.
- Think through how patterns could generalize to other places in the application.
- You don't have to write everything from scratch. If it makes sense to use a third-party library, do it.

Broadly, we want you to treat this project like something that is shipping to production rather than a coding challenge. Imagine that this code won't be thrown away, but merged into the codebase and deployed to our customers.

# Submission

When you finish, email a link to your forked version of the repository to founders@adopclarity.com
