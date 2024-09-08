Feature: Make a reservation at the cinema
    Scenario: Booking one seat
        Given user is on the cinema page
        When user selects the session date
        When user chooses the session time
        When user chooses one place
        When user clicks the booking button
        Then user sees the inscription "Вы выбрали билеты:"   
    Scenario: Booking two seat
        Given user is on the cinema page
        When user selects the session date
        When user chooses the session time
        When user chooses one place
        When user chooses the second place
        When user clicks the booking button
        Then user sees the inscription "Вы выбрали билеты:" 
    Scenario: Сhoosing a reserved seat
        Given user is on the cinema page
        When user selects the session date
        When user chooses the session time
        When user selects the reserved seat
        Then user sees that the booking button is not active "true"        