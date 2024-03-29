@FP2PC-20
Feature: Changing the directory for the processed images
  As a user
  I want to be able to specify the directory in which the processed images will be saved
  So, I can make sure that the app has sufficient write permissions and disk space

  @FP2PC-22
  Rule: The user should be able to change the directory for the processed images

  @FP2PC-24
  Scenario: The user should be able to change the directory for the processed images
    Given the user selected a Flickr photo
    When the user specifies the directory for the processed images
    And the user starts the conversion process
    Then the processed photo should be located in the specified directory
