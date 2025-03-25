// Written by Yousuf Ahmed
import React from 'react';



// Define the NotFound component
function NotFound() {
    return (
        // Main container for the NotFound component
        <div>
            {/* Display the 404 error message */}
            <h1>404 Not Found</h1>

            {/* Display additional information about the missing page */}
            <p>The page you're looking for doesn't exist!</p>
        </div>
    );
}

// Export the NotFound component as the default export
export default NotFound;
