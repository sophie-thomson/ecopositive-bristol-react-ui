# EcoPositive Bristol (REACT UI)

[ecoPositive Bristol](https://ecopositive-react-pp5-0012331e7023.herokuapp.com/) is a one stop directory championing Bristol’s eco-conscious and socially responsible businesses.

Unlike other business directories, ecoPositive is focused on highlighting the environmental awareness and community engagement of a company's actions and ethos.

This is good for the company owner as this information is often buried in a website and not at the forefront of their profile or reputation.

Business owners are invited to list their company or business and highlight their eco-positive credentials from a list of 50 pre-determined options listed under group headings.

All users are able to view the directory and see the company details so they can quickly identify local companies that align with their own ecoPositive priorities whether they sign up or not.

Users are invited to sign up to endorse the companies that they support and comment on listed businesses so that other visitors to the site can see which businesses are popular.

All listed companies and businesses are held accountable by the community / customers / clients as users can choose to endorse companies that they have personal experience of, and comment on the company profile if they do not agree with the eco-credentials or description that the company has posted.

The goal of this REACT user interface is to provide an engaging and user-friendly front end website that users can interact wih in order to create, read, update and delete data in the [back end API](https://ecopositive-api-pp5-ba0d580957dc.herokuapp.com/admin/) and to ensure they get the most out of the site.

![Placeholder mock up on multiple devices](placeholder image)

## Features

### Site Wide & Reusable React Components
<hr>

This project leverages a modular approach by creating and reusing various React components to build the application's front-end efficiently. Below is a list of reusable components, along with descriptions and their usage within the application.

***Favicon (site wide)***

- A favicon with the letter eP in different green tones to represent two parts of the name 'eco' and 'Positive'.
- Usage:
    - Used across the entire application at the top level

![ecoPositive favicon in use](docs/readme-images/favicon.png)

***Nav Bar (components/NavBar.js)***

- Navigation bar with clear brand heading and logo for ecoPositive.
- Includes links for easy navigation around the site. Only links that are accordante with user role and authentication are displayed for better user experience.
- Fully responsive with navigation links collapsable into a burger 'Menu' icon on smaller deviced to keep layout clean and uncluttered.
- Links are grey when not in use and coloured green when 'active' to help users identify where they currently are in the site.
- Usage:
    - Used across the entire application at the top level

![ecoPositive nav bar with collapsed menu](docs/readme-images/collapsed-navbar.png)

- **Logged Out Links**

    The links that are visible to all users when not logged in are:

    - Browse - Links to 'home' page where all users can view a list of companies with basic info.
    - Sign In - Links to the sign in form
    - Sign Up - Links to the sign up form

![ecoPositive nav bar for logged out users](docs/readme-images/logged-out-navbar.png)

- **Logged In Links**

    The links that are visible to authenticated users when logged in are:

    - Browse - Links to 'home' page where all users can view a list of companies with basic info.
    - Sign Out - Enables the current logged in user to log out.
    - My ecoPositive - Links to the current user's profile details and personalised list of endorsed companies

![ecoPositive nav bar for logged in users](docs/readme-images/logged-in-navbar.png)

Additional links that are visible to authenticated users with admin status when logged in:

  - **Staff Only** - Links to admin page for admin staff to approve new companies and review reported comments


![ecoPositive nav bar for logged in admin users](docs/readme-images/admin-navbar.png)

***Add Company Banner (components/AddCompany.js)***

- A banner message using Bootstrap NavBar styling to enable a user to add their own company to the site.
- Links to CompanyCreateForm where a logged in user can add company details and submit them for approval.
- Banner visible on all pages whether logged in or not so company owners can easily see how to add their own company from whichever page they are on.
- Conditional rendering used to highlight that users must be logged in to add their own company.
- Usage:
    - Used across the entire site at the top level

![Add company bar with sign in prompt](docs/readme-images/add-company-bar.png)  

***Three Dots Dropdown (components/DotsDropdown.js)***

- A drop down menu conditionally rendered to authenticated users identified as the instance owner to enable an item to be edited / deleted.
- Three dots indicate a hidden 'more' menu and when clicked display two icons to edit or delete.
- The edit icon calls the relevant 'handleEdit()' method for that particular item instance.
- The edit icon calls the relevant 'handleDelete()' method for that particular item instance.
- Usage:
    - Company.js - to enable company owner to edit / delete the company instance
    - Comment.js - to enable the comment owner to edit / delete the comment instance
    - ProfilePage.js - to enable the profile owner to edit / delete the profile

![Three dots dropdown](docs/readme-images/three-dots-company.png)

***Asset (components/Asset.js)***

- Spinning wheel component to be added anywhere that data is to be loaded so user sees spinning wheel until everything has been mounted and rendered.
- Usage:
  - CompanyList.js
  - CompanyListPage.js
  - CompanyPage.js
  - Credentials.js
  - CredentialSelectForm.js
  - ProfilePage.js
  - TopCompanies.js

![Spinner for loading content](docs/readme-images/spinner.png)

***Avatar (components/Avatar.js)***

- Component to display the logged in user's avatar next to their profile link in the navbar and anywhere that their profile details are displayed (such as comments).
- Sets standard avatar image size and layout for consistencey across the site.
- Where no avatar has been submitted, a default plank profile icon is used.
- Usage:
  - Navbar - authenticated users will see their avatar in the navbar next to the My ecoPositive link.
  - Comments - the avatar is displayed next to a user's comments.

![Avatar for logged in users](docs/readme-images/avatar-comment.png)

### Company Directory (CompanyListPage.js)
<hr>

- The main 'home' page listing all companies in the directory providing a brief snapshot of each company which links to the company details.
- A search bar enables the user to search for companies by name, excerpt, key words or eco-credential group.
- Bottomless scrolling so users can view as many companies as they wish and encourages sustained engagement.

![Searchbar for Company Directory](docs/readme-images/search-bar.png)

- ***Company List Component (CompanyList.js)***

    - Bootstrap card rendered for each company providing a snapshot including: 
      - Company name, 
      - Company logo
      - Brief description
      - Endorsement count
      - Comment count
      - Group headings relating the the credentials assigned to the company
    - Logo and Company name link to the Company Page (CompanyPage.js) for further information.

    ![PLACEHOLDER Company list viewable by all users](#)

### Company Page (CompanyPage.js)
<hr>

- Parent page to display more information on a particular company.

    ![Screenshot of company page](docs/readme-images/company-page.png)

The Company Page provides a framework for a number of components:

- ***Company Component (Company.js)***

    - All casual users when not logged in can see the company details.
    - Conditional rendering displays a message to not logged in users that they need to sign in to endorse a company.
    - The Company component renders company information with fully reponsive styling. 
    - All users can view:
        - Company name
        - Company logo
        - Brief description to describe what the company does
        - Additional information on the ethos and activities of the company
        - Endorsements Count
        - Comments Count
    - The company name and logo both link directly to the company's own website in a new tab.

    - **Company Component as Authenticated Users**
      - When logged in, conditional rendering is used to display the 'Endorse Company' button to authenticated users who are not the company owner.

      - When an authenticated user clicks on the Endorse Company button, the endorsement count increases by 1 and the button changes format to become the 'Remove Endorsement' button.

      - Each authenticated user is only allowed to endorse a particular company instance once. This is also set as a unique_together contraint within the Endorsement data model.

    ![Screenshot of Company details component](docs/readme-images/company-component.png)

    ![Screenshot of endorsed company](docs/readme-images/endorsed-company.png)

- **Company Component as Owner**
  - For each company page, conditional rendering is used to check if the current authenticated user is the owner of the comapny.
  - The company owner will not see the 'Endorse Company' button as the owner is not allowed to endorse their own company.
  - If is_owner is true, the owner will see the three dots dropdown menu to enable them to edit or delete the company.
  - Clicking on the edit icon takes the owner to the ComapnyEditForm (see below section)
  - Clicking on the delete icon renders a modal asking the user to confirm that they want to delete the company.

  ![Screenshot of Company component as the company owner](docs/readme-images/company-component-owner.png)

  ![Screenshot of delete company modal](docs/readme-images/delete-company-modal.png)

- ***Company Contact Details (CompanyContact.js)***

    - Renders company contact details in responsive layout including:

        - Company address
        - Company telephone number
        - Company website link
    
    If there are no address / phone / website details conditional rendering displays a message to the user.

    ![Screenshot of company contact details component on desktop](docs/readme-images/contact-desktop.png)

    ![Screenshot of company contact details component on mobile](docs/readme-images/contact-mobile.png)

    
- ***Credentials Component (Credentials.js)***

    - Displays any eco-credentials that have been assigned to the company.
    - Credentials are listed under the relevant credential group
    - Each credential features a leaf icon instead of a bullet point to reinforce environmental focus.

    ![Screenshot of company credentials component for an authenticated user](docs/readme-images/credentials-authenticated-not-owner.png)

- ***Add/Edit Credentials Button***

    - Button only visible if the current logged in user is also the company owner (the person who submitted the company to be listed).
    - When clicked, the button updates a showForm state from the default 'false' to 'true', enabling a form to display.
    - When clicked again, the button updates the showForm state back to 'false' so that the form is no longer displayed.

    ![Screenshot of Add/edit credentials button](docs/readme-images/credentials-owner.png)

- ***Credential Select Form (CredentialSelectForm.js)***

  - **Add Credentials**
      - If the current logged in user is also the company owner, they can click on the Add/Edit credentials button to display the form.
      - Credentials are listed in four separate drop down menu input fields under each of the four eco-credential groups.
      - The owner can select as many credentials from the groups lists as they wish by holding down Ctrl.
      - Clicking on 'Add Credentials' adds the credentials to their existing list of credentials.
      - Once submitted, the company page refreshes so that the list of credentials is updated with the latest information and the owner can see that the selected credentials have been added.
      - Clicking 'X Cancel' closes the form again.

    ![Screenshot of select credentials form as owner](docs/readme-images/select-credentials-form.png)

  - **Remove Credentials**
      - The remove credentials form lists all of the credentials currently assigned to that company instance.
      - The company owner can select as many credentials as they wish my holding down Ctrl.
      - Clicking on 'Remove Credentials' removed the credentials from the existing list of credentials.
      - Clicking 'X Cancel' closes the form again.    

    ![Screenshot of remove credentials form as company owner](docs/readme-images/remove-credentials-form.png)

- ***Add Comment Form (CommentCreateForm)***

  - Authenticated users can comment on any company. 
  - Company owners are allowed to comment on their own companies so that they can respond to other user comments.
  - Conditional rendering is used to only display the CommentCreateForm to authenticated users.

  ![CScreenshot of comment Create Form with avatar](docs/readme-images/comment-create-form.png)

- ***Comments***

  - All users are able to view all comments left for a company, however there are a few additional elements that are only rendered to users according to their authentication role.
  - Infinite Scrolling ensures that users can view all comments made for a particular company if they wish to.
  - Every user, regardless of authentication or logged in status will see:
    - Username of commenter
    - Avatar of the commenter (or default profile image if not updated)
    - Comment content
    - Time passed since the comment was created

- **Casual Users**
    When viewing as a casual user who is not logged in, the user can see the list of comments and a message to prompt them to log in to leave a comment of their own.

    ![Screenshot of Comments list as casual user ](docs/readme-images/comments-casual.png)

- **Authenticated User**
    - When logged in, authenticated users can see all of the above content, and the comment create form.
    - In addition, they can see a flag icon and label enabling them to report that particular comment if they wish.

    ![Comments list as authenticated user ](docs/readme-images/comments-authenticated.png)

    - All comments are not reported by default. Clicking on the flag of an unreported comment displays two buttons to report the comment or not.

    ![Screenshot of comment reporting buttons when flag clicked](docs/readme-images/comment-with-report-buttons.png)

    - Once a comment is reported, the flag turns red and the message states 'Comment Reported'.
    - Clicking on the flag of a reported comment displays the message: 'This comment is being reviewed by ecoPositive staff'.

    ![Screenshot of already reported message when flag clicked](docs/readme-images/comment-already-reported.png)
    
- **Comment Owner**
  - When logged in as the owner of the comment instance, the user sees all of the the above and the three dots dropdown menu which includes a handleEdit and handleDelete function.
  - Clicking on the flag of an unreported comment as the owner displays the message: 'You cannot report your own comment' instead of rendering the report buttons.
  - Clicking on the flag of a reported comment as the comment owner displays the message: 'Your comment has been reported, you may wish to edit or delete this comment'.

  ![Screenshot of comment as owner with dropdown and report message](docs/readme-images/own-comment-flag-and-dots.png)

  ![Screenshot of comment reported as owner](docs/readme-images/comment-reported-flag-owner.png)

  - Clicking on the edit icon renders the CommentEditForm which is pre-populated with the comment content and two buttons to 'Save' or 'X Cancel'.

  - Clicking on the save button updates the comment and a popup message confirms that the comment has been updated successfully.

  - Clicking on the delete icon in the drop down renderd a modal asking the user to confirm that they definitely want to delete the message.

  ![Screenshot of comment edit form with updated content](docs/readme-images/comment-edit-form.png)

  ![Screenshot of comment updated message](docs/readme-images/comment-updated-message.png)

  ![Screenshot of delete confirmation modal](docs/readme-images/comment-delete-confirm-modal.png)
    

### Add Company Form (CompanyCreateForm.js)
<hr>

- Any authenticated user can submit a company to be considered for addition to the ecoPositive directory.
- Conditional rendering will only display the Add My Company link in the AddCompany banner if a user is logged in.
- A useRedirect(loggedOut) hook at the top of the form function provides defensive authorisation sending unauthenticated users back to the home page if they try to access the from from the url.
- Clicking on the Submit Company button creates the company in the api and redirects the user to the associated company detail page so they can add their company credentials.
- New companies are not approved and so are not included in the home page listing which only displays companies that have been approved for listing.
- Unapproved companies can be viewed by the company owner so they eco-credentials can be added without having to wait for the approval process to be completed. If they navigate away from the initial company page redirect, the new company will be accessible from their profile page.

![Screenshot of the Add Company Form](docs/readme-images/add-company-form.png)

![Screenshot of new company with no other details added](docs/readme-images/new-company.png)

### Edit Company Form (CompanyEditForm.js)
<hr>

- Conditional rendering displays the three dots dropdown menu to a comapny owner only.
- Clicking on the edit icon in the company sends the owner to the CompanyEditForm which is already pre-populated with the company data.
- Clicking on Submit Changes sends the updated company data to the api to be displayed in the firectory.
- Companies are initially approved to ensure that they fit the profile and eco-conscious criteria for being included in the directory, and that they have provided authentic company contact details.
- Company edits do not require approval so the company is listed with any new edits, but users are able to comment on any company to highlight any issues that they do not feel are correct.

![Screenshot of Edit Company Form as owner](docs/readme-images/edit-company-form.png)

### My ecoPositive Profile (ProfilePage.js)
<hr>

- Every authenticated user is automatically assigned a profile page accessible from the navbar.
- The link to the user's My ecoPositive profile is conditionally rendered, so is only visible to the authenticated user.
- Defensive authentication is built into the page with a redirect hook to send any casual user back to the home page if they try to access the page from a url link.
- If another authenticated user tries to access the profile page from a url link, the profile data for the logged in user (and not the user id in the url) is used to render the page.

![Screenshot of a Profile Page](docs/readme-images/profile-page-robin.png)

- The profile page includes four main sections:
  - **The main profile**
    - If a first name has been added to the profile data this is used as the greeting header
    - The number of companies submitted and the number of companies endorsed is listed at the top of the page
    - Conditional rendering is used to display appropriate messages to the user to encourage further engagement with the app

  ![Screenshot of main user profile section](docs/readme-images/main-profile.png)

  - **Own Companies**
    - A list of companies that the profile owner has submitted to the directory.
    - Conditional rendering is used to remove this section if there are no companies submitted.
    - A dark green border is used to differentiate this list from the other sections and references the colour used for all company names throughout the site.

  ![Screenshot of own companies section](docs/readme-images/own-companies.png)

  - **Endorsed Companies**
    - A list of companies that the profile owner has endorsed.
    - This provides the equivalent of a 'liked or favourites' list and enables the user to quickly view all the companies that they support. Essentially their own ecoPostive Directory.
    - When there are no endorsements to show, the container remains in place with a message to further encourage the user to endorse their first company.
    - A bright orange border is used for this container to reference the same colour that is used to display endorsemenets information throughout the site.

  ![Screenshot of endorsed companies section](docs/readme-images/endorsed-companies.png)

  - **Highly Recommended**
    - This is the same component that is displayed in the CompanyListPage which serves as the main directory.
    - The top three endorsed companies are listed here if viewing on a mobile device, or if on a desktop the top 5 endorsed companies are listed.
    - The top companies list is intended to provide inspiration for companies to have a look at.
    - As users endorse different companies at all times, the TopCompanies component should display a range of different companies.   

  ![Screenshot of highly recommended section](docs/readme-images/top-companies-mobile.png)

### Edit Profile Form (ProfileEditForm.js)
<hr>

- As the only person who can access the profile page is the current authenticated user, they can always see the three dots dropdown menu to edit or delete their profile.
- Clicking on the edit icon takes the user to the ProfileEditForm.
- Clicking the delete icon renders a delete confirmation modal to confirm if they are sure that they want to delete the profile and all associated companies and endorsements.

![Screenshot of edit profile form](docs/readme-images/edit-profile-form.png)

![Screenshot of delete profile confirmation modal](docs/readme-images/delete-profile-modal.png)

### Admin Page (AdminPage.js)
<hr>

- This page is only accessible by authenticated users with the is-staff status assigned to them.
- The Staff Only link in the navbar is conditionally rendered to display only if the current user is_admin.
- Further conditional rendering checks that the current user is_admin before rendering the content in the page.
- The admin page is a parent component that has two child components nested within it.

  - **New Companies (NewCompany.js)**
    - The New Companies section fetches a list of all companies that are not yet approved and lists each one within a NewCompany component.
    - If the company is not approved, the admin staff can contact the company owner outside of the admin page processed to discuss what is required to be approved.
    - Each NewCompany component includes:
      - Company Name - links to the company page to be reviewed for approval
      - Data added - the date that the company was submitted
      - Approve button - Clicking on this button updates the approved boolean for the company instance to true.
 
  ![Screenshot of admin page](docs/readme-images/admin-page.png)

  - **Reported Comments (ReportedComment.js)**
    - The Reported Comments section fetches a list of all comments that have been reported so they can be reviewed by an admin.
    - Clicking on the Approve button resets the reported boolean back to false so that the comment can be listed in the original location.
    - Clicking on Delete renders a confirmation modal for the admin to confirm if the comment should be deleted.
    - The handleDelete function also reduces the comment count for that company instance by 1.
    - Each comment is rendered into a ReportedComment component which includes:
      - Company Name - this links to the company page so the admin can view the context of the comment in relation to other comments.
      - The commenter username and avatar. The avatar is not shown on small devices to ensure that the page is fully responsive.
      - The comment content for review
      - The period of time since the comment was made
      - An approve button {handleApprove} and a delete button {handleDelete}.

  ![Screenshot of delete confirmation modal](docs/readme-images/delete-comment-modal.png)

### Page Not Found (PageNotFound.js)
<hr>

- This page is a catch-all route for any url configuration with the base url, but for an unrecognised page.
- The home icon and text link back to the home page so the user has the option to go there or choose a different page.

![Screenshot of page not found content](docs/readme-images/page-not-found.png)

### Future Features

## UX Design
    - Colour Palette
    - Background Image
    - Typography
    - Icons

## Design Process

### User Stories

### Agile Methodology

### Data

***Models***

- The next step was to plan and devise an ERD for each of my database models and a schema to map out and understand the relationships between them. I created an ERD and model schema for the project and the data structured required for the UI to work.

You can view all ERDs and the full schema in the [back end ecoPositive API](https://ecopositive-api-pp5-ba0d580957dc.herokuapp.com/admin/) README.

***User Authentication***

Throughout the site, conditional rendering and fetchData filtering methods are used to ensure that the content rendered is accordant with the authentication profile for that user.

There are three main user authentication levels:
- **Casual User**
    - Any user who visits the site and is not logged in.
- **Authenticated User**
    - A user who has signed up to the site and successfully logged in.
- **Authenticated Admin**
    - An authenticated user who has been given is_staff status in the api admin dashboard (accessible by superusers only).

In addition to the above general authentication levels: 
- **is_owner**
    - Checks if the current authenticated user is the owner of that particular instance. Conditional rendering is then used to display elements which are only accessible by the instance owner.

### Wireframes

- Initial Wireframe designs were used to plan out the layout for the CompanyList and CompanyPage. These views are visible to all users whether logged in or not.

![Directory Listing Wireframe Design](docs/readme-images/home-page-laptop.png)

![Company Detail Wireframe Design](docs/readme-images/company-details-laptop.png)

![Placeholder for Profile Page wireframe](#)

![Placeholder for Admin Page wireframe](#)



## Testing

### Automated Testing

### Manual Testing
