# system-test
Sureify - Front end system test

# General Instructions

1. The following section contains a detailed text on what you need to do as part of this system test.
    
2. Read each section carefully, do not skip any section. As part of details, we have given the acceptance criteria as well.
    
3. If at any point, you feel like the requirement is not clear, call one of us and let us know your concern. Try not to speculate, each of us think differently.
4. Ideally we will receive notifications when you raise a PR and assign us as code reviewers, but if you feel we haven't acknowledged it, call one of us us and let us know.

# Code submission
1. Fork this repository [see the fork icon on the top right corner of this page].
2. Add regular commits and regular pushes to your forked repository.
3. Once you are done, raise a pull request against `codes` branch and assign following people as code reviewers.
- jayendrasharan
- wasib-sureify
- guttinasaibabu
- vijjuworld


# A Todo App

The goal of this test to see how you tackle the following:

1.  Coding standard
    
2.  Your approach on modularity of the application
    
3.  Problem solving approach
    
4.  Use and justification of use of standard libraries
    
5.  Decision making
    

## What we expect you to do.

You have to build a simple todo-application with certain features listed in the following sections. While we do not require you to build a fancy user-interface, we expect you should come up with a decent and standard design. As a modern front-end developer we never liked the default HTML button or the input fields, isn’t it?

  

A todo-application helps you to keep track of your tasks that you want to complete on any given day/time. Please let us know if you need any further explanation on this.

## Structure of a task

Here is a sample and minimal structure of a task that we would like you to keep.
 
|   Field name | Description                        | UI Element | Validations (if any)                                        | Allow Sort | Allow Search | Allow Group By |
|-------------:|------------------------------------|------------|-------------------------------------------------------------|------------|--------------|----------------|
| currentState | State of the task, open or done    | None       | By default all tasks will be set to open. Hint: Use boolean | Yes        | No           | No             |
| title        | One line summary of a task         | Text input | Max-length: 140 Chars Min-length: 10 Chars Accept: all      | Yes        | Yes          | No             |
| description  | Detail of the task                 | Textarea   |  Max-length: 500 chars Min-length: 10 chars Accept: all     | No         | Yes          | No             |
| createdAt    | Timestamp when the task is created | None       | Should be auto-filled based on current timestamp            | Yes        | No           | Yes            |
| dueDate      | Target completion date and time    | Datepicker | Time is optional                                            | Yes        | No           | Yes            |
| priority     | Priority of the tasks              | Dropdown   | None/Low/Medium/High                                        | Yes        | No           | Yes            |
  

## The design of the page

Consider this to be a starting point. Feel free to make any enhancement in the given design. However, if we feel the choice you made is a downgrade in the existing design, you should justify it. We are suggesting this design and we consider it suits the time period you have been given.

### Components on the page

1.  **Add a task button:** A composer button, which we usually see at the bottom right corner of any application. The text of the button should be a plus symbol (+). For reference, see the gmail app.
    
2.  **Adding a task (_add-task-form_):** Clicking on the + button should open a modal. A modal will have above mentioned fields. Use the following (rough) design for displaying the form inside the modal.
 
 ```
Summary: _____________________________________________________________

Description: ____________________________________________________________

______________________________________________________________________

______________________________________________________________________

  

Priority: None (default)/low/medium/high                 Due date: [datepicker]

                                                               [Cancel]  [Save]

  ```

3.  **Action buttons of the form:** Like all modals, this will have two buttons: i) Save Task, ii) Cancel
    
4.  **Actions:**
    1. **Save Task:** When a user clicks on save button, the UI should indicate that the API call is in progress.
    2. **Cancel:** All the changes done by the user in the form should be discarded.

5.  **Tabs:** The page should contain 3 tabs
	1. **All tasks:** this tab will contain all the tasks.
	2. **Completed:** this tab will contain only completed tasks.
	3. **Pending:** this tab will contain only pending tasks.
6. **List view of the tasks:** The content of each tab will be a list of tasks with following columns

`Summary | Priority | Created On | Due Date | Actions`

**Note:** The description is not displayed in this list view.

7.  **Actions:** Icons for edit, delete, and close/open the task. See later sections for the description of these actions.
    
8.  **Global Search:** Preferably on the top left-corner of the page, a text box to allow users to search within the page.
    
9.  **Group By dropdown:** A dropdown to allow the current tab’s list to be grouped by selected item.
    

## Must haves - I

1.  ### How to add a task?
    

To add a task, click on the + button present at the bottom-right corner of the application. A modal will open with add-task-form.

2.  ### What happens when a user adds a task?
    

By default the task should be treated as an open task. This task should be added at the top of the list in both “All tasks” and “Pending” tasks tabs.

3.  ### How to view the detail of a task?
Click on the task row. The modal should open read only view of _add-task-form_ with all fields filled in it.

**Note:** The add form will not contain all fields, for example created on, currentState (i.e. pending or open) but the view mode will contain such details. Make sure to add those detail in view mode.

4. ### How to edit a task?
    

To edit a task, click on the edit icon available in the Actions column of a row. When a user clicks on the edit icon, a modal will open with add-task-form. The values of the current task will be prefilled in the form.

Note: Unlike add, on editing the position of the task in the list should not change.

5.  ### How to delete a task?
    

