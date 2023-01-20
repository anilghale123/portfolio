<?php
    // get the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // do something with the data, such as send an email
    mail("ghaleanil30@gmail.com", $subject, $message, "From: $email\n");

    // redirect the user to a thank you page
    header("Location: thank-you.html");
?>
