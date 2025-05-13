# BatigoFrontEnd
# Angular 16 Construction Project Management System

Overview
This Angular-based application is designed to streamline construction project management. It provides tools for managing workflows, tracking products, handling supplier relationships, and logging incidents. The system aims to improve efficiency, transparency, and collaboration across construction projects.
Features

Workflow Management: Create, assign, and track tasks and workflows for project milestones.
Product Management: Maintain an inventory of construction materials and track their usage.
Supplier Management: Manage supplier information, contracts, and communications.
Incident Management: Log, categorize, and resolve incidents to ensure safety and compliance.
User Authentication: Secure login and role-based access control.
Dashboard: Visualize project progress, incidents, and key metrics.
.
.
.


## Overview
This Angular-based application is designed to streamline construction project management. It provides tools for managing workflows, tracking products, handling supplier relationships, and logging incidents. The system aims to improve efficiency, transparency, and collaboration across construction projects.

## Features
- **Workflow Management**: Create, assign, and track tasks and workflows for project milestones.
- **Product Management**: Maintain an inventory of construction materials and track their usage.
- **Supplier Management**: Manage supplier information, contracts, and communications.
- **Incident Management**: Log, categorize, and resolve incidents to ensure safety and compliance.
- **User Authentication**: Secure login and role-based access control.
- **Dashboard**: Visualize project progress, incidents, and key metrics.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16.x or later)
- **npm** (v8.x or later)
- **Angular CLI** (v17.x or later)
- **Git** (for version control)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yassinecher/batigo-client.git
   cd construction-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Copy the `src/environments/environment.example.ts` file to `src/environments/environment.ts`.
   - Update the API endpoints, authentication keys, or other configurations as needed.

4. **Run the Application**:
   ```bash
   ng serve
   ```
   - The app will be available at `http://localhost:4200`.

## Building for Production
To create a production build:
```bash
ng build --prod
```
The output will be in the `dist/` directory, ready for deployment.

## Project Structure
```
construction-management-system/
├── src/
│   ├── app/
│   │   ├── front/         # Reusable UI components
│   │   ├── back/           # Feature modules (workflow, products, suppliers, incidents)
│   │   ├── services/          # API and data services
│   │   ├── models/            # TypeScript interfaces and models
│   │   └── app.module.ts      # Root module
│   ├── assets/                # Static assets (images, styles)
│   ├── environments/          # Environment configuration files
│   └── styles/                # Global styles
├── angular.json               # Angular CLI configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## Usage
1. **Login**: Use your credentials to access the system (admin, manager, or worker roles).
2. **Dashboard**: View project summaries and navigate to specific modules.
3. **Workflows**: Create or update tasks, assign them to team members, and monitor progress.
4. **Products**: Add or update material inventory and track stock levels.
5. **Suppliers**: Manage supplier details and contracts.
6. **Incidents**: Report incidents, assign resolution tasks, and track status.

## API Integration
The application communicates with a backend API (not included in this repository). Ensure the backend is running and configured in `environment.ts`. Example endpoints:
- `GET /api/workflows`: Fetch all workflows.
- `POST /api/incidents`: Create a new incident.
- `PUT /api/suppliers/:id`: Update supplier details.

## Testing
Run unit tests using:
```bash
ng test
```
For end-to-end tests:
```bash
ng e2e
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, contact the project maintainer at [your-email@example.com](mailto:your-email@example.com).