To delete a task, click on the delete icon available in the Actions column of a row. When a user clicks on the delete icon, a modal will open with the task summary. The modal will also contain a question for the user: “Do you want to delete this task?”, with “Yes” and “No” action buttons.

  

The action buttons are self-explanatory. Check with us,if you need any help on this.

6.  ### How to mark a task as completed?

Click the done button available in the Actions column.

7.  ### What happens when a user marks a task as done?
	1. In the all tasks lists, the style of the task should change. E.g. make the background green, or put a strikethrough in the row.
	2. The “done” button should change to “re-open” in the actions column.
	3. A copy of task should be moved to “Completed” tab.

8.  ### How to mark a task as pending?

Click the re-open button available in the Actions column.

9.  ### What happens when a user reopen a task?
    
    This is the exact opposite of marking a task as done.
	1. In all tasks list, the style of tasks should become normal.
	2. The “re-open” button should change to “done” button.
	3. The task from “Completed” tab should be moved to “Pending”.

## Must haves - II

### Sorting

-   If a column is sortable (see the structure/configuration), clicking on the column header should sort the list based on that column.
    
-   If you are considering ASC as default, the first click should sort the list in ascending order.
    
-   If the user clicks on the column header again, the order should become descending.
    
-   Subsequent clicks on column header should alternate the sorting order.
    

### Searching

-   If a user starts to type in the “Global Search” text input, perform a search on the page with the given keyword.
    
-   While performing search, consider the “Allow search” key specified in the configuration.
    
-   The search should be case-insensitive.
    

### Highlighting

-   When there is a match, display the matched section of the text  <mark> highlighted</mark>.
    

### Group By

-   The dropdown will contain list of attributes for which “Allow group by” has the value yes.
    
-   As per above mentioned structure, the group by drop down should contain
	- None
	- Created On
	- Pending On
	- Priority.
-   Sample: If the user selects Priority from the dropdown, the list should become like the following:

| Summary        | Priority | Created on | Due date   | Actions              |
|----------------|----------|------------|------------|----------------------|
| High           |
| Task summary 1 | High     | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |
| Task summary 2 | High     | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |
| Medium         |
| Task summary 3 | Medium   | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |
| Task summary 4 | Medium   | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |
| None           |
| Task summary 5 | None     | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |
| Task summary 6 | None     | 12/07/2019 | 12/09/2019 | Edit | Delete | Done |

-   Give us a shout, if you need any further clarification on this.

**Note:** Sorting, searching, highlight, and group by - all these filters should persist when user changes the tab. For example, if the user has sorted the list on priority in ASC order in Completed tab, changing to All tasks tab should maintain the order.

## Must haves - III
1. If you are implementing your own modals, make sure we can close it by pressing escape key.
2. Add a short-cut for focusing user on global search. For example, if user presses Shift + Ctrl + F, focus on global search input text field.
3. Bulk action: Add checkbox in front of each row. Select multiple rows and perform bulk actions like delete and mark as done, mark as pending or any other applicable action.

# Who are we looking for?

-   We are looking for someone who can join our front-end team and get started in no time.
  
-   The more you showcase your knowledge on React JS and its ecosystem, the happier we will feel about you.
  
-   Have you used React hooks in your applications yet? If no, don’t worry about it, if yes, give it a try today. We will be glad to see it. But again, if you are not aware of it, we like the class-based components the same.
  
-   While we wouldn’t mind if you include bootstrap or any other library for creating UI elements like button, input, textarea etc, we would really want you to build your own components like tabs, list, modal, etc.
    

  

-   First impression is the last impression. It might not be true, but the first page we see when we run your application, will tell a lot of things about the application. So please give some time to it, and add all the required components on the page (see the list mentioned in previous sections).
    

  

-   First try to create the bare-minimum (concentrate on Must haves - I), then go on to pick and complete items listed in the next section (Must haves - II).
    

  

-   Think dynamic, low or no hardcode - we can and will go and update the values of the attributes listed in the structure in the page 1. You should save these configuration somewhere in your source code. So, if we mark “Priority => Group by => false”, the dropdown for the group by should not list Priority as an option.
    

  

Similar behaviour will be expected for other configuration items, like allow search, allow sort, etc.

  

Hint: Create a config file to store the configuration provided in the first section and refer to it while making a decision on searching/sorting etc.

  

-   We would want you to use Redux and possibly showcase the knowledge of middlewares you have.

-   Even though we are not asking you to integrate any API calls, consider the CRUD operations to be asynchronous actions. Use a redux middleware of your choice, redux-thunk, redux-saga, redux-observables, and so on.

Hint: Use setTimeout in your action creators to simulate the side-effect and asynchronous behaviour.

See an example here: [Simulate async actions using setTimeout](https://gist.github.com/jayendrasharan/981f2931dd52836fd92b960e736c05bf#file-simulate-async-js-L16)
  

# ** Earn extra points

1. Use of a rich text editor [library of your preference] for adding description of the tasks. 

2. Use the “Confirm before save” functionality. We understand that showing a modal after modal will become clumsy and this could lead to a lot of complications but if at all you are considering this feature, use native JavaScript “Confirm” pop-up.

3.  Consider the case when a user is not sure about her changes. So she made changes, then reverted it. Changed priority then again moved it to the old one. Then if she clicks the save button, do we need to update this data? 

	Add a logic to identify this. If the data of a task has not changed on clicking the save button, do not make the API call. In short, make the API call only if the data of a task has changed.
