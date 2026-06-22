---
title: সিএসএস কনটেইনার কোয়েরি বনাম মিডিয়া কোয়েরি
slug: container-queries
excerpt: মিডিয়া কোয়েরির চেয়ে কনটেইনার কোয়েরি কীভাবে আরও রিইউজেবল লেআউট তৈরিতে সাহায্য করে তা জানুন।
date: 2026-06-10
author: jane-smith
categories:
  - Styling
  - Frontend
tags:
  - CSS
  - Layout
featuredImage: /static/images/blog/tailwind.jpg
draft: false
---
মিডিয়া কোয়েরি পুরো ব্রাউজার ভিউপোর্টের ওপর ভিত্তি করে স্টাইল পরিবর্তন করে, অন্যদিকে কনটেইনার কোয়েরি তার প্যারেন্ট কনটেইনারের বা বক্সের উইথ অনুযায়ী নিজেকে মানিয়ে নেয়।

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```
এটি রিইউজেবল এবং গ্রিড লেআউট ডিজাইনের জন্য অসাধারণ একটি ফিচার।
