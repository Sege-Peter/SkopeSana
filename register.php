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
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password
    $role = 'user'; // Default role can be user, or handle as needed

    // Insert into users table
    $sql = "INSERT INTO users (fullname, email, password, role) VALUES ('$fullname', '$email', '$password', '$role')";
    if ($conn->query($sql) === TRUE) {
        echo "Account created successfully!";
        header('Location: dashboard.php'); // Redirect to login page after successful registration
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>

