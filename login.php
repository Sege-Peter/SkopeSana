<?php
// Database connection
$host = '127.0.0.1'; // Change to your server
$user = 'root';      // Your DB username
$password = '';      // Your DB password
$database = 'skopesana'; // Your database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Query to fetch user from DB
    $sql = "SELECT * FROM users WHERE email='$email' AND role='$role'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found, check password
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Password is correct, start session and log user in
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_name'] = $row['fullname'];
            $_SESSION['role'] = $row['role'];
            echo "Login successful!";
            header('Location: index.html'); // Redirect to a dashboard after successful login
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found with this email and role!";
    }
}
$conn->close();
?>
