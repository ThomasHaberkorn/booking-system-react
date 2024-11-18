<?php

header("Access-Control-Allow-Origin: https://physio-vital.haberkorn-thomas.de");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Handle preflight request
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        exit;
    }

    $email = filter_var($params->email, FILTER_VALIDATE_EMAIL);
    $name = htmlspecialchars(strip_tags($params->name));
    $message = htmlspecialchars(strip_tags($params->message));

    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email']);
        exit;
    }

    $recipient = 'kontakt@haberkorn-thomas.de';  
    $subject = "Contact From <$email>";
    $body = "From: $name<br>$message<br>Email: $email";

    $headers   = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = "From: $email";

    if (mail($recipient, $subject, $body, implode("\r\n", $headers))) {
        echo json_encode(['message' => 'Email sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;
