@FP2PC-64
Feature: Support for empty caption
  As a user
  I want to have the option to create an empty caption segment
  So I can manually add information about the picture

  @FP2PC-65
  Rule: It should not be possible to have a regular caption and an empty caption at the same time

  @FP2PC-66
  Scenario: It should not be possible to have a regular caption and an empty caption at the same time
    Given the user selected a photo with an aspect ratio of 1:1
    When the user specifies a caption
    And the user specifies an empty caption
    And the user starts the conversion process
    Then the final image should contain an empty caption segment
