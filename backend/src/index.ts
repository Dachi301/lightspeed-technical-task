import http from "http";

// Create the HTTP server
const server = http.createServer((req, res) => {
    const response = { title: 'test' };

    res.statusCode = 200;

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(response));
});

// Define the port number where the server will listen
const PORT = process.env.PORT || 8000;

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
