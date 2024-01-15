# Future Improvements

## API Integration

Currently, this automation suite only relies on UI actions to perform tests. This introduces lengthy test execution times because
of all the UI interactions and page reloads needed to execute a simple user flow. In the future, it would be beneficial to use API requests
in before and after steps of the test cases to eliminate the extra UI interactions.

For example, in the Add User test flow, to ensure a user can be added, there needs to be an Employer Name. The employers are pulled for an existing data set,
and relying on an entry in that dataset could result in test failure. As best practice, in the before script, an employer is added through the UI, then a user is
added under that new employer. Afterward, the new employer is deleted through the UI. To improve efficiency, the employer could be added with an API POST request, and
deleted with an API DELETE request.

## Base Page Class

There are functions used by multiple class pages where the code is duplicated. To reduce duplicate code, there could be a basePage.js where these
functions could be defined, and imported into the specific class page.

For example, `enterAutocomplete()` is used in both adminPage.cy and pimPage.cy. Moving this to a basePage.cy, then importing them into the respective files would aid in maintainability.
If there was a UI functional change to the autocomplete field, it would only need fixing in basePage.cy rather than both adminPage.cy and pimPage.cy

## Selectors

There are two files in the `cypress/selectors` directory. This directory was meant to store the selectors separately from the page classes to aid in maintainability.
The selectors for the demo web app were not the most consistent, only Login and Dashboard CSS selectors were implemented in this way.
