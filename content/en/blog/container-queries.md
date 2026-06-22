---
title: CSS Container Queries vs Media Queries
slug: container-queries
excerpt: Learn how container queries allow styling based on parent container dimensions instead of browser viewport.
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
Container queries enable components to adapt dynamically based on the width of their parent container rather than the entire browser viewport width. This makes them highly reusable.

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
This is extremely useful for reusable component grids.
