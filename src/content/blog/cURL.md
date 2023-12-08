---
tags:
  - Technology
  - Software-Engineering
  - Public
title: cURL
date: " 2023-12-08"
---
---
## What is cURL?
Client URL (cURL) is a protocol that allows one to execute quick HTML requests from their terminal. 

cURL commands use [libcURL client-side URL transfer library](https://curl.se/libcurl/) which supports many different transfer protocols such as [[HTTP]], [[SMTP]], and [[FTP]]. On top of that, it also enables you to include cookies, set [[proxies]], and add auth credentials when making requests.

	cURL comes pre-installed on Windows and MacOS
## What is cURL used for?
* Testing APIs
* Downloading data from sources 
	Since the terminal has access to the file system, cURL is able to download images from urls easily.
	For example here is a command to download the google logo and save it as`google-logo.png`

```terminal
"cURL https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png > google-logo.png"
```

* Testing websites
* Following redirects from the terminal
* Saving URL content
	Like downloading images, you can also save the content of a URL (a webpage) to a file. 

```terminal
"cURL -o google.html https://www.google.com" 
```
This command downloads the source code of Google's home page and saves it as `google.html`
## How to use cURL
The syntax of a cURL command is `cURL [options] [URL]`

### Requesting data with cURL
Example cURL get request: 
```terminal
cURL https://jsonplaceholder.typicode.com/todos/1
```

**Note**: cURL commands ran with no `[options]` params will default to a `get` request. If you wanted to make the same request as above but with explicit params it would look like this:

```terminal
cURL -X GET https://jsonplaceholder.typicode.com/todos/1
```

The `-X` flag tells cURL that you will be invoking a request method (like `GET`, `POST`, `DELETE`, `PUT`).

This request, when run in the terminal would return the following object:
```json
{  
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## cURL Protocols and Formats
By default, cURL uses HTTP protocol but it does support other methods of transferring/requesting data.
### FTP
cURL can be configured so it can use FTP (File Transfer Protocol). Doing so allows one to transfer files from a client to a server with a single command like this: 
```terminal
cURL -T [selected-file] "ftp://[target-destination]"
```
> I should absolutely read into this more and see what ways people use cURL and FTP together. 

### SMTP
[Simple Mail Transfer Protocol](SMTP) and cURL allows you to send emails from the command line of your computer: 
```terminal
cURL smtp://[smtp-sever] --mail-from [sender] --mail-rcpt \ [receiver] --upload file [mail-content-file]" https://blog.hubspot.com/website/curl-command
```