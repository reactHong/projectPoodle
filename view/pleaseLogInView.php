<?php $title= "pleaseLogIn"?>
<?php ob_start(); ?>
<style>
    .congrats{
        padding-top: 4em;
        text-align: center;
        margin-top: 0;
    }
</style>
<body>
    <div>
        <h1 class="congrats">you must be logged in to redeem the coupon :)</h1>
        <!-- <?php echo $_SESSION['points']; ?> -->
        <!-- <h2 class="yourPoints">you have <?php echo $_SESSION['points'];?> points!</h2> -->
    </div>
</body>

<?php
$content = ob_get_clean();
require("template.php");
?>