@api @demo
Feature: Video

  Scenario: I can get videos
    When I send a GET request to "api_get_videos"
    Then the response status code should be 200

  Scenario: I can generate thumbnail for a video
    When I prepare a POST request to "api_post_videos_generate_thumbnail" with parameters:
      | videoId | 2fEh7JMMHdYYen4pvSBVuB |
    And I send it with body:
      """
      {
        "video_generate_thumbnail": {
          "time": "00:00:05",
          "quality": "720p",
          "extension": "mp4"
        }
      }
      """
    Then the response status code should be 200
    And print last response
