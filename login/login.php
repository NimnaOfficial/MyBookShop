<?php
session_start();
require_once __DIR__ . '/../confi/config.php';

$uname = $_POST['Uname'];
$password = $_POST['pwd'];

$sql = "SELECT * FROM user_tbl WHERE username = '$uname'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {

    $row = mysqli_fetch_assoc($result);

    if ($row['pasword'] === $password) {

        $_SESSION['username'] = $uname;

        echo "
        <script>
            const pageContent = document.querySelector('.page-content');
            const overlay = document.querySelector('.overlay');

            pageContent?.classList.add('flip-active');
            overlay?.classList.add('overlay-active');

            setTimeout(() => {
                window.location.href = '/WEB_1/dash/dash.html';
            }, 800);
        </script>
        ";

    } else {
        echo 'Invalid Password';
    }

} else {
    echo 'Invalid Username';
}
?>
