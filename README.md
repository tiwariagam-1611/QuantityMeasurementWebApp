Quantity Measurement Web Application  

UC-JS-01: Create JSON Server Database

This use case defines the initial setup of the application’s backend using JSON Server.
The developer creates a `db.json` file that contains three main collections: units, conversions, and history.
The units collection stores measurement types such as Length, Weight, Volume, and Temperature along with their symbols.
The conversions collection defines how one unit is converted into another using either a multiplication factor or a formula.
The history collection is initially empty and is dynamically populated when users perform calculations. Once the server is started, all endpoints become available for use.  

UC-JS-02: Application Initialization  
When the application loads, the system initializes by attaching all required event listeners and preparing the UI.
A global state object is created to track the selected type, action, input values, units, and operator.
The system then loads default units for Length, sets default active selections, hides the operator section, and fetches existing history records.
This ensures the application is fully ready for user interaction.  

UC-JS-03: Fetch Units by Type  
This use case is responsible for retrieving unit data based on the selected measurement type.
When a user selects a type such as Length or Weight, the system sends a request to the backend using a query parameter.
The server responds with a filtered list of units belonging to that type. These units are then used to populate the dropdown menus in the UI.  

UC-JS-04: Fetch Conversion Record  
Whenever a conversion is required, the system retrieves the corresponding conversion rule from the backend.
The request is made using both source and target units. The server returns a conversion object containing either a factor or a formula.
If no matching conversion is found, an error is thrown and handled gracefully in the UI.  

UC-JS-05: Save History Record  
After a successful calculation, the system creates a history record containing the type, action, expression, result, and timestamp.
This record is sent to the backend using a POST request and stored in the history collection. This ensures that all user interactions are recorded for later viewing.  

UC-JS-06: Load History  
This use case retrieves all previously stored history records from the backend.
The records are sorted in descending order of timestamp so that the most recent calculations appear first.
If no records exist, the system displays a placeholder message indicating that no history is available.  

UC-JS-07: Apply Conversion  
This use case handles the core conversion logic. If the conversion uses a factor, the input value is multiplied accordingly.
If a formula is provided, it is evaluated after replacing the variable with the input value. The result is rounded to maintain precision and returned to the caller.  

UC-JS-08: Compare Values  
In comparison mode, both input values are first normalized to a common base unit.
The system then compares the values and returns a descriptive statement indicating whether one value is greater than, less than, or equal to the other.
This ensures accurate comparisons even when units differ.  

UC-JS-09: Perform Arithmetic  
This use case performs arithmetic operations such as addition, subtraction, multiplication, and division.
Before performing the operation, the second value is converted into the unit of the first value.
The selected operator is then applied, and the result is calculated with proper precision. Division by zero and invalid operators are handled as exceptions.  

UC-JS-10: Populate Unit Dropdown  
This use case updates the dropdown menus with unit options.
When unit data is fetched, the system clears existing options and dynamically creates new ones based on the received data.
Each option displays both the unit name and symbol, allowing users to make clear selections.  

UC-JS-11: Set Active Selection  
Whenever a user selects a type, action, or operator, this use case updates the UI to reflect the active choice.
It removes the active class from all related elements and applies it only to the selected element, ensuring a clear and responsive interface.  

UC-JS-12: Show Result  
After a calculation is completed, the result is displayed in the result panel.
The system updates both the value and unit fields and applies a visual highlight effect to indicate that the result has been updated.
In comparison mode, a descriptive message is shown instead of a numeric value.  

UC-JS-13: Toggle Operator Section  
This use case controls the visibility of the operator buttons. The operator section is displayed only when the user selects arithmetic mode.
For other modes such as conversion or comparison, the operator section remains hidden to maintain a clean interface.  

UC-JS-14: Render History List  
This use case updates the history panel in the UI. It clears the existing list and repopulates it using the latest history records fetched from the backend.
Each record displays the expression, result, and timestamp. If no records are available, a placeholder message is shown.  

UC-JS-15: Handle Type Selection  
When a user selects a measurement type, the system updates the state accordingly and reloads the unit dropdowns.
Input fields and results are reset to avoid inconsistencies. This ensures that the application always reflects the currently selected type.  

UC-JS-16: Handle Action Selection  
This use case updates the application mode based on user selection.
It changes the state, highlights the selected action, toggles the operator section if needed, and clears previous results.
This ensures that the UI behaves correctly for each operation mode.  

UC-JS-17: Execute Calculation  
This is the core use case of the application. It is triggered whenever the user inputs values or changes selections.
Based on the selected action, the system performs conversion, comparison, or arithmetic operations.
The result is displayed, a history record is saved, and the history panel is refreshed. All errors are caught and displayed without breaking the application.  
