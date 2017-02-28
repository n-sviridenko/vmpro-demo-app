Demo
====

Technologies
------------

* Server: PHP, Symfony 3
* Deployment: Ansible
* Virtualization: Vagrant

Requirements
------------

* VirtualBox ≥ 5.1.14 r112924 (Qt5.6.2)
* Vagrant ≥ 1.9.1
* `vagrant-hostmanager` plugin ≥ 1.8.5

Installation
------------

* `$ git clone`
* `$ make setup`

Usage
-----

#### Get videos

Request:

```
GET /app_dev.php/videos HTTP/1.1
Host: api.demo-app.dev
```

Response:

```json
[
  {
    "id": "2fEh7JMMHdYYen4pvSBVuB",
    "title": "iceland_sailboats_harbour.mp4",
    "thumbnail": "//i-qa.video-cdn.net/5KrAkktHyCu8asimu6suHa/24252.6373.thumbnail.JPEG"
  },
  {
    "id": "9U2LUWZ1vUDKVgAUKWs7ve",
    "title": "4x3short.flv",
    "thumbnail": "//i-qa.video-cdn.net/9N7FNpRctXY67khPo723it/24229.7532.thumbnail.JPEG"
  }
]
```

### Generate thumbnail

Request:

```
POST /app_dev.php/videos/2fEh7JMMHdYYen4pvSBVuB/generate-thumbnail HTTP/1.1
Host: api.demo-app.dev
Content-Type: application/json

{
	"video_generate_thumbnail": {
		"time": "00:00:05",
		"quality": "720p",
		"extension": "mp4"
	}
}
```

Response:

```json
{
  "url": "http:\/\/demo-app.dev\/uploads\/1488283789-2ffc7a6d402b6efbb8fff0afacfefa3a.jpg"
}
```
