# BMA Video Backend
BMA (Bangkok Metropolitan Administration) Video Backend is the backend project to improve BMA Traffic's website with a more real-time security camera footage and more intuitive user interface.

## Usage
### Setup
Requirements: 
- NodeJS V16 and above

Steps:
1. `git clone https://github.com/WinsDominoes/bma-video-backend`
2. `npm install -y` 
3. Copy `default.json.default` to `default.json`
4. Get your ASP.NET Token from http://www.bmatraffic.com (Documentation coming soon) and paste it in `aspToken`

The default port is 1218

### Requesting Image
To request an image, send a `GET` request to the URL: 
`localhost:1218/img?camId=<camId>&time=<time>`

| **Parameters** | **Usage**                                          | **Type** |
|----------------|----------------------------------------------------|----------|
| `camId`        | The camera ID - Get it from https://bmatraffic.com | int      |
| `time`         | Time in UNIX time                                  | int      |

### Response Breakdown
You will get a response in JSON
Example:
```
{
    "error": 0,
    "response": 200,
    "image": "<BASE64 DATA>"
}
```
| **Key**    | **Usage**         | **Type** |
|------------|-------------------|----------|
| `error`    | Error message     | string   |
| `response` | Response code     | int      |
| `camId`    | The camera ID     | int      |
| `time`     | Time in UNIX time | int      |
| `image`    | The actual image  | base64   |

# Credits
Data from https://bmatraffic.com