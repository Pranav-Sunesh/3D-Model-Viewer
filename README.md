<h1>3D Model Viewer</h1>
<h3>Description</h3>
This web application allows users to view, upload, and manage 3D models. It uses React Three Fiber for rendering the 3D models on the frontend and Node.js with Express and SQLite for managing data on the backend
***
<h3>Setup Instructions</h3>
<h4>1. Installation</h4>

```bash
git clone https://github.com/Pranav-Sunesh/3D-Model-Viewer.git
```

<h4>2. Navigate to the project directory:</h4>

```bash
cd 3D-Model-Viewer
```

<h4>3. Install the dependencies:</h4>

```bash
cd client
npm install
```

```bash
cd server
npm install
```

<h4>4. Create .env file</h4>
<h5>Add the following environment variables</h5>

```env
PORT = 5000
DB_DATABASE = 'database-name'
```

<h3>Runnign Instructions</h3>
<h4>Running the Project Locally</h4>
<h5>1. Start the frontend development server</h5>

```bash
cd client
npm run dev
```

<h5>2. Start the backend server</h5>

 ```
cd server
npm run dev
 ```

 <h5>3. Open your browser and visit http://localhost:5173 or which ever port given by you</h5>

<h3>Additional Notes</h3>

- <b>3D Models:</b> Users can upload and manage 3D model formats like .gltf and .glb. Ensure that the model files are properly formatted for viewing in the application.

- <b>Tech Stack:</b>
  - <b>Frontend: </b> React, React three fiber, React three drei, three.js, Zustand
  - <b>Backend: </b> Node.js, Express.js
  - <b>Database: </b> SQLite

