---

layout: page
title: "Blog"
permalink: /blog
nav: true
order: 1

---

Welcome to my blog. Below you will find my posts on some of my interests - including applied statistical modelling, R, machine learning, and data visualization. 

<h1 class="page-heading">Posts</h1>

<ul>
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}" title="{{ post.title }}">
      <span class="date">
        <span class="day">{{ post.date | date: '%d' }}</span>
        <span class="month"><abbr>{{ post.date | date: '%b' }}</abbr></span>
        <span class="year">{{ post.date | date: '%Y' }}</span>
      </span>
      <span class="title">{{ post.title }}</span>
    </a>
  </li>
  {% endfor %}
</ul>
