# code-cookbook

URL: [https://codecookbook.now.sh](https://codecookbook.now.sh)

Author:Taylor Khan

Code: github.com/nelsonkhan/code-cookbook-public

Date Started: June 30, 2017

Date Completed: July 19, 2017

**About**

Code Cookbook is a lightweight platform for developers to create, organize, and search for code snippets, bash commands, and other obscure bits of information.

**Why?**

I created Code Cookbook (referred to as CC from here on out) because I write software for the web. I often find myself having to learn obscure commands for various CLI programs, bash, and web frameworks. 

When I couldn’t figure something out, I would find a quick answer in documentation, Stack Overflow, or forums. 

After a few months in a new framework, I would forget the commands. 

When I needed to use the commands again, I would go back to Google, search for a problem I had already solved, scour results until I found the right answer, and then get back to work.

This seemed like a waste of time. I didn’t need to read through a whole Stack Overflow question, or browse the MDN again. I just needed the syntax - with no filler.

I created CC to get rid of the filler, and to act as a search engine for people like me.

I knew that it would be useful if I was the only one who ever used it, and it would be even better if other people did.

Aside from removing filler, it also acts as a cloud store. If I save the commands to my local machine, or write them on a scrap of paper, then I won’t have access to the information I want when I’m out and about.

I could save them in a Google Doc or something similar. But then I’m gathering all the info myself. It would be nice if others could collaborate with me, without managing permissions.

Finally, I wanted to build a project to show that I know the basics of the Express.js framework, and to sharpen my skills as a Javascript developer.

**Stack**

Technology stack is a weird concept when working with Node. 

On the one hand your stack could be considered your framework, server, database, and host OS. 

On the other hand, there are a lot of libraries and services that get used which aren’t included in the common stack acronyms. 

So, I’m going to list most of the tech I directly used and explain why I chose them. I won’t go into the dependencies of each, as that would be incredibly tedious for me, and boring for you!

**Express**

I’ve written an API using Node. I’ve written some CLI utilities using Node. Using Nightmare.js and Node, I’ve written some hefty web scrapers targeting javascript rendered sites. I’ve used Angular and React.

But never a backend framework. 

I noticed that Javascript was moving quite rapidly a few years back. The trend was similar to the Ruby on Rails hype that preceded it. 

I was a happy camper using RoR, and when the community around it started to die down - I was left disappointed. I didn’t want to make the same mistakes by hopping onto a JS framework early.

I have been using javascript heavily for the last few years, and now that some of the dust started to clear, I felt comfortable picking up a framework.

I also wanted to compare Express to RoR and see which I preferred.

In essence, the choice was experimental, and for personal development.

**Pug**

Pug is sort of the default choice for Express. It’s definitely possible to use other view engines, but most devs prefer Pug. I’ve already had experience with Pug and overall, I think it is the best choice available for server-side rendering. It is far cleaner, and thus clearer - than standard HTML. 

Brevity and readability is a good thing for HTML. Pug brings both to the table. It makes maintenance tasks such as editing or styling a far simpler affair. 

**Auth0**

This is my second application with Auth0. I may get some flak for trusting the security of my application to a third-party. If I was building a banking site, I might be inclined to agree. But I’m not, CC is a step up from a basic CRUD app. 

Is my hand-rolled authentication going to be significantly more secure than Auth0? 

Probably not. 

Auth0 charges for their higher end services, and are being adopted quickly by many devs. As far as I know, there haven’t been major security issues. 

My other apps have custom authentication, so it’s not like it would be a learning exercise for me.

At this point, why reinvent the wheel?

**Mongoose / MongoDB**

I used this setup on one of my previous applications. The concept of using JSON as a data store always felt like a good idea for me.

When I build an API, I usually deliver JSON. When I call an API I’m usually getting JSON. 

Why not store the data as JSON, and query in JSON? 

For Javascript development, MongoDB feels like a natural fit. Storing data in arrays and in objects inside of a record is a killer feature and eliminates a lot of tedious joins tables and querying. 

Mongoose has some shortcomings (no fuzzy search, I’m looking at you!) but so far I’ve found that they can all be overcome with some custom code.

**Bash**

This might be odd to include, but I actually used bash in place of a task runner on this project.

My unminified CSS is a total of 44 lines, and I figured it would be. Using a task runner just to use SASS would be total overkill.

The only task I really needed automated was bundling my frontend JS. Certainly I could use a task runner, but that sounds like needless configuration. 

I set up a bundle command in my package.json which concatenated my files nicely using a bash one liner. Then I set up my monitor script to rebundle everything and restart the app whenever new code was saved.

Gary Bernhardt, of Destroy All Software fame says "Half-assed is OK when you only need half of an ass". [[https://www.youtube.com/watch?v=sCZJblyT_XM&list=PLxd96E9IxfZXubJCt_iX1hEdxqyQlKSjG](https://www.youtube.com/watch?v=sCZJblyT_XM&list=PLxd96E9IxfZXubJCt_iX1hEdxqyQlKSjG)]

**Now**

I’ve used Surge, Heroku, Digital Ocean, and more. None of them match the ease of use for quick deploying with Zeit’s Now CLI.

**Misc**

There’s a few others, and I’ve probably missed or forgotten more. But here is a quick overview of some other tools inside the code:

* Passport (authorization)

* Dotenv (environment variables)

* Bling (lightweight jQuery alternative)

* Chai / Mocha (unit testing)

**Process**

I started off with the idea, an ethereal concept for what the code might do. 

I let it simmer for a while, to make sure I was solving an actual problem and not just a temporary frustration.

When I finally decided to make CC, I had just finished reading *The Pragmatic Programmer*, and gone through an ordeal building a web app where my team had failed to gather requirements in detail up front. So, I was very gung ho about putting the idea of a use case document into practice.

Even though it is a simple app, I wanted to be very thorough, I figured this was good practice for future projects.

After use cases, I started creating some interface mockups. I could have gone straight into design / architecture, but I find that a visual layout helps to really crystallize what is being built. The clearer the concept is before coding, the better.

Finally, I put together some design elements. I created a basic database schema layout. I used pseudocode as a placeholder for the routing, the controllers, and their methods.

Finally time to code. Because I did a lot of the work up front, most of the code was a breeze. I had a few hiccups, in trying to use TDD, and in AJAX requests.

I still haven’t quite figured out TDD with Express. There isn't enough custom logic in this app to really require it. Most of it is just database queries, and since those are all handled by Mongoose, which is fairly battle-tested...what is there to test?

AJAX requests were much simpler. AJAX requests are made using fetch, but I wasn’t sure how to authorize the user, as everything is running server side. This is not typically how Auth0 is used from what I can gather. The Express and Fetch docs were not very helpful here so I turned to reddit. Setting "credentials": true in the fetch request happily passed along the Auth0 JWT and authorized the user. 

**Final Thoughts**

I think I could have had a massive benefit using something like Protractor for front end testing. I spent as much time doing manual testing as I did writing code. Automating more could really help deploy speed in the future.

I discovered a handful of bash tricks in this project that I’m certain will be useful in the future.

I’ve posted these to CC as the following:

#### **Combine / bundle files using terminal with newline**

awk 'FNR==0{print ''}1' *.[file-extension] > [output-file]

#### **Find all files with specific text bash**

grep -rnw '/path/to/somewhere/' -e 'pattern'

#### **Find and replace using bash**

sed -i 's/[original]/[new]/g' [some-file]

These were all pretty useful. 

The bundler can let you modularize code without needing a separate task runner, which is good for light projects.

Find all files with specific text is recursive so it will search a whole directory. Very nice for when you want to change the name of a function for clarity. It could also be useful if someone hardcoded in a bit of sensitive information directly instead of using environment variables.

Find and replace only affect one document, but if that one document has a lot of instances of the original text - this can be a lot quicker than opening up an editor.

