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

- Parent page to display more information on a particular company.

    ![Screenshot of company page](docs/readme-images/company-page.png)

The Company Page provides a framework for a number of components:

- ***Company Component (Company.js)***

    - Renders company information in responsive layout including:

        - Company name
        - Company logo
        - Brief description to describe what the company does
        - Additional information on the ethos and activities of the company
        - Endorsements Count
        - Comments Count
    - The company name and logo both link directly to the company's own website in a new tab.

    ![PLACEHOLDER Company details component](docs/readme-images/company-component.png)

- ***Company Contact Details (CompanyContact.js)***

    - Renders company contact details in responsive layout including:

        - Company address
        - Company telephone number
        - Company website link
    
    If there are no address / phone / website details conditional rendering displays a message to the user.

    ![Company contact details component on desktop](docs/readme-images/contact-desktop.png)

    ![Company contact details component on mobile](docs/readme-images/contact-mobile.png)

    
- ***Credentials Component (Credentials.js)***

    - Displays any eco-credentials that have been assigned to the company.
    - Credentials are listed under the relevant credential group
    - Each credential features a leaf icon instead of a bullet point to reinforce environmental focus.

    ![Company credentials component for an authenticated user](docs/readme-images/credentials-authenticated-not-owner.png)

- ***Add/Edit Credentials Button***

    - Button only visible if the current logged in user is also the company owner (the person who submitted the company to be listed).
    - When clicked, the button updates a showForm state from the default 'false' to 'true', enabling a form to display.
    - When clicked again, the button updates the showForm state back to 'false' so that the form is no longer displayed.

    ![Add/edit credentials button](docs/readme-images/credentials-owner.png)

- ***Credential Select Form (CredentialSelectForm.js)***

  - **Add Credentials**
      - If the current logged in user is also the company owner, they can click on the Add/Edit credentials button to display the form.
      - Credentials are listed in four separate drop down menu input fields under each of the four eco-credential groups.
      - The owner can select as many credentials from the groups lists as they wish by holding down Ctrl.
      - Clicking on 'Add Credentials' adds the credentials to their existing list of credentials.
      - Once submitted, the company page refreshes so that the list of credentials is updated with the latest information and the owner can see that the selected credentials have been added.
      - Clicking 'X Cancel' closes the form again.

    ![Select credentials form as owner](docs/readme-images/select-credentials-form.png)

  - **Remove Credentials**
      - The remove credentials form lists all of the credentials currently assigned to that company instance.
      - The company owner can select as many credentials as they wish my holding down Ctrl.
      - Clicking on 'Remove Credentials' removed the credentials from the existing list of credentials.
      - Clicking 'X Cancel' closes the form again.    

    ![Remove credentials form as company owner](docs/readme-images/remove-credentials-form.png)

- ***Add Comment Form (CommentCreateForm)***

  - Authenticated users can comment on any company. 
  - Company owners are allowed to comment on their own companies so that they can respond to other user comments.
  - Conditional rendering is used to only display the CommentCreateForm to authenticated users.

  ![Comment Create Form with avatar](docs/readme-images/comment-create-form.png)

- ***Comments***

  - All users are able to view all comments left for a company. 

    - **Comment Owner**
    When logged in as the owner of the comment ......

    ![PLACEHOLDER Comments list as comment owner ](#)

    - **Casual User**
    When viewing as a casual user......

    ![PLACEHOLDER Comments list as casual user ](#)

### Add Company Form (CompanyCreateForm.js)

- Info

### Edit Company Form (CompanyEditForm.js)

- Info

### My ecoPositive Profile ()

### Edit Profile Form ()

### Admin Page ()

### Page Not Found ()

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
